import PagesWrapper from "@/components/PagesWrapper";

export default function GenerateLoading() {
  return (
    <PagesWrapper>
      <div className="w-full mx-auto px-4 md:w-11/12 xl:w-9/12">
        <div className="mx-auto mt-10 max-w-2xl w-full rounded-lg border-2 border-blue-400 p-6 animate-pulse">
          <div className="h-5 bg-muted rounded w-2/3 mx-auto mb-3" />
          <div className="h-8 bg-muted rounded w-3/4 mx-auto mb-2" />
          <div className="h-4 bg-muted rounded w-1/2 mx-auto mb-8" />
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-muted rounded w-1/3" />
                <div className="h-9 bg-muted rounded" />
              </div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-muted rounded w-1/3" />
                <div className="h-9 bg-muted rounded" />
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-muted rounded w-1/3" />
                <div className="h-9 bg-muted rounded" />
              </div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-muted rounded w-1/3" />
                <div className="h-9 bg-muted rounded" />
              </div>
            </div>
            <div className="h-9 bg-muted rounded w-1/3 mx-auto mt-4" />
          </div>
        </div>
      </div>
    </PagesWrapper>
  );
}
