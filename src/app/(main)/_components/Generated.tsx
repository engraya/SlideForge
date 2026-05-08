import { CheckCircle2, Download, RefreshCcw, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/Spinner";
import type { GeneratedComponentProps } from "@/types/types";

export default function Generated({
  isDownloading,
  handleDownloadPPT,
  handleGenerateAgain,
}: GeneratedComponentProps) {
  return (
    <div className="flex flex-col items-center text-center gap-6 py-4">

      {/* Success icon */}
      <div className="flex items-center justify-center size-20 rounded-full bg-green-50 dark:bg-green-950 ring-8 ring-green-50/50 dark:ring-green-950/50">
        <CheckCircle2 className="size-10 text-green-600 dark:text-green-400" strokeWidth={1.5} />
      </div>

      {/* Copy */}
      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">Your presentation is ready!</h2>
        <p className="text-muted-foreground text-sm max-w-sm mx-auto">
          AI has generated your slides. Download the PowerPoint file and customize it in any presentation app.
        </p>
      </div>

      {/* File hint */}
      <div className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-border bg-muted/50 text-sm text-muted-foreground">
        <FileText className="size-4 shrink-0" />
        <span>Ready as <strong className="text-foreground font-medium">.pptx</strong> — compatible with PowerPoint, Google Slides &amp; Keynote</span>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
        <Button
          onClick={handleDownloadPPT}
          disabled={isDownloading}
          className="w-full sm:w-auto bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white border-0 gap-2 px-8"
        >
          {isDownloading ? (
            <>
              <Spinner />
              Downloading…
            </>
          ) : (
            <>
              <Download className="size-4" />
              Download .pptx
            </>
          )}
        </Button>
        <Button
          onClick={handleGenerateAgain}
          variant="outline"
          className="w-full sm:w-auto gap-2 px-8"
        >
          <RefreshCcw className="size-4" />
          Generate Again
        </Button>
      </div>
    </div>
  );
}
