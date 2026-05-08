import React from 'react'
import Link from 'next/link'
import {
  Sparkles,
  Globe,
  FileDown,
  Zap,
  Users,
  GraduationCap,
  Briefcase,
  Pencil,
  ArrowRight,
  CheckCircle2,
  LayoutTemplate,
  Brain,
  Clock,
} from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const stats = [
  { value: '9+', label: 'Languages Supported' },
  { value: '20', label: 'Slides Per Deck' },
  { value: '< 30s', label: 'Generation Time' },
  { value: '100%', label: 'Free to Use' },
]

const audience = [
  {
    icon: Briefcase,
    title: 'Business Professionals',
    description: 'Deliver boardroom-ready decks in seconds. Spend less time on slides, more time on strategy.',
    color: 'from-violet-500 to-indigo-500',
  },
  {
    icon: GraduationCap,
    title: 'Students & Educators',
    description: 'Generate lecture slides, research presentations, and project decks instantly.',
    color: 'from-cyan-500 to-blue-500',
  },
  {
    icon: Pencil,
    title: 'Content Creators',
    description: 'Stop wrestling with layouts. Let AI structure your ideas so you can focus on storytelling.',
    color: 'from-pink-500 to-rose-500',
  },
  {
    icon: Globe,
    title: 'Global Teams',
    description: 'Create multilingual presentations for international audiences with a single click.',
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: Users,
    title: 'Anyone',
    description: 'No design skills required. If you can describe a topic, SlideForge can build the deck.',
    color: 'from-amber-500 to-orange-500',
  },
]

const howItWorks = [
  {
    step: '01',
    icon: FileDown,
    title: 'Enter Your Topic',
    description: 'Type any subject, choose your language, slide count, and tone.',
  },
  {
    step: '02',
    icon: Brain,
    title: 'AI Generates Content',
    description: 'Google Gemini structures your content into a logical, well-written slide deck.',
  },
  {
    step: '03',
    icon: LayoutTemplate,
    title: 'Download & Edit',
    description: 'Get a fully editable .pptx file ready for PowerPoint, Keynote, or Google Slides.',
  },
]

const techFeatures = [
  'Powered by Google Gemini AI',
  'Built with Next.js 15 & React 19',
  'Fast API backend on Render',
  'python-pptx for native .pptx output',
  'Supports 9+ languages',
  'No account or sign-up needed',
]

