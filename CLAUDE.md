# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Next.js dev server with Turbopack
npm run build    # Production build
npm run lint     # ESLint (Next.js core-web-vitals + TypeScript)
npm run start    # Production server
```

No test runner is configured in package.json. The few existing tests (under `src/hooks/__tests__/` and `src/components/theme-switch/`) have no runner scripts.

## Environment

Copy `.env.example` to `.env.local`. The only required variable:

```
NEXT_PUBLIC_API_URL=https://intellislide-ai-api.onrender.com
```

## Architecture

**Stack:** Next.js 15 (App Router, Turbopack), React 19, TypeScript 5, Tailwind CSS 4, shadcn/ui (Radix + CVA), React Hook Form + Zod, Axios, Sonner.

**Backend:** A separate FastAPI service (Python) on Render that uses the Gemini API to generate content and python-pptx to produce `.pptx` files. This repo is frontend-only.

### Request flow

1. User fills the form in `src/app/(main)/generate/page.tsx` (powered by `usePresentation` hook).
2. `PresentationForm` submits via React Hook Form → validates with `presentationFormSchema` (Zod, `src/lib/validations.ts`).
3. `src/services/presentation.service.ts` calls the FastAPI backend:
   - `POST /api/v1/presentations` → returns `job_id`
   - `GET /api/v1/presentations/{jobId}/status` → polled every 2 s (10-min timeout)
   - `GET /api/v1/presentations/{jobId}/download` → triggers `.pptx` download
4. `src/config/axios.ts` wraps Axios with a base URL and error interceptors.

### State management in `usePresentation`

`src/hooks/use-presentation.ts` owns the entire async lifecycle via `useReducer` with a discriminated-union state:  
`idle → generating → polling → done | error`  
All API calls and the polling loop live here. Components receive state + dispatch-wrapped actions only.

### Routing

App Router with a `(main)` route group. Pages: `/` (landing), `/about`, `/generate`. Each page folder under `(main)` has an optional `error.tsx` and `loading.tsx`.

### UI conventions

- shadcn components live in `src/components/ui/` (new-york style, CSS variables).
- Path alias `@/*` maps to `src/*`.
- Dark mode via `next-themes` (`ThemeProvider` in root layout); toggle in `src/components/theme-switch/`.
- Font: Plus Jakarta Sans (Google Fonts, loaded in root layout).
- Tailwind CSS 4 — config is via `@tailwindcss/postcss`, no `tailwind.config.*` file.

### Security headers

`next.config.ts` sets CSP, `X-Frame-Options`, `X-Content-Type-Options`, and CORS for the Render backend. Update these if the backend URL changes.
