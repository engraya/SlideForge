"use client";

import { useReducer, useRef, useCallback, useEffect } from "react";
import { toast } from "sonner";
import {
  generatePresentation,
  fetchPresentationStatus,
  downloadPresentation,
} from "@/services/presentation.service";
import type { PresentationFormValues } from "@/types/types";

const POLL_INTERVAL_MS = 2_000;
const POLL_TIMEOUT_MS = 10 * 60 * 1_000;

// Discriminated union — impossible states are unrepresentable
type State =
  | { phase: "idle" }
  | { phase: "generating" }
  | { phase: "polling"; jobId: string }
  | { phase: "ready"; jobId: string; filename: string }
  | { phase: "downloading"; jobId: string; filename: string }
  | { phase: "error"; message: string };

type Action =
  | { type: "GENERATE_START" }
  | { type: "GENERATE_SUCCESS"; jobId: string }
  | { type: "POLL_COMPLETE"; filename: string }
  | { type: "DOWNLOAD_START" }
  | { type: "DOWNLOAD_COMPLETE" }
  | { type: "ERROR"; message: string }
  | { type: "RESET" };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "GENERATE_START":
      return { phase: "generating" };
    case "GENERATE_SUCCESS":
      return { phase: "polling", jobId: action.jobId };
    case "POLL_COMPLETE":
      if (state.phase !== "polling") return state;
      return { phase: "ready", jobId: state.jobId, filename: action.filename };
    case "DOWNLOAD_START":
      if (state.phase !== "ready") return state;
      return { phase: "downloading", jobId: state.jobId, filename: state.filename };
    case "DOWNLOAD_COMPLETE":
      if (state.phase !== "downloading") return state;
      return { phase: "ready", jobId: state.jobId, filename: state.filename };
    case "ERROR":
      return { phase: "error", message: action.message };
    case "RESET":
      return { phase: "idle" };
    default:
      return state;
  }
}

export function usePresentation() {
  const [state, dispatch] = useReducer(reducer, { phase: "idle" });

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const stopPolling = useCallback(() => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    abortRef.current?.abort();
    abortRef.current = null;
  }, []);

  // Clean up on unmount — fixes the memory leak that existed in the original page component
  useEffect(() => () => stopPolling(), [stopPolling]);

  const startPolling = useCallback(
    (jobId: string) => {
      abortRef.current = new AbortController();
      const signal = abortRef.current.signal;

      intervalRef.current = setInterval(async () => {
        try {
          const data = await fetchPresentationStatus(jobId, signal);

          if (data.status === "ready") {
            stopPolling();
            dispatch({ type: "POLL_COMPLETE", filename: data.filename });
            toast.success("Presentation is ready for download!");
          } else if (data.status === "failed") {
            stopPolling();
            const msg = data.message || "Presentation generation failed.";
            dispatch({ type: "ERROR", message: msg });
            toast.error(msg);
          }
          // "pending" / "processing" — keep interval running
        } catch (err: unknown) {
          // Swallow cancellation errors (triggered by stopPolling on unmount/reset)
          if (signal.aborted) return;
          // Log network blips but keep polling — transient errors should not abort the job
          console.warn("Poll request failed (will retry):", err);
        }
      }, POLL_INTERVAL_MS);

      // Safety valve: stop polling after 10 minutes regardless of status
      timeoutRef.current = setTimeout(() => {
        stopPolling();
        const msg = "Generation timed out after 10 minutes. Please try again.";
        dispatch({ type: "ERROR", message: msg });
        toast.error(msg);
      }, POLL_TIMEOUT_MS);
    },
    [stopPolling]
  );

  const generate = useCallback(
    async (values: PresentationFormValues) => {
      dispatch({ type: "GENERATE_START" });
      try {
        const data = await generatePresentation(values);
        dispatch({ type: "GENERATE_SUCCESS", jobId: data.job_id });
        toast.success(data.message || "Presentation generation queued!");
        startPolling(data.job_id);
      } catch (err: unknown) {
        const message =
          err instanceof Error ? err.message : "Failed to generate presentation";
        dispatch({ type: "ERROR", message });
        toast.error(message);
      }
    },
    [startPolling]
  );

  const download = useCallback(async () => {
    if (state.phase !== "ready") return;
    const { jobId, filename } = state;
    dispatch({ type: "DOWNLOAD_START" });
    try {
      const ac = new AbortController();
      await downloadPresentation(jobId, filename, ac.signal);
      dispatch({ type: "DOWNLOAD_COMPLETE" });
      toast.success("Presentation downloaded successfully!");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Download failed";
      dispatch({ type: "ERROR", message });
      toast.error(message);
    }
  }, [state]);

  const reset = useCallback(() => {
    stopPolling();
    dispatch({ type: "RESET" });
  }, [stopPolling]);

  const filename =
    state.phase === "ready" || state.phase === "downloading"
      ? state.filename
      : null;

  return {
    phase: state.phase,
    errorMessage: state.phase === "error" ? state.message : null,
    filename,
    generate,
    download,
    reset,
    isGenerating: state.phase === "generating",
    isPolling: state.phase === "polling",
    isReady: state.phase === "ready" || state.phase === "downloading",
    isDownloading: state.phase === "downloading",
  };
}