export default function AboutPage() {
  return (
    <div className="w-full">

      {/* Hero section */}
      <section className="relative overflow-hidden py-20 sm:py-28 text-center">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full bg-violet-500/10 blur-[120px]" />
        </div>
        <div className="container max-w-4xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-violet-200 bg-violet-50 text-violet-700 text-sm font-medium mb-6 dark:border-violet-800 dark:bg-violet-950 dark:text-violet-300">
            <Sparkles className="size-3.5" />
            About SlideForge
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] mb-6">
            AI-Powered Presentations,{' '}
            <span className="bg-gradient-to-r from-violet-600 via-indigo-500 to-cyan-500 bg-clip-text text-transparent">
              Built for Everyone
            </span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg sm:text-xl text-muted-foreground leading-relaxed">
            SlideForge turns any topic into a polished, editable PowerPoint deck in under 30 seconds — no design skills, no friction.
          </p>
        </div>
      </section>

      {/* Stats bar */}
      <section className="border-y border-border bg-muted/30 py-8">
        <div className="container max-w-4xl mx-auto px-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            {stats.map(({ value, label }) => (
              <div key={label} className="flex flex-col gap-1">
                <span className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-violet-600 to-indigo-500 bg-clip-text text-transparent">
                  {value}
                </span>
                <span className="text-sm text-muted-foreground font-medium">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What is SlideForge */}
      <section className="py-20 sm:py-24">
        <div className="container max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-6">
            <span className="bg-gradient-to-r from-green-400 to-purple-500 bg-clip-text text-transparent">
              What is SlideForge?
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
            SlideForge is an AI-powered presentation generator that instantly creates structured PowerPoint files from any topic. Whether you&apos;re a student, business professional, educator, or researcher, SlideForge simplifies your workflow by generating high-quality, editable slides in multiple languages — in seconds.
          </p>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 sm:py-20 bg-muted/20 border-y border-border">
        <div className="container max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
              <span className="bg-gradient-to-r from-violet-600 to-cyan-500 bg-clip-text text-transparent">
                How It Works
              </span>
            </h2>
            <p className="text-muted-foreground">Three steps from topic to download.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
            {howItWorks.map(({ step, icon: Icon, title, description }) => (
              <div
                key={step}
                className="relative flex flex-col items-center text-center gap-4 p-6 rounded-2xl border border-border bg-card shadow-sm"
              >
                <span className="absolute -top-3 left-6 text-xs font-bold text-muted-foreground bg-background border border-border px-2 py-0.5 rounded-full">
                  Step {step}
                </span>
                <div className="flex items-center justify-center size-12 rounded-full bg-violet-100 dark:bg-violet-950 text-violet-600 dark:text-violet-400">
                  <Icon className="size-6" />
                </div>
                <h3 className="text-lg font-semibold">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why SlideForge */}
      <section className="py-20 sm:py-24">
        <div className="container max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-6">
            <span className="bg-gradient-to-r from-green-400 to-purple-500 bg-clip-text text-transparent">
              Why SlideForge?
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed mb-10">
            Traditional slide creation is time-consuming and repetitive. SlideForge automates the entire process using cutting-edge AI, giving you well-structured, ready-to-present slides in seconds. With support for multiple languages, it&apos;s the go-to tool for global teams and multilingual audiences.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
            {[
              'No design skills required',
              'Instant AI-generated content',
              'Fully editable .pptx output',
              'Multi-language support',
              'Save hours every week',
              'Free — no account needed',
            ].map((item) => (
              <div key={item} className="flex items-center gap-3 p-4 rounded-xl border border-border bg-card">
                <CheckCircle2 className="size-5 text-violet-600 dark:text-violet-400 shrink-0" />
                <span className="text-sm font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who is it for */}
      <section className="py-16 sm:py-20 bg-muted/20 border-y border-border">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
              <span className="bg-gradient-to-r from-green-400 to-purple-500 bg-clip-text text-transparent">
                Who Is It For?
              </span>
            </h2>
            <p className="text-muted-foreground">SlideForge is built for anyone who presents ideas.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {audience.map(({ icon: Icon, title, description, color }) => (
              <div
                key={title}
                className="flex flex-col gap-4 p-6 rounded-2xl border border-border bg-card shadow-sm hover:shadow-md transition-shadow"
              >
                <div className={cn('flex items-center justify-center size-11 rounded-xl bg-gradient-to-br text-white shrink-0', color)}>
                  <Icon className="size-5" />
                </div>
                <div>
                  <h3 className="text-base font-semibold mb-1">{title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech stack */}
      <section className="py-20 sm:py-24">
        <div className="container max-w-3xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-violet-200 bg-violet-50 text-violet-700 text-sm font-medium mb-6 dark:border-violet-800 dark:bg-violet-950 dark:text-violet-300">
            <Zap className="size-3.5" />
            Under the Hood
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
            Built with Modern Tech
          </h2>
          <p className="text-muted-foreground mb-10">
            SlideForge pairs a fast Next.js frontend with a Python FastAPI backend to deliver professional presentations at speed.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
            {techFeatures.map((feat) => (
              <div key={feat} className="flex items-center gap-3 p-4 rounded-xl border border-border bg-card">
                <Clock className="size-4 text-cyan-500 shrink-0" />
                <span className="text-sm">{feat}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 sm:py-24 text-center border-t border-border bg-gradient-to-b from-background to-violet-50/40 dark:to-violet-950/20">
        <div className="container max-w-2xl mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
            Ready to forge your first slide deck?
          </h2>
          <p className="text-muted-foreground mb-8">
            No sign-up. No credit card. Just results.
          </p>
          <Link
            href="/generate"
            className={cn(
              buttonVariants({ size: 'lg' }),
              'bg-violet-600 hover:bg-violet-700 text-white border-0 gap-2 px-10',
            )}
          >
            Start Generating
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>

    </div>
  )
}
