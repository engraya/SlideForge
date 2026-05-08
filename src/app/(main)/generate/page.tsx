"use client";

import PresentationForm from "../_components/PresentationForm";
import Generated from "../_components/Generated";
import { usePresentation } from "@/hooks/use-presentation";
import { FileText, Sparkles, Download } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
  { icon: FileText, label: "Enter your topic" },
  { icon: Sparkles, label: "AI generates slides" },
  { icon: Download, label: "Download .pptx" },
];

export default function GeneratePage() {
  const {
    generate,
    download,
    reset,
    isReady,
    isDownloading,
    isGenerating,
    isPolling,
  } = usePresentation();

  return (
    <div
      className={cn(
        "min-h-screen py-16 px-4",
        "bg-gradient-to-b from-violet-50/60 via-background to-background",
        "dark:from-violet-950/20 dark:via-background dark:to-background",
      )}
    >
      <div className="container max-w-2xl mx-auto">

        {/* Page heading */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-violet-200 bg-violet-50 text-violet-700 text-xs font-medium mb-4 dark:border-violet-800 dark:bg-violet-950 dark:text-violet-300">
            <Sparkles className="size-3.5" />
            AI-Powered
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            <span className="bg-gradient-to-r from-violet-600 to-indigo-500 bg-clip-text text-transparent">
              Generate Presentations
            </span>
          </h1>
          <p className="mt-2 text-muted-foreground">
            Fill in the details below and let AI do the rest.
          </p>
        </div>

        {/* Main card */}
        <div className="rounded-2xl border border-border bg-card shadow-sm p-6 sm:p-8">
          {isReady ? (
            <Generated
              isDownloading={isDownloading}
              handleDownloadPPT={download}
              handleGenerateAgain={reset}
            />
          ) : (
            <PresentationForm
              onSubmit={generate}
              isSubmitting={isGenerating || isPolling}
            />
          )}
        </div>

        {/* How it works — only show when form is visible */}
        {!isReady && (
          <div className="mt-8 flex items-center justify-center gap-2 text-sm text-muted-foreground flex-wrap">
            {steps.map(({ icon: Icon, label }, i) => (
              <div key={label} className="flex items-center gap-2">
                <div className="flex items-center gap-1.5">
                  <span className="flex items-center justify-center size-5 rounded-full bg-violet-100 dark:bg-violet-950 text-violet-700 dark:text-violet-300 text-xs font-bold">
                    {i + 1}
                  </span>
                  <Icon className="size-3.5" />
                  <span>{label}</span>
                </div>
                {i < steps.length - 1 && (
                  <span className="text-border mx-1">→</span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
