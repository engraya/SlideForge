import { Sparkles, Globe, FileDown, LayoutTemplate, ImageIcon, Zap, Download, Palette, Cloud } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { LucideIcon } from 'lucide-react'

interface Feature {
  icon: LucideIcon
  title: string
  description: string
}

const features: Feature[] = [
  {
    icon: Sparkles,
    title: "AI-Powered Generation",
    description:
      "Turn any topic into a fully structured PowerPoint presentation instantly. AI handles content, layout, and formatting.",
  },
  {
    icon: Globe,
    title: "Multi-Language Support",
    description:
      "Generate presentations in 9 languages — English, Spanish, French, German, Arabic, and more.",
  },
  {
    icon: FileDown,
    title: "Editable .pptx Output",
    description:
      "Download slides in .pptx format and modify text, design, and layout in PowerPoint, Google Slides, or Keynote.",
  },
  {
    icon: LayoutTemplate,
    title: "Smart Slide Structuring",
    description:
      "AI organizes slides with clear titles, bullet points, and logical flow to keep your audience engaged.",
  },
  {
    icon: ImageIcon,
    title: "Image & Chart Placeholders",
    description:
      "Each slide includes placeholders for visuals, making it easy to enhance your presentation with graphics.",
  },
  {
    icon: Zap,
    title: "Fast Slide Creation",
    description:
      "Generate an entire presentation in seconds. AI takes care of research and slide arrangement so you don't have to.",
  },
  {
    icon: Download,
    title: "Seamless Export",
    description:
      "Export as a PowerPoint file instantly, ready for customization or immediate presentation.",
  },
  {
    icon: Palette,
    title: "Theme & Design Options",
    description:
      "Choose from Professional, Minimal, or Vibrant themes to match your audience and context.",
  },
  {
    icon: Cloud,
    title: "Cloud-Ready & Shareable",
    description:
      "Access your presentations from any device and share with teammates, clients, or your audience.",
  },
]

const Features = () => {
  return (
    <section id="features" className="container max-w-7xl mx-auto px-4 md:px-8 lg:px-12 py-20 lg:py-28">

      {/* Section header */}
      <div className="mx-auto max-w-2xl text-center mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-violet-200 bg-violet-50 text-violet-700 text-xs font-medium mb-4 dark:border-violet-800 dark:bg-violet-950 dark:text-violet-300">
          What you get
        </div>
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground mb-4">
          Everything you need to{' '}
          <span className="bg-gradient-to-r from-violet-600 to-indigo-500 bg-clip-text text-transparent">
            present with confidence
          </span>
        </h2>
        <p className="text-muted-foreground text-lg leading-relaxed">
          From topic to polished slides in seconds. IntelliSlide-AI handles the heavy lifting so you can focus on delivering.
        </p>
      </div>

      {/* Feature cards grid */}
      <div className={cn('grid gap-5', 'sm:grid-cols-2', 'lg:grid-cols-3')}>
        {features.map(({ icon: Icon, title, description }) => (
          <div
            key={title}
            className={cn(
              'group flex flex-col gap-4 rounded-xl border border-border bg-card p-6',
              'shadow-sm hover:shadow-md',
              'hover:border-violet-200 dark:hover:border-violet-800',
              'transition-all duration-200',
            )}
          >
            <div className="flex items-center justify-center size-10 rounded-lg bg-violet-50 dark:bg-violet-950 shrink-0">
              <Icon className="size-5 text-violet-600 dark:text-violet-400" />
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

export default Features
