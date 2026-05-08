import type { Metadata } from "next";
import "./globals.css";
import { Plus_Jakarta_Sans as PlusJakartaSans } from "next/font/google";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";

const fontSans = PlusJakartaSans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "SlideForge – AI-Powered PowerPoint Generator",
  description:
    "Create stunning PowerPoint presentations effortlessly with SlideForge. Just enter your topic, set parameters, and let AI generate a professional deck in minutes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={fontSans.variable}>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div
            className={cn(
              "fixed h-screen w-full bg-gradient-to-br from-background to-blue-50 dark:bg-gradient-to-br dark:from-gray-800 dark:via-gray-900 dark:to-slate-900"
            )}
          />
          <Header />
          <main className={cn("relative z-10 min-h-screen")}>{children}</main>
          <Footer />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
