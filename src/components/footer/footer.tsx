import Link from "next/link";
import { Github } from "lucide-react";
import { cn } from "@/lib/utils";

const Footer = () => {
  return (
    <footer className={cn("relative z-10 w-full py-2 lg:px-24 px-4", "md:py-0")}>
      <div
        className={cn(
          "container flex flex-col items-center justify-between gap-2",
          "md:h-20",
          "md:flex-row"
        )}
      >
        <div className="space-x-4 text-center flex flex-col gep-2 dark:text-slate-200 text-gray-800 text-sm leading-loose">
          <div>© {new Date().getFullYear()} IntelliSlide-AI. All rights reserved.</div>
          <div>Developed by engrahmadaya.</div>
        </div>
        <div
          className={cn(
            "space-x-4 text-center text-sm leading-loose text-muted-foreground",
            "md:text-left"
          )}
        >
          <Link
            href="https://github.com/engraya/intelliSlide-ai"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View source on GitHub"
            className={cn("font-semibold", "hover:underline hover:underline-offset-4")}
          >
            <Github className="size-6" />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
