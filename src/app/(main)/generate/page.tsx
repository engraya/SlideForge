"use client";

import React, { useState, useEffect } from "react";
import PagesWrapper from "@/components/PagesWrapper";
import PresentationForm from "../_components/PresentationForm";
import { toast } from "react-toastify";
import Generated from "../_components/Generated";
import { GeneratePPTResponse, PollStatusResponse, LayoutPreference, Theme } from "@/types/types";
import { apiFetcher } from "@/config/axios";



function GeneratePage() {
  const [topic, setTopic] = useState<string>("");
  const [numSlides, setNumSlides] = useState<number>(3);
  const [loading, setLoading] = useState<boolean>(false);
  const [jobId, setJobId] = useState<string>("");
  const [filename, setFilename] = useState<string>("");
  const [isFileReady, setIsFileReady] = useState<boolean>(false);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [layoutPreference, setLayoutPreference] = useState<LayoutPreference>("Varied");
  const [language, setLanguage] = useState<string>("English");
  const [theme, setTheme] = useState<Theme>("professional");

  useEffect(() => {
    if (jobId) {
      pollStatus(jobId);
    }
  }, [jobId]);

  const handleGenerateAgain = () => {
    setJobId("");
    setFilename("");
    setIsFileReady(false);
    setTopic("");
    setNumSlides(5);
  };

  const handleGeneratePPT = async () => {
    setLoading(true);
    try {
      const response = await apiFetcher.post<GeneratePPTResponse>("/api/v1/presentations", {
        topic,
        num_slides: numSlides,
        language,
        theme,
      });
      if (response.data?.job_id) {
        setJobId(response.data.job_id);
      } else {
        console.error("No job_id in API response", response);
      }
      toast.success(response.data.message || "Presentation generation queued!");
    } catch (error) {
      toast.error("Failed to Generate Presentation. Please try again!");
      console.error("Error generating PPT:", error);
    }
    setLoading(false);
  };

  const pollStatus = (id: string) => {
    const interval = setInterval(async () => {
      try {
        const response = await apiFetcher.get<PollStatusResponse>(`/api/v1/presentations/${id}/status`);
        const { status, filename: readyFilename } = response.data;
        if (status === "ready") {
          setFilename(readyFilename);
          setIsFileReady(true);
          toast.success("Presentation is ready for download!");
          clearInterval(interval);
        } else if (status === "failed") {
          toast.error(response.data.message || "Presentation generation failed.");
          clearInterval(interval);
        }
      } catch (error) {
        console.log("Error polling status:", error);
      }
    }, 2000);
  };

  const handleDownloadPPT = async () => {
    if (!jobId || !isFileReady) {
      toast.error("File is not ready yet!");
      return;
    }
    setIsDownloading(true);
    try {
      const response = await apiFetcher.get(`/api/v1/presentations/${jobId}/download`, {
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename || `presentation-${jobId}.pptx`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      toast.success("Presentation Downloaded Successfully!");
    } catch (error) {
      toast.error("Failed to Download the Presentation");
      console.error("Error downloading PPT:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <PagesWrapper>
      <div className="w-full mx-auto text-left px-4 md:w-11/12 xl:w-9/12 md:text-center">
        <h1 className="mb-4 text-xl font-extrabold leading-none tracking-normal text-gray-900 md:text-4xl md:tracking-tight">
          <span className="block w-full text-transparent text-center bg-clip-text bg-gradient-to-r from-green-400 to-purple-500 lg:inline">
            Generate Presentations
          </span>
        </h1>
        <div className="parent-container mx-auto mt-10 max-w-2xl rounded-lg border-2 border-blue-400 p-6">
          {!jobId || !isFileReady ? (
            <PresentationForm
              topic={topic}
              numSlides={numSlides}
              setTopic={setTopic}
              setNumSlides={setNumSlides}
              loading={loading}
              handleGeneratePPT={handleGeneratePPT}
              layoutPreference={layoutPreference}
              setLayoutPreference={setLayoutPreference}
              language={language}
              setLanguage={setLanguage}
              theme={theme}
              setTheme={setTheme}
            />
          ) : (
            <Generated
              isDownloading={isDownloading}
              handleDownloadPPT={handleDownloadPPT}
              handleGenerateAgain={handleGenerateAgain}
              pptFile={filename}
            />
          )}
        </div>
      </div>
    </PagesWrapper>
  );
}

export default GeneratePage;
