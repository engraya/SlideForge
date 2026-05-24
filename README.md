<div align="center">

<img src="public/images/logo.png" alt="SlideForge Logo" width="72" height="72" />

# SlideForge

**Turn any topic into a polished PowerPoint presentation in under 30 seconds.**

*AI-generated. Fully editable. Zero design skills required.*

[![Next.js](https://img.shields.io/badge/Next.js_15-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org)
[![React](https://img.shields.io/badge/React_19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript_5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Google Gemini](https://img.shields.io/badge/Google_Gemini_AI-8E75B2?style=for-the-badge&logo=google&logoColor=white)](https://deepmind.google/technologies/gemini)
[![License: MIT](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

[**Live Demo**](https://github.com/engraya/SlideForge) · [**Report a Bug**](https://github.com/engraya/SlideForge/issues) · [**Request a Feature**](https://github.com/engraya/SlideForge/issues)

</div>

---

## Overview

SlideForge is an AI-powered presentation generator. Describe any topic, set a few preferences, and receive a professionally structured, fully editable `.pptx` file in seconds — no account, no credit card, no design experience required.

The product is built as a decoupled system: a **Next.js 15** frontend owns the user experience and manages the async generation lifecycle, while a **Python FastAPI** backend drives content generation via **Google Gemini** and native `.pptx` authoring via `python-pptx`. The architecture separates concerns cleanly so each layer can be developed, scaled, and deployed independently.

**Who it's for:**
- Business professionals who need boardroom-ready decks on a deadline
- Students and educators building lecture slides or research presentations
- Content creators who want structure without wrestling with slide software
- Global teams presenting to multilingual audiences

---

## Screenshots

| Landing Page | Generate Page | Ready to Download |
|:---:|:---:|:---:|
| ![Landing](docs/screenshots/landing.png) | ![Generate](docs/screenshots/generate.png) | ![Ready](docs/screenshots/ready.png) |

> Run locally to preview. Screenshots directory is a placeholder.

---

## Features

### Core Generation
- **Topic-to-deck in seconds** — describe any subject and receive a fully structured slide deck authored by Google Gemini
- **Smart slide structuring** — AI generates titles, bullet points, and logical content flow automatically
- **AI speaker notes** — presentation-ready notes generated alongside each slide
- **Image & chart placeholders** — each slide includes designated areas for visuals so you know exactly where to drop in your graphics

### Customization
- **1–20 slides** — control the depth and length of the deck
- **3 visual themes** — Professional, Minimal, or Vibrant
- **3 layout preferences** — Varied (balanced mix), Text-Heavy (content-first), or Image-Focused (visuals-first)
- **9 output languages** — English, Spanish, French, German, Arabic, Chinese (Mandarin), Hindi, Portuguese, Japanese

### Output & Export
- **Native `.pptx` output** — a real, fully editable PowerPoint file, not a PDF or image export
- **Universal compatibility** — opens in Microsoft PowerPoint, Google Slides, and Apple Keynote without conversion
- **Instant browser download** — MIME-validated blob, triggered directly in the browser with no intermediate server storage step

### User Experience
- **No account required** — zero friction from landing page to `.pptx` in hand
- **Dark mode** — system-aware by default with a manual override toggle
- **Responsive layout** — fully usable on mobile, tablet, and desktop
- **Real-time feedback** — toast notifications surface every phase of the generation pipeline
- **Sticky blur-on-scroll header** — navigation stays accessible and transitions smoothly as the user scrolls

### Developer Quality
- **Finite state machine** — the async lifecycle is a discriminated union (`idle → generating → polling → ready | error`); illegal state transitions are unrepresentable at compile time
- **Memory-safe polling** — `AbortController` cancels in-flight requests on unmount; all intervals and timeouts are registered and cleaned up in a single `stopPolling` function
- **Hardened security headers** — CSP, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`, and `X-DNS-Prefetch-Control` applied to every route
- **Typed end-to-end** — strict TypeScript across all API contracts, form schemas, state shapes, and component props

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | [Next.js 15](https://nextjs.org) — App Router, Turbopack |
| **UI Library** | [React 19](https://react.dev) |
| **Language** | [TypeScript 5](https://www.typescriptlang.org) (strict mode) |
| **Styling** | [Tailwind CSS 4](https://tailwindcss.com) · OKLCH design tokens · CSS variables |
| **Components** | [shadcn/ui](https://ui.shadcn.com) (Radix UI primitives + CVA) — new-york style |
| **Forms** | [React Hook Form](https://react-hook-form.com) + [Zod](https://zod.dev) schema validation |
| **HTTP Client** | [Axios](https://axios-http.com) — configured instance with request/response interceptors |
| **Notifications** | [Sonner](https://sonner.emilkowal.ski) — toast system |
| **Icons** | [Lucide React](https://lucide.dev) |
| **Typography** | [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans) via `next/font/google` |
| **Theme** | [next-themes](https://github.com/pacocoursey/next-themes) — dark/light/system |
| **AI Provider** | [Google Gemini](https://deepmind.google/technologies/gemini) (via Python backend) |
| **Backend** | FastAPI (Python) · `python-pptx` · deployed on [Render](https://render.com) |
| **Frontend Deploy** | [Vercel](https://vercel.com) |

---

## Architecture

### System Overview

```
Browser (Next.js 15 / Vercel)             FastAPI Backend (Render)
        │                                          │
        │  POST /api/v1/presentations              │
        │ ────────────────────────────────────────►│  Queue job, return immediately
        │        { job_id: "abc123" }              │
        │ ◄────────────────────────────────────────│
        │                                          │
        │  GET /api/v1/presentations/abc123/status │
        │ ────────────────────────────────────────►│  Gemini generates content
        │    (polled every 2 s, up to 10 min)      │  python-pptx builds .pptx
        │        { status: "ready" }               │
        │ ◄────────────────────────────────────────│
        │                                          │
        │  GET /api/v1/presentations/abc123/download
        │ ────────────────────────────────────────►│
        │        [binary blob: .pptx]              │
        │ ◄────────────────────────────────────────│
        │                                          │
        └── browser saves file ──────────────────► 
```

The frontend never blocks on generation. It fires a job, then polls at 2-second intervals until the backend signals `ready` or `failed`. A 10-minute hard timeout prevents indefinite polling regardless of backend state.

### Async State Machine

`usePresentation` models the entire lifecycle as a discriminated union — a pattern that makes illegal state transitions unrepresentable at compile time:

```
idle
 └─► generating      (POST /presentations)
       └─► polling       (job queued, polling interval started)
             ├─► ready       (status === "ready")
             │     └─► downloading   (GET /download triggered)
             │           └─► ready   (download complete — re-downloadable)
             └─► error      (status === "failed" | 10 min timeout | network error)
```

Every `Action` type maps to exactly one valid transition. Components consume derived booleans (`isGenerating`, `isPolling`, `isReady`, `isDownloading`) — never raw phase strings — which keeps UI logic declarative and testable.

### Folder Structure

```
SlideForge/
├── src/
│   ├── app/
│   │   ├── (main)/                       # Route group — shares nav/footer layout
│   │   │   ├── _components/              # Page-colocated, non-routable components
│   │   │   │   ├── hero.tsx              # Landing hero with mesh gradient background
│   │   │   │   ├── features.tsx          # 9-card feature grid
│   │   │   │   ├── benefits.tsx          # 8-item benefits section
│   │   │   │   ├── PresentationForm.tsx  # RHF + Zod form (topic, slides, lang, theme, layout)
│   │   │   │   └── Generated.tsx         # Post-generation download / generate-again UI
│   │   │   ├── about/
│   │   │   │   └── page.tsx              # Full marketing page with stats, how-it-works, audience
│   │   │   └── generate/
│   │   │       ├── page.tsx              # Main generator — form ↔ download panel switch
│   │   │       ├── loading.tsx           # Suspense skeleton
│   │   │       └── error.tsx             # Route-level error boundary
│   │   ├── layout.tsx                    # Root layout: font, ThemeProvider, Header, Footer, Toaster
│   │   ├── page.tsx                      # / — landing page (Hero + Features + Benefits)
│   │   ├── not-found.tsx                 # Custom 404
│   │   ├── error.tsx                     # Global error boundary
│   │   └── globals.css                   # Tailwind 4 entry + OKLCH design token declarations
│   │
│   ├── components/
│   │   ├── ui/                           # shadcn/ui primitives (Button, Input, Select, Dialog…)
│   │   ├── header/                       # Sticky, blur-on-scroll responsive navigation
│   │   ├── footer/                       # Three-column footer with brand, nav, and links
│   │   ├── theme-switch/                 # Dark / Light / System toggle (tested)
│   │   ├── ThemeProvider.tsx             # next-themes wrapper
│   │   ├── Spinner.tsx                   # Inline loading indicator
│   │   ├── ErrorContainer.tsx            # Reusable error display
│   │   └── PagesWrapper.tsx              # Layout utility
│   │
│   ├── hooks/
│   │   ├── use-presentation.ts           # Core FSM — generate → poll → download lifecycle
│   │   ├── use-on-scroll.ts              # Scroll position (passive listener, no layout thrash)
│   │   ├── use-mounted.ts                # Hydration-safe mounted guard
│   │   ├── use-theme.ts                  # Theme state accessor
│   │   └── index.ts                      # Barrel export
│   │
│   ├── services/
│   │   └── presentation.service.ts       # API layer: generatePresentation, fetchStatus, download
│   │
│   ├── config/
│   │   ├── axios.ts                      # Axios instance — base URL, 15 s timeout, error normalisation
│   │   └── languages.ts                  # 9 supported language definitions
│   │
│   ├── lib/
│   │   ├── validations.ts                # Zod schema + inferred TypeScript types
│   │   └── utils.ts                      # cn() — clsx + tailwind-merge
│   │
│   └── types/
│       └── types.d.ts                    # Shared interfaces: PresentationJobResponse, FormValues, etc.
│
├── public/images/                        # Static assets (logo, og image)
├── next.config.ts                        # Security headers + Next.js config
├── .env.example                          # Environment variable reference
└── package.json
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org) 20+
- `npm` (included with Node.js)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/engraya/SlideForge.git
cd SlideForge

# 2. Install dependencies
npm install

# 3. Configure environment variables
cp .env.example .env.local
```

### Environment Variables

`.env.local` has a single required variable:

```env
# Base URL for the FastAPI backend that handles Gemini AI generation and .pptx output.
# The public Render deployment is the default. Point at localhost during backend development.
NEXT_PUBLIC_API_URL=https://intellislide-ai-api.onrender.com
```

### Development

```bash
npm run dev
```

Opens at [http://localhost:3000](http://localhost:3000) with Turbopack hot reload.

### Production Build

```bash
npm run build   # Type-check + bundle for production
npm run start   # Serve the production build locally
```

### Linting

```bash
npm run lint    # ESLint — Next.js core-web-vitals + TypeScript rules
```

---

## API Reference

All API calls go through the configured `NEXT_PUBLIC_API_URL`. The Axios instance in `src/config/axios.ts` applies the base URL, a 15-second timeout, and normalises error messages from both server responses and network failures.

### POST `/api/v1/presentations` — Create a job

```json
// Request body
{
  "topic": "Climate Change & Renewable Energy",
  "num_slides": 10,
  "language": "English",
  "theme": "professional",
  "layout_preference": "Varied"
}
```

| Field | Type | Constraints |
|---|---|---|
| `topic` | `string` | 3–200 characters |
| `num_slides` | `integer` | 1–20 |
| `language` | `string` | See supported languages below |
| `theme` | `string` | `professional` · `minimal` · `vibrant` |
| `layout_preference` | `string` | `Varied` · `Text-Heavy` · `Image-Focused` |

```json
// Response — job queued
{
  "job_id": "abc123",
  "status": "pending",
  "message": "Presentation generation queued!",
  "filename": null,
  "download_url": null
}
```

### GET `/api/v1/presentations/{job_id}/status` — Poll status

```json
// While processing
{ "status": "processing", "job_id": "abc123", "message": "Generating slides...", "filename": null, "download_url": null }

// When ready
{ "status": "ready", "job_id": "abc123", "message": "Done", "filename": "presentation-abc123.pptx", "download_url": "/api/v1/presentations/abc123/download" }
```

| `status` | Meaning |
|---|---|
| `pending` | Queued, generation not yet started |
| `processing` | Gemini is generating content |
| `ready` | `.pptx` built and available for download |
| `failed` | Generation failed — see `message` for reason |

The frontend polls every **2 seconds** with a **10-minute hard timeout** enforced client-side via `setTimeout`.

### GET `/api/v1/presentations/{job_id}/download` — Download file

Returns the `.pptx` binary blob. The client validates the MIME type (`application/vnd.openxmlformats-officedocument.presentationml.presentation`) before triggering a browser download via `URL.createObjectURL`. The object URL is revoked in a `finally` block to prevent memory leaks.

### Supported Languages

| Code | Language |
|---|---|
| `en` | English |
| `es` | Spanish |
| `fr` | French |
| `de` | German |
| `ar` | Arabic |
| `zh` | Chinese (Mandarin) |
| `hi` | Hindi |
| `pt` | Portuguese |
| `ja` | Japanese |

---

## Design System

SlideForge uses **Tailwind CSS 4** — no `tailwind.config.*` file is required. All design tokens are declared as CSS custom properties in `globals.css` using the **OKLCH color space** for perceptually uniform color scaling across light and dark modes:

```css
:root {
  --primary: oklch(0.491 0.27 292);  /* Violet */
  --radius:  0.75rem;
}
.dark {
  --primary: oklch(0.62 0.24 292);   /* Lighter violet for dark backgrounds */
}
```

**shadcn/ui** components in `src/components/ui/` use the **new-york** preset. All visual tokens flow from CSS variables — update a token and the entire UI reflects it instantly.

**next-themes** manages dark/light/system switching. The Tailwind `dark` custom variant (`&:is(.dark *)`) applies dark-mode styles based on the `.dark` class on `<html>`, and `suppressHydrationWarning` prevents SSR/client hydration mismatches.

---

## Security Headers

Applied globally in `next.config.ts` via `async headers()`:

| Header | Value |
|---|---|
| `Content-Security-Policy` | Restricts `connect-src` to `self` + API URL; `frame-ancestors 'none'` |
| `X-Frame-Options` | `SAMEORIGIN` |
| `X-Content-Type-Options` | `nosniff` |
| `Referrer-Policy` | `strict-origin-when-cross-origin` |
| `X-DNS-Prefetch-Control` | `on` |
| `Permissions-Policy` | Disables camera, microphone, geolocation |

The CSP `connect-src` directive is built from `NEXT_PUBLIC_API_URL` at build time — update the environment variable if the backend URL changes.

---

## Performance

- **Turbopack** — Next.js 15's Rust-based dev bundler delivers sub-second hot reload
- **Passive scroll listener** — `useOnScroll` registers with `{ passive: true }` to avoid blocking the main thread during header blur transitions
- **AbortController cleanup** — all polling requests are tied to an abort signal; in-flight requests are cancelled immediately on component unmount or user-triggered reset
- **Interval and timeout hygiene** — `stopPolling` is a single, ref-tracked function that clears the poll interval, the safety timeout, and the abort controller atomically
- **Font optimisation** — Plus Jakarta Sans loaded via `next/font/google` with subset preloading and zero cumulative layout shift
- **Blob URL revocation** — `URL.revokeObjectURL()` is called in a `finally` block after every download, preventing long-lived memory retention

---

## Deployment

### Frontend — Vercel

Push to `main` and Vercel deploys automatically via Git integration.

Set `NEXT_PUBLIC_API_URL` in your Vercel project's **Environment Variables** dashboard to point at your production backend.

```bash
# Manual production deploy
npm run build
npm run start
```

### Backend — Render

The FastAPI backend is a separate service deployed on Render. It handles:

1. Accepting generation jobs and returning `job_id` immediately (non-blocking queue pattern)
2. Running Google Gemini to structure topic content into slide-ready text
3. Authoring the native `.pptx` file with `python-pptx`
4. Serving the built file on the download endpoint

Set `NEXT_PUBLIC_API_URL` in the frontend to the Render service URL. No additional frontend changes are required when redeploying the backend.

---

## Future Improvements

The following are realistic next steps grounded in the current architecture:

- **Template library** — curated master slide templates beyond the three current themes
- **Image auto-population** — integrate Unsplash or Google Images API to fill placeholder regions automatically
- **Presentation history** — local storage or lightweight user accounts for revisiting past decks
- **In-browser slide preview** — render a slide-by-slide preview before committing to download
- **Custom branding** — upload a logo and color palette to embed brand identity into every generated deck
- **PDF export** — alternative export for read-only distribution
- **WebSocket or SSE progress** — replace polling with server-sent events for real-time generation progress
- **Rate-limit feedback** — surface backend 429 responses as informative UI messages rather than generic errors

---

## Contributing

Contributions are welcome. Follow this workflow:

1. **Fork** the repository and create a branch from `main`:
   ```bash
   git checkout -b feat/your-feature-name
   ```

2. **Make your changes.** Keep commits focused and atomic.

3. **Lint before pushing:**
   ```bash
   npm run lint
   ```

4. **Open a pull request** against `main` with a clear description of what changed and why.

**Guidelines:**
- Match the existing TypeScript strictness — no `any`, no implicit `unknown`
- Follow the discriminated-union pattern for any new async lifecycle hooks
- Page-local components belong in `_components/`; reusable ones in `src/components/`
- Do not commit `.env.local` or any file containing secrets

---

## Acknowledgements

- [Google Gemini](https://deepmind.google/technologies/gemini) — AI content generation
- [python-pptx](https://python-pptx.readthedocs.io) — native PowerPoint file authoring
- [shadcn/ui](https://ui.shadcn.com) — accessible, composable component primitives
- The Next.js, React, and FastAPI communities

---

## License

This project is licensed under the [MIT License](LICENSE).

---

<div align="center">

Built by [Ahmad Yakubu Ahmad](https://github.com/engraya) · [engrahmadaya.vercel.app](https://engrahmadaya.vercel.app)

[GitHub](https://github.com/engraya/SlideForge) · [Report an Issue](https://github.com/engraya/SlideForge/issues)

</div>
