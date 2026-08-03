# Graph Report - netchi  (2026-08-02)

## Corpus Check
- 37 files · ~136,511 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 280 nodes · 262 edges · 32 communities (24 shown, 8 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `6ab667f5`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- dependencies
- devDependencies
- compilerOptions
- page.tsx
- layout.tsx
- include
- package.json
- utils.ts
- index.ts
- graphify.js
- eslint.config.mjs
- next.config.ts
- postcss.config.mjs
- Netchi Sentinel — FTI FEST 2026
- Architecture — Netchi Sentinel
- PRD: Netchi Sentinel — FTI FEST 2026
- Agent Rules
- What You Must Do When Invoked
- /graphify
- graphify reference: extra exports and benchmark
- graphify reference: query, path, explain
- User Flow — Netchi Sentinel
- graphify reference: add a URL and watch a folder
- graphify reference: commit hook and native CLAUDE.md integration
- graphify reference: incremental update and cluster-only
- README.md
- graphify reference: GitHub clone and cross-repo merge
- graphify reference: transcribe video and audio
- extraction-spec.md

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 16 edges
2. `What You Must Do When Invoked` - 12 edges
3. `Netchi Sentinel — FTI FEST 2026` - 11 edges
4. `/graphify` - 10 edges
5. `PRD: Netchi Sentinel — FTI FEST 2026` - 10 edges
6. `Architecture — Netchi Sentinel` - 9 edges
7. `Agent Rules` - 9 edges
8. `graphify reference: extra exports and benchmark` - 8 edges
9. `Progress Hero Section` - 8 edges
10. `include` - 7 edges

## Surprising Connections (you probably didn't know these)
- `LenisProvider()` --references--> `lenis`  [EXTRACTED]
  src/components/providers/LenisProvider.tsx → package.json

## Import Cycles
- None detected.

## Communities (32 total, 8 thin omitted)

### Community 0 - "dependencies"
Cohesion: 0.11
Nodes (19): clsx, framer-motion, gsap, @modelcontextprotocol/server-github, next, dependencies, clsx, framer-motion (+11 more)

### Community 1 - "devDependencies"
Cohesion: 0.11
Nodes (19): eslint, eslint-config-next, devDependencies, eslint, eslint-config-next, tailwindcss, @tailwindcss/postcss, @types/node (+11 more)

### Community 2 - "compilerOptions"
Cohesion: 0.11
Nodes (19): dom, dom.iterable, esnext, compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules (+11 more)

### Community 3 - "page.tsx"
Cohesion: 0.12
Nodes (10): Footer(), navLinks, Hero(), Section2(), ROW, Section3(), Section4(), FAQS (+2 more)

### Community 4 - "layout.tsx"
Cohesion: 0.20
Nodes (8): lenis, lenis, inter, jetbrainsMono, metadata, pressStart2P, spaceGrotesk, LenisProvider()

### Community 5 - "include"
Cohesion: 0.20
Nodes (9): **/*.mts, .next/dev/types/**/*.ts, next-env.d.ts, .next/types/**/*.ts, node_modules, **/*.ts, **/*.tsx, exclude (+1 more)

### Community 6 - "package.json"
Cohesion: 0.22
Nodes (8): name, private, scripts, build, dev, lint, start, version

### Community 8 - "index.ts"
Cohesion: 0.40
Nodes (4): Breach, PrivacyAnswer, PrivacyQuestion, UuPdpArticle

### Community 13 - "Netchi Sentinel — FTI FEST 2026"
Cohesion: 0.08
Nodes (25): 1. Breach Checker — `1://SCAN`, 2. Privacy Score — `2://SCORE`, 3. Password Generator — `3://CRACK`, 4. UU PDP Hub — `4://LEARN`, 5. Dummy Data Generator — `5://MASK`, Arsitektur, Auth Decision, Design System (+17 more)

### Community 14 - "Architecture — Netchi Sentinel"
Cohesion: 0.11
Nodes (18): ADR-001: No Authentication, ADR-002: No Database, ADR-003: Monolith App Router, Architecture — Netchi Sentinel, Arsitektur Folder, Breach Checker Flow, Component Architecture, Data Flow (+10 more)

### Community 15 - "PRD: Netchi Sentinel — FTI FEST 2026"
Cohesion: 0.12
Nodes (15): 1. Ringkasan, 2. Tujuan, 3. Target Audience, 4. User Stories, 5.1 Breach Checker (`/breach-checker`), 5.2 Privacy Score (`/privacy-score`), 5.3 Password Generator (`/password`), 5.4 UU PDP Hub (`/uu-pdp`) (+7 more)

### Community 16 - "Agent Rules"
Cohesion: 0.12
Nodes (15): Agent Rules, Bahasa, Code Style, Component Patterns, Design Tokens (from globals.css), Domain Docs, Issue Tracker, MCP Servers Available (+7 more)

### Community 17 - "What You Must Do When Invoked"
Cohesion: 0.13
Nodes (15): Part A - Structural extraction for code files, Part B - Semantic extraction (parallel subagents), Part C - Merge AST + semantic into final extraction, Step 0 - GitHub repos and multi-path merge (only if a URL or several paths), Step 1 - Ensure graphify is installed, Step 2.5 - Video and audio (only if video files detected), Step 2 - Detect files, Step 3 - Extract entities and relationships (+7 more)

### Community 18 - "/graphify"
Cohesion: 0.20
Nodes (9): For /graphify add and --watch, For /graphify query, For the commit hook and native CLAUDE.md integration, For --update and --cluster-only, /graphify, Honesty Rules, Interpreter guard for subcommands, Usage (+1 more)

### Community 19 - "graphify reference: extra exports and benchmark"
Cohesion: 0.22
Nodes (8): graphify reference: extra exports and benchmark, Step 6b - Wiki (only if --wiki flag), Step 7 - Neo4j export (only if --neo4j or --neo4j-push flag), Step 7a - FalkorDB export (only if --falkordb or --falkordb-push flag), Step 7b - SVG export (only if --svg flag), Step 7c - GraphML export (only if --graphml flag), Step 7d - MCP server (only if --mcp flag), Step 8 - Token reduction benchmark (only if total_words > 5000)

### Community 20 - "graphify reference: query, path, explain"
Cohesion: 0.33
Nodes (5): For /graphify explain, For /graphify path, graphify reference: query, path, explain, Step 0 — Constrained query expansion (REQUIRED before traversal), Step 1 — Traversal

### Community 21 - "User Flow — Netchi Sentinel"
Cohesion: 0.50
Nodes (3): Alur Lengkap User, Catatan, User Flow — Netchi Sentinel

### Community 22 - "graphify reference: add a URL and watch a folder"
Cohesion: 0.50
Nodes (3): For /graphify add, For --watch, graphify reference: add a URL and watch a folder

### Community 23 - "graphify reference: commit hook and native CLAUDE.md integration"
Cohesion: 0.50
Nodes (3): For git commit hook, For native CLAUDE.md integration, graphify reference: commit hook and native CLAUDE.md integration

### Community 24 - "graphify reference: incremental update and cluster-only"
Cohesion: 0.50
Nodes (3): For --cluster-only, For --update (incremental re-extraction), graphify reference: incremental update and cluster-only

### Community 25 - "README.md"
Cohesion: 0.50
Nodes (3): Deploy on Vercel, Getting Started, Learn More

## Knowledge Gaps
- **173 isolated node(s):** `eslintConfig`, `nextConfig`, `name`, `version`, `private` (+168 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **8 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `dependencies` connect `dependencies` to `layout.tsx`, `package.json`?**
  _High betweenness centrality (0.030) - this node is a cross-community bridge._
- **Why does `devDependencies` connect `devDependencies` to `package.json`?**
  _High betweenness centrality (0.022) - this node is a cross-community bridge._
- **Why does `lenis` connect `layout.tsx` to `dependencies`?**
  _High betweenness centrality (0.012) - this node is a cross-community bridge._
- **What connects `eslintConfig`, `nextConfig`, `name` to the rest of the system?**
  _173 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.10526315789473684 - nodes in this community are weakly interconnected._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.10526315789473684 - nodes in this community are weakly interconnected._
- **Should `compilerOptions` be split into smaller, more focused modules?**
  _Cohesion score 0.10526315789473684 - nodes in this community are weakly interconnected._