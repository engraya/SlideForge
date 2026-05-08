"use client";

import PagesWrapper from "@/components/PagesWrapper";
import PresentationForm from "../_components/PresentationForm";
import Generated from "../_components/Generated";
import { usePresentation } from "@/hooks/use-presentation";

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
    <PagesWrapper>
      <div className="w-full mx-auto text-left px-4 md:w-11/12 xl:w-9/12 md:text-center">
        <h1 className="mb-4 text-xl font-extrabold leading-none tracking-normal text-gray-900 md:text-4xl md:tracking-tight">
          <span className="block w-full text-transparent text-center bg-clip-text bg-gradient-to-r from-green-400 to-purple-500 lg:inline">
            Generate Presentations
          </span>
        </h1>
        <div className="parent-container mx-auto mt-10 max-w-2xl rounded-lg border-2 border-blue-400 p-6">
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
      </div>
    </PagesWrapper>
  );
}
