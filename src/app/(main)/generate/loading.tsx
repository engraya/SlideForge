export default function GenerateLoading() {
  return (
    <div className="min-h-screen py-16 px-4 bg-gradient-to-b from-violet-50/60 via-background to-background dark:from-violet-950/20 dark:via-background dark:to-background">
      <div className="container max-w-2xl mx-auto">

        {/* Heading skeleton */}
        <div className="text-center mb-10 space-y-3">
          <div className="h-5 bg-muted rounded-full w-24 mx-auto animate-pulse" />
          <div className="h-9 bg-muted rounded-lg w-64 mx-auto animate-pulse" />
          <div className="h-4 bg-muted rounded-full w-48 mx-auto animate-pulse" />
        </div>

        {/* Card skeleton */}
        <div className="rounded-2xl border border-border bg-card shadow-sm p-6 sm:p-8 animate-pulse">
          <div className="space-y-2 mb-6">
            <div className="h-6 bg-muted rounded w-2/3" />
            <div className="h-4 bg-muted rounded w-4/5" />
          </div>

          <div className="space-y-5">
            {/* Row 1 */}
            <div className="flex gap-5 flex-col sm:flex-row">
              <div className="flex-1 space-y-1.5">
                <div className="h-4 bg-muted rounded w-1/3" />
                <div className="h-9 bg-muted rounded" />
              </div>
              <div className="sm:w-36 space-y-1.5">
                <div className="h-4 bg-muted rounded w-1/2" />
                <div className="h-9 bg-muted rounded" />
              </div>
            </div>

            {/* Row 2 */}
            <div className="flex gap-5 flex-col sm:flex-row">
              <div className="flex-1 space-y-1.5">
                <div className="h-4 bg-muted rounded w-1/3" />
                <div className="h-9 bg-muted rounded" />
              </div>
              <div className="flex-1 space-y-1.5">
                <div className="h-4 bg-muted rounded w-1/3" />
                <div className="h-9 bg-muted rounded" />
              </div>
            </div>

            {/* Row 3 */}
            <div className="space-y-1.5">
              <div className="h-4 bg-muted rounded w-1/4" />
              <div className="h-9 bg-muted rounded" />
            </div>

            {/* Submit button */}
            <div className="h-11 bg-muted rounded-lg mt-2" />
          </div>
        </div>
      </div>
    </div>
  );
}
