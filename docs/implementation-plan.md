# Implementation Plan — Security, i18n, Testing, Documentation

**Generated**: 2026-08-03 | **Deadline**: 18 Aug 2026
**Scope**: Score-impacting items — Security (15%), Code Quality & Docs (20%), i18n (PRD P2), Testing (25% Fungsionalitas)

---

## Current State Summary

| Area | Status |
|------|--------|
| Feature pages (breach-checker, privacy-score, password, uu-pdp, dummy-data) | Directory stubs exist, no page.tsx content |
| API routes (src/app/api/) | Directory exists, empty |
| i18n toggle (Navbar/Hero globe) | Static UI buttons only, no state or translation system |
| Security headers | 
ext.config.ts is empty {} |
| Middleware | None (middleware.ts missing) |
| Tests | None (no test files, no test framework) |
| README | Default create-next-app boilerplate |
| dangerouslySetInnerHTML | Not found in current code |
| Env validation | No .env.local, no env schema |

---

## Priority 1: Security Hardening (15% score)

### 1.1 Input Validation — All Forms
**Effort**: Medium | **When**: During feature page build

Every feature page has a form. Validate server-side AND client-side.

| Page | Inputs to Validate | Rules |
|------|--------------------|-------|
| Breach Checker | Email/username | Regex for email format, max 254 chars, strip whitespace, reject HTML entities |
| Privacy Score | Quiz answers (10-15 radio selections) | Must be one of "never"/"sometimes"/"always", count must equal question count, reject unexpected keys |
| Password Generator | Length (8-64 integer), toggle booleans (1-4), count (1-10 integer) | Clamp range, reject NaN/negative, boolean coercion check |
| Dummy Data Generator | Field selection array, count (1-20), locale string | Allowlist of field names, count clamp, locale must be "id-ID" |

**Implementation**:
- Create src/lib/validate.ts with pure validation functions (no deps needed):
  `	s
  export function validateEmail(input: string): { ok: true; value: string } | { ok: false; error: string }
  export function clampInt(val: unknown, min: number, max: number): number
  export function allowlist<T extends string>(val: unknown, allowed: T[]): T | null
  `
- Call validation before processing in each feature component
- Display inline error states (no toast library needed — use existing Tailwind styling)

### 1.2 XSS Protection
**Effort**: Low | **When**: During feature page build

**What's already safe**:
- React JSX escapes text content by default — zero risk from {variable} interpolation
- No dangerouslySetInnerHTML in codebase
- No document.innerHTML or window.eval usage

**What needs attention**:
- **URL handling** — If any feature renders links from user input (e.g., breach source URLs), validate with 
ew URL() and only allow http:/https: protocols. Reject javascript: URIs.
- **Clipboard API** — Password generator and dummy data use 
avigator.clipboard.writeText(). The text is developer-generated, not user-supplied, so no XSS vector.
- **CSV/JSON download** — Dummy data export generates content from structured data. Ensure proper escaping of CSV fields (quote-wrap fields containing commas/newlines).
- **Future-proof**: Add a guard in src/lib/sanitize.ts:
  `	s
  export function safeUrl(raw: string): string | null // returns null if not http(s)
  `

### 1.3 Security Headers
**Effort**: Low | **When**: One-time config

Add security headers in 
ext.config.ts via the headers() API (built into Next.js 15, no new deps):

`	s
// next.config.ts
const nextConfig: NextConfig = {
  headers: async () => [
    {
      source: "/(.*)",
      headers: [
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "X-Frame-Options", value: "DENY" },
        { key: "X-XSS-Protection", value: "1; mode=block" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        // CSP: Add after confirming no inline scripts. Start restrictive:
        { key: "Content-Security-Policy", value: "default-src 'self'; script-src 'self' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self' https://fonts.gstatic.com; connect-src 'self'; frame-ancestors 'none'" },
      ],
    },
  ],
};
`

**CSP caveat**: Framer Motion and GSAP may require 'unsafe-eval' in script-src. Test build, then tighten. Document the exact CSP reason in a comment.

### 1.4 Env Variable Validation (If APIs Are Added)
**Effort**: Low | **When**: Before any API route that reads env

If breach checker ever hits an external API (e.g., HIBP), validate env at startup:
- Create src/lib/env.ts with a simple check (no zod dep needed):
  `	s
  const API_KEY = process.env.BREACH_API_KEY;
  if (!API_KEY) throw new Error("Missing BREACH_API_KEY");
  `
- .env.example already exists — document required vars there

### 1.5 API Route Protection (If Used)
**Effort**: Low | **When**: When API routes are built

