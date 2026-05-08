import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 p-4 text-center">

      {/* Decorative rings */}
      <div className="relative flex items-center justify-center">
        <div className="absolute size-64 rounded-full border border-violet-100 dark:border-violet-900/40" />
        <div className="absolute size-44 rounded-full border border-violet-200 dark:border-violet-800/40" />
        <h1 className="relative text-8xl font-extrabold bg-gradient-to-br from-violet-600 via-indigo-500 to-cyan-400 bg-clip-text text-transparent">
          404
        </h1>
      </div>

      <div className="space-y-2 max-w-sm">
        <h2 className="text-2xl font-bold">Page not found</h2>
        <p className="text-muted-foreground">
          The page you&apos;re looking for has been moved, deleted, or never existed.
        </p>
      </div>

      <Button asChild className="gap-2 bg-violet-600 hover:bg-violet-700 text-white border-0">
        <Link href="/">
          <ArrowLeft className="size-4" />
          Back to Home
        </Link>
      </Button>
    </div>
  );
}
