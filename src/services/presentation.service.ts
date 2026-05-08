import { apiFetcher } from "@/config/axios";
import type { PresentationJobResponse, PresentationFormValues } from "@/types/types";

export async function generatePresentation(
  values: PresentationFormValues
): Promise<PresentationJobResponse> {
  const { data } = await apiFetcher.post<PresentationJobResponse>(
    "/api/v1/presentations",
    {
      topic: values.topic,
      num_slides: values.numSlides,
      language: values.language,
      theme: values.theme,
      layout_preference: values.layoutPreference,
    }
  );
  if (!data.job_id) {
    throw new Error("Server response missing job_id");
  }
  return data;
}

export async function fetchPresentationStatus(
  jobId: string,
  signal: AbortSignal
): Promise<PresentationJobResponse> {
  const { data } = await apiFetcher.get<PresentationJobResponse>(
    `/api/v1/presentations/${jobId}/status`,
    { signal }
  );
  return data;
}

export async function downloadPresentation(
  jobId: string,
  filename: string,
  signal: AbortSignal
): Promise<void> {
  const response = await apiFetcher.get<Blob>(
    `/api/v1/presentations/${jobId}/download`,
    { responseType: "blob", signal, timeout: 60_000 }
  );

  const blob = response.data;
  const EXPECTED_MIME =
    "application/vnd.openxmlformats-officedocument.presentationml.presentation";
  const FALLBACK_MIMES = ["application/octet-stream", "application/zip", ""];

  if (blob.type && blob.type !== EXPECTED_MIME && !FALLBACK_MIMES.includes(blob.type)) {
    throw new Error(`Unexpected file type received: ${blob.type}`);
  }

  const url = URL.createObjectURL(blob);
  try {
    const link = document.createElement("a");
    link.href = url;
    link.download = filename || `presentation-${jobId}.pptx`;
    document.body.appendChild(link);
    link.click();
    link.remove();
  } finally {
    URL.revokeObjectURL(url);
  }
}