If any API routes are created (e.g., /api/breach):
- Validate request body with same alidate.ts functions
- Return proper status codes (400 for bad input, 429 for rate limit)
- Simple in-memory rate limit: Map<IP, {count, resetTime}> — 30 req/min per IP
- Never log or expose sensitive user input in error responses

---

## Priority 2: ID/EN Toggle (i18n) — PRD P2

### 2.1 Architecture Decision
**Approach**: Simple React Context + dictionary files (NOT next-intl)

**Rationale**:
- This is a static-content site (no server-side rendering of localized content)
- Only 2 languages (ID/EN), no locale routing (/en/... not needed per PRD)
- Globe toggle already exists in Hero + Navbar — just needs state plumbing
- 
ext-intl adds ~15KB, middleware complexity, and locale-prefixed routing — overkill for toggle on static strings
- Simple context = zero new deps, fits the existing component tree

### 2.2 Implementation Plan

**New files** (5 total):

1. **src/lib/i18n/translations.ts** — All translatable strings:
   `	s
   export type Locale = "id" | "en";
   const translations = {
     id: {
       hero: { headline: "Netchi Sentinel", sub: "Privasi Data & Proteksi Identitas Digital yang Melawan Kompleksitas", ... },
       nav: { menu: "Menu", cta: "MULAI SEKARANG", explore: "Jelajahi" },
       breachChecker: { title: "Breach Checker", ... },
       privacyScore: { ... },
       password: { ... },
       uuPdp: { ... },
       dummyData: { ... },
       // ...all static strings
     },
     en: { /* mirror structure with English */ },
   } as const;
   export function t(locale: Locale, key: string): string { ... }
   `
   **Scope**: ~200-300 strings total across all pages. Organize by page/section.

2. **src/lib/i18n/LocaleContext.tsx** — React context:
   `	s
   // Provides: { locale, setLocale, t }
   // Persists to localStorage
   // Updates document.documentElement.lang
   `

3. **src/components/providers/LocaleProvider.tsx** — Wraps children, reads/writes localStorage key "netchi-locale", defaults to "id".

4. Update **src/app/layout.tsx** — Wrap <LenisProvider> in <LocaleProvider>.

5. Update **Navbar.tsx** + **Hero.tsx** — Connect globe dropdown buttons to setLocale("id") / setLocale("en"). Highlight active locale. Close dropdown after selection.

### 2.3 Scope Boundaries

**In scope** (translate these):
- All homepage text (Hero, Section2-5, Footer)
- Navbar labels and CTA
- All feature page labels, headings, descriptions, tips
- Form labels, placeholders, error messages
- Utility strings (getTimeToCrack, getStrengthLabel in ormatNumber/ormatDate)

**Out of scope** (keep Indonesian):
- UU PDP legal article content (PRD says "Konten edukasi harus dalam Bahasa Indonesia")
- Mock breach data names (proper nouns)
- Console logs

### 2.4 HTML lang Attribute
- Update <html lang="id"> ? <html lang={locale}> via the context provider
- This is required for accessibility (screen readers)

---

## Priority 3: Testing & Optimization

### 3.1 Manual Test Checklist

**Responsive Sizes** (test at each):
| Viewport | Width | What to Check |
|----------|-------|---------------|
| Mobile S | 320px | Single column, no horizontal scroll, text readable |
| Mobile M | 375px (iPhone 14) | Standard mobile experience |
| Mobile L | 428px (iPhone Pro Max) | Larger mobile |
| Tablet | 768px | Transition layout, touch targets =44px |
| Laptop | 1024px | Desktop grid visible |
| Desktop | 1440px | Full layout, max-width constraints |
| Ultra-wide | 2560px | No layout breakage, content stays readable |

**Per-page checklist**:
- [ ] Form renders and accepts input
- [ ] Submit button disabled while processing / enabled when ready
- [ ] Validation error messages display correctly (empty field, bad email, etc.)
- [ ] Results render correctly (breach found/not found, score display, password strength)
- [ ] Copy to clipboard works (Password Generator, Dummy Data)
- [ ] Download works (Dummy Data JSON/CSV)
- [ ] No console errors in DevTools
- [ ] No hydration mismatches (check React DevTools)
- [ ] Language toggle works and content switches
- [ ] Navigation links all resolve to correct routes

