# Rules — Netchi Sentinel

## Project Context

Netchi Sentinel adalah web app edukasi & perlindungan identitas digital untuk FTI FEST 2026. Solo developer, Next.js 15 + TypeScript + Tailwind CSS v4.

## Agent Rules

### No Database
Semua fitur pake mock data in-memory. Jangan tambah database.

### No Authentication
Semua fitur akses langsung tanpa login. Keamanan dari validasi form & sanitasi, bukan auth.

### Bahasa
- Default: Bahasa Indonesia
- Support ID/EN toggle (globe button di navbar)
- Konten edukasi harus dalam Bahasa Indonesia

### Code Style
- TypeScript strict
- "use client" di component yang pake hooks
- Folder structure: `src/app/` (routes), `src/components/` (UI), `src/lib/` (utils), `src/types/` (types)
- Tailwind CSS v4 utility classes
- Framer Motion untuk animasi

### Component Patterns
- Feature components di `src/components/features/`
- Homepage sections di `src/components/home/`
- Layout components di `src/components/layout/`
- Providers di `src/components/providers/`

### Design Tokens (from globals.css)
- Primary Blue: `bg-[#1A3CDB]`
- Orange Accent: `bg-[#EF4444]` / `text-[#EF4444]`
- Cream Text: `text-[#f5f0d5]`
- Background: `bg-[#f8fafc]`
- Foreground: `text-[#0f172a]`
- Success: `text-[#10b981]`
- Danger: `text-[#ef4444]`
- Accent: `text-[#06b6d4]`
- Font Display: Space Grotesk
- Font Mono: JetBrains Mono
- Font Pixel: Press Start 2P

### MCP Servers Available
| Server | Usage |
|--------|-------|
| Playwright | Browser automation, screenshot, testing UI |
| GitHub | Issue/PR management, code review |
| Context7 | Look up latest docs, library versions |

### Priority Order (Current Sprint)
1. Implement 5 fitur inti (breach-checker, privacy-score, password, uu-pdp, dummy-data)
2. Homepage section EDUCATION + FAQ
3. Footer
4. Security hardening (validasi form, XSS protection, CSP headers)
5. Testing
6. ID/EN language toggle logic

## Triage Labels

| Label | Meaning |
|-------|---------|
| `needs-triage` | Maintainer needs to evaluate |
| `needs-info` | Waiting for more information |
| `ready-for-agent` | Fully specified, ready for AI agent |
| `ready-for-human` | Requires human implementation |
| `wontfix` | Will not be actioned |

## Issue Tracker

Issues live in GitHub Issues. Use `gh` CLI for operations.

## Domain Docs

Repository ini single-context. Dokumentasi domain ada di `CONTEXT.md` dan `docs/adr/`.

## Writing Rules

- Gunakan Bahasa Indonesia untuk kode comments, PRD, docs
- Kode identifiers (variable, function, type names): English
- UI text: Bahasa Indonesia (default), English (toggle)
- Tulis tes sebelum implementasi fitur baru
- Jangan commit secrets atau credentials
- Jangan tambah dependency tanpa diskusi