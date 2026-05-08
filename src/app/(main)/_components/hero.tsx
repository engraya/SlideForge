import Link from 'next/link'
import { Sparkles, Github, ArrowRight } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const Hero = () => {
  return (
    <section className="relative isolate overflow-hidden min-h-[90vh] flex items-center justify-center">

      {/* Mesh gradient background */}
      <div className="absolute inset-0 -z-10 bg-background">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full bg-violet-500/10 blur-[120px] dark:bg-violet-600/15" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[400px] rounded-full bg-indigo-500/10 blur-[100px] dark:bg-indigo-600/10" />
        <div className="absolute top-1/3 left-0 w-[400px] h-[300px] rounded-full bg-cyan-500/10 blur-[100px] dark:bg-cyan-600/10" />
      </div>

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 -z-10 opacity-[0.03] dark:opacity-[0.05]"
        style={{
          backgroundImage:
            'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="container max-w-5xl mx-auto px-4 py-24 text-center">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-violet-200 bg-violet-50 text-violet-700 text-sm font-medium mb-8 dark:border-violet-800 dark:bg-violet-950 dark:text-violet-300">
          <Sparkles className="size-3.5" />
          Powered by Google Gemini AI
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6">
          <span className="text-foreground">Create Stunning</span>
          <br />
          <span className="text-foreground">Presentations, Powered by</span>{' '}
          <span className="bg-gradient-to-r from-violet-600 via-indigo-500 to-cyan-500 bg-clip-text text-transparent">
            AI
          </span>
        </h1>

        {/* Subtext */}
        <p className="max-w-2xl mx-auto text-lg sm:text-xl text-muted-foreground leading-relaxed mb-10">
          Enter a topic. Choose your style. Download a polished PowerPoint in seconds — no design skills needed.
        </p>

        {/* Social proof bar */}
        <div className="flex items-center justify-center gap-3 text-sm text-muted-foreground mb-10 flex-wrap">
          <span className="flex items-center gap-1.5">
            <span className="size-1.5 rounded-full bg-green-500 inline-block" />
            9 Languages
          </span>
          <span className="text-border">·</span>
          <span>Up to 20 Slides</span>
          <span className="text-border">·</span>
          <span>Free to Use</span>
          <span className="text-border">·</span>
          <span>Download as .pptx</span>
        </div>

        {/* CTAs */}
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <Link
            href="/generate"
            className={cn(
              buttonVariants({ size: 'lg' }),
              'bg-violet-600 hover:bg-violet-700 text-white border-0 gap-2 px-8',
            )}
          >
            Start Generating
            <ArrowRight className="size-4" />
          </Link>
          <Link
            href="https://github.com/engraya/SlideForge"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              buttonVariants({ variant: 'outline', size: 'lg' }),
              'gap-2 px-8',
            )}
          >
            <Github className="size-4" />
            View on GitHub
          </Link>
        </div>

        {/* Demo hint */}
        <p className="mt-6 text-xs text-muted-foreground">
          No account required. Generate your first presentation in under 30 seconds.
        </p>
      </div>
    </section>
  )
}

export default Hero