**Cross-browser** (minimum):
- [ ] Chrome (latest)
- [ ] Safari (latest)
- [ ] Firefox (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Android

### 3.2 Performance Checklist

| Check | Target | How |
|-------|--------|-----|
| Lighthouse Performance | =90 | Run in Chrome DevTools |
| First Contentful Paint | <1.5s | Lighthouse |
| Largest Contentful Paint | <2.5s | Lighthouse |
| Total bundle size | <250KB gzipped | 
px next build && npx @next/bundle-analyzer |
| Image optimization | All images use next/image or are SVG | Already SVG-based |
| Font loading | display: "swap" (already set) | Verify no FOIT |
| Animation performance | 60fps scroll | Check with Performance tab, GSAP/Framer Motion should use will-change or 	ransform |
| No layout shift | CLS < 0.1 | Lighthouse |

**Optimization actions**:
- Run 
px next build and check for any oversized chunks
- Dynamic-import feature pages (
ext/dynamic) if they add significant JS
- Verify Framer Motion tree-shaking (only import what's needed)
- Consider React.memo for expensive re-renders in Section3/Section4 (GSAP scroll pinned sections)
- Lazy-load 	hree.js if only used on one page (currently 0.185 in deps)

### 3.3 Automation (Minimal)
Since this is a solo dev competition project, skip full test frameworks. Instead:
- 
pm run lint — run before each commit
- 
pm run build — verify production build succeeds with zero errors
- Manual Playwright smoke test (optional, MCP server already configured): verify each route loads without JS errors

---

## Priority 4: Documentation (20% of score — Kualitas Kode & Dokumentasi)

### 4.1 README.md Overhaul
**Current state**: Default create-next-app boilerplate. Replace entirely.

**Structure**:
`markdown
# Netchi Sentinel ???
> Privasi Data & Proteksi Identitas Digital — FTI FEST 2026

## Fitur
- ?? Breach Checker — Cek apakah email pernah bocor
- ?? Privacy Score — Ukur keamanan kebiasaan digitalmu
- ?? Password Generator — Buat password super kuat
- ?? UU PDP Hub — Pahami hak data pribadimu
- ?? Dummy Data Generator — Data palsu untuk situs abal-abal

## Tech Stack
[table — copy from ARCHITECTURE.md]

## Getting Started
[install, dev, build — expand on current]

## Struktur Proyek
[folder tree — from ARCHITECTURE.md]

## Keamanan
[brief: input validation, CSP headers, no auth design]

## ID/EN Language Support
[how to add new strings, how toggle works]

## Deploy
[Vercel instructions]

## Lisensi / Credits
[FTI FEST 2026 credit]
`

### 4.2 docs/ Updates

| File | Action |
|------|--------|
| docs/PRD.md | Mark completed phases, update status column |
| docs/ARCHITECTURE.md | Update folder tree with actual files (not planned), add Security Layer detail, add i18n section |
| docs/PROJECT_BRIEF.md | Add progress section at bottom with completion % |
| docs/RULES.md | Add i18n coding conventions, add testing conventions |

### 4.3 Code-Level Documentation
- No JSDoc overload — just document non-obvious functions (calculatePasswordEntropy, getTimeToCrack)
- Add brief comments on security-critical code (validation functions, CSP config reason)
- Keep inline comments minimal (current style is clean, preserve it)

### 4.4 Type Safety as Documentation
- The existing src/types/index.ts is good — expand it as features are built
- All component props should have explicit types (already the pattern in Navbar/Hero)
- Use s const on translation dictionary for type-safe keys

---

## Execution Order (Recommended)

| Step | What | Depends On | Est. Time |
|------|------|------------|-----------|
| 1 | Build all 5 feature pages with input validation baked in | Nothing | 2-3 days |
| 2 | Add security headers to 
ext.config.ts | Nothing | 15 min |
| 3 | Create src/lib/validate.ts + src/lib/sanitize.ts | Nothing | 30 min |
| 4 | Implement i18n context + translation dictionary | Feature pages done (so all strings exist) | 1 day |
| 5 | Wire globe toggle in Navbar/Hero to i18n context | Step 4 | 30 min |
| 6 | Overhaul README.md | Feature pages done | 30 min |
| 7 | Update docs/ files | Steps 1-5 done | 30 min |
| 8 | Run manual test checklist across all sizes | All features done | 2-3 hours |
| 9 | Lighthouse + bundle analysis, optimize if needed | Step 8 identifies issues | 1-2 hours |

---

## Key Risks

1. **CSP + Framer Motion/GSAP**: 'unsafe-eval' likely needed. Test early, document why.
2. **i18n string volume**: ~200-300 strings across 6 pages. Start with homepage + feature page headers, expand incrementally.
3. **Time budget**: Deadline is 18 Aug. Feature pages are the critical path — everything else layers on top.
4. **Dummy Data field escape**: CSV export needs proper RFC 4180 escaping to prevent injection via crafted data fields.
