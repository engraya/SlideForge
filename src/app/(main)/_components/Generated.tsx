import { GeneratedComponentProps } from "@/types/types";
import Spinner from "@/components/Spinner";

export default function Generated({
  isDownloading,
  handleDownloadPPT,
  handleGenerateAgain,
}: GeneratedComponentProps) {
  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-2xl p-4 bg-white shadow-2xl dark:bg-gray-900 sm:p-10 sm:rounded-3xl">
        <div className="text-center">
          <div className="flex items-center justify-center w-20 h-20 mx-auto mb-6 bg-green-100 rounded-full dark:bg-green-700">
            <svg
              className="h-12 w-12 text-green-600 dark:text-green-100"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </div>
          <h1 className="text-4xl font-extrabold text-green-700 dark:text-green-400">
            Success!
          </h1>
          <p className="mt-4 text-lg text-gray-800 dark:text-gray-300">
            Your AI-generated presentation is ready!
          </p>
          <p className="mt-4 text-sm text-gray-700 dark:text-gray-400">
            Your slides have been successfully generated. Click the button below
            to download your PowerPoint file.
          </p>
        </div>
        <div className="mt-6 text-center space-x-2">
          <button
            onClick={handleDownloadPPT}
            className="inline-block cursor-pointer px-6 py-2 text-lg font-medium text-white transition-transform rounded-full shadow-lg bg-gradient-to-r from-indigo-600 to-blue-600 hover:scale-105 hover:from-indigo-700 hover:to-blue-700 dark:from-indigo-500 dark:to-blue-500 dark:hover:from-indigo-600 dark:hover:to-blue-600"
          >
            {isDownloading ? <Spinner /> : "Download"}
          </button>
          <button
            onClick={handleGenerateAgain}
            className="mt-4 px-6 py-2 text-lg font-medium cursor-pointer text-white bg-emerald-500 hover:bg-teal-600 transition-transform hover:scale-105 rounded-full"
          >
            Generate Again
          </button>
        </div>
      </div>
    </div>
  );
}
