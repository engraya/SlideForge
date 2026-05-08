import { Sparkles, Globe, PenLine, Clock, Share2, MessageSquare, CloudUpload, Lightbulb } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { LucideIcon } from 'lucide-react'

interface Benefit {
  icon: LucideIcon
  title: string
  description: string
}

const benefits: Benefit[] = [
  {
    icon: Sparkles,
    title: "AI-Powered Slide Generation",
    description:
      "Effortlessly convert any topic into a structured, visually engaging presentation with AI-driven automation.",
  },
  {
    icon: Globe,
    title: "Multi-Language Support",
    description:
      "Create presentations in 9 languages — perfect for international business, education, and research.",
  },
  {
    icon: PenLine,
    title: "Fully Editable Output",
    description:
      "Download AI-generated slides in .pptx format and customize text, design, and layout to match your brand.",
  },
  {
    icon: Clock,
    title: "Save Hours of Work",
    description:
      "Eliminate manual slide creation. Let AI generate structured content while you focus on delivery.",
  },
  {
    icon: Share2,
    title: "Easy Export & Sharing",
    description:
      "Download in PowerPoint format and share with your team, clients, or audience instantly.",
  },
  {
    icon: MessageSquare,
    title: "AI Speaker Notes",
    description:
      "Get AI-generated speaker notes alongside your slides to deliver confident, well-structured presentations.",
  },
  {
    icon: CloudUpload,
    title: "Access Anywhere",
    description:
      "Download and store your presentations in the cloud — accessible from any device at any time.",
  },
  {
    icon: Lightbulb,
    title: "Smart AI Enhancements",
    description:
      "Get AI suggestions for improving slide content, visuals, and layout to maximize impact.",
  },
]

const Benefits = () => {
  return (
    <section id="benefits" className="container max-w-7xl mx-auto px-4 md:px-8 lg:px-12 py-20 lg:py-28">

      {/* Section header */}
      <div className="mx-auto max-w-2xl text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-violet-200 bg-violet-50 text-violet-700 text-xs font-medium mb-4 dark:border-violet-800 dark:bg-violet-950 dark:text-violet-300">
          Why it matters
        </div>
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground mb-4">
          Why choose{' '}
          <span className="bg-gradient-to-r from-violet-600 to-indigo-500 bg-clip-text text-transparent">
            IntelliSlide-AI?
          </span>
        </h2>
        <p className="text-muted-foreground text-lg leading-relaxed">
          Designed to save you time and make every presentation look professionally crafted.
        </p>
      </div>

      {/* Benefits grid */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {benefits.map(({ icon: Icon, title, description }) => (
          <div key={title} className={cn('flex flex-col items-center text-center gap-4')}>
            {/* Icon circle */}
            <div className="flex items-center justify-center size-16 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 shadow-lg shadow-violet-500/20">
              <Icon className="size-7 text-white" strokeWidth={1.75} />
            </div>
            <div className="space-y-1.5">
              <h3 className="font-semibold text-foreground">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Benefits
