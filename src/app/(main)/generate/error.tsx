"use client";

import { Button } from "@/components/ui/button";
import PagesWrapper from "@/components/PagesWrapper";

export default function GenerateError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <PagesWrapper>
      <div className="mx-auto max-w-md text-center space-y-4 pt-20">
        <h2 className="text-xl font-bold text-destructive">Generation Error</h2>
        <p className="text-muted-foreground">
          {error.message || "An error occurred while loading the generator."}
        </p>
        {error.digest && (
          <p className="text-xs text-muted-foreground">Error ID: {error.digest}</p>
        )}
        <Button onClick={reset}>Try again</Button>
      </div>
    </PagesWrapper>
  );
}
