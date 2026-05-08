import Link from "next/link";
import Image from "next/image";
import { Github } from "lucide-react";
import { cn } from "@/lib/utils";
import { logo } from "../../../public/images";

const Footer = () => {
  return (
    <footer className={cn("border-t border-border bg-background")}>
      <div className="container max-w-7xl mx-auto px-4 md:px-8 lg:px-12 py-12">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">

          {/* Brand column */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2 w-fit">
              <Image src={logo} width={32} height={32} alt="SlideForge logo" />
              <span className="bg-gradient-to-r from-violet-600 via-indigo-500 to-cyan-400 bg-clip-text font-extrabold text-transparent">
                SlideForge
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Turn any topic into a professional PowerPoint presentation in seconds, powered by Google Gemini.
            </p>
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} SlideForge. All rights reserved.
            </p>
          </div>

          {/* Navigation column */}
          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold">Navigation</h3>
            <ul className="flex flex-col gap-2">
              {[
                { href: "/", label: "Home" },
                { href: "/about", label: "About" },
                { href: "/generate", label: "Generate" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social / built-with column */}
          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold">Links</h3>
            <Link
              href="https://github.com/engraya/SlideForge"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors w-fit"
            >
              <Github className="size-4" />
              View on GitHub
            </Link>
            <p className="text-xs text-muted-foreground mt-auto">
              Built with Next.js &amp; Google Gemini AI
            </p>
            <p className="text-xs text-muted-foreground">
              Developed by{" "}
              <Link
                href="https://github.com/engraya"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground underline underline-offset-2"
              >
                engrahmadaya
              </Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
