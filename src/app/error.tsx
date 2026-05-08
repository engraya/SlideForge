"use client";

import { useEffect } from "react";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("Unhandled error:", error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 p-4">
      <div className="flex flex-col items-center gap-5 max-w-md w-full text-center bg-destructive/5 border border-destructive/20 rounded-xl p-8">
        <div className="flex items-center justify-center size-14 rounded-full bg-destructive/10">
          <AlertCircle className="size-7 text-destructive" />
        </div>

        <div className="space-y-1.5">
          <h2 className="text-xl font-bold text-destructive">Something went wrong</h2>
          <p className="text-muted-foreground text-sm">
            {error.message || "An unexpected error occurred. Please try again."}
          </p>
          {error.digest && (
            <p className="text-xs text-muted-foreground/60 font-mono">
              Error ID: {error.digest}
            </p>
          )}
        </div>

        <Button onClick={reset} variant="outline" className="gap-2">
          Try again
        </Button>
      </div>
    </div>
  );
}
