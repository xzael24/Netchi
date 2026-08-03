# Graph Report - .  (2026-07-26)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 124 nodes · 122 edges · 13 communities (8 shown, 5 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `48392ff9`
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

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 16 edges
2. `include` - 7 edges
3. `scripts` - 5 edges
4. `lib` - 4 edges
5. `lenis` - 3 edges
6. `LenisProvider()` - 3 edges
7. `@modelcontextprotocol/server-github` - 2 edges
8. `@playwright/mcp` - 2 edges
9. `clsx` - 2 edges
10. `framer-motion` - 2 edges

## Surprising Connections (you probably didn't know these)
- `LenisProvider()` --references--> `lenis`  [EXTRACTED]
  src/components/providers/LenisProvider.tsx → package.json

## Import Cycles
- None detected.

## Communities (13 total, 5 thin omitted)

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
Cohesion: 0.20
Nodes (5): Hero(), Section2(), Section3(), Section4(), Navbar()

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

## Knowledge Gaps
- **62 isolated node(s):** `eslintConfig`, `nextConfig`, `name`, `version`, `private` (+57 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **5 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `dependencies` connect `dependencies` to `layout.tsx`, `package.json`?**
  _High betweenness centrality (0.154) - this node is a cross-community bridge._
- **Why does `devDependencies` connect `devDependencies` to `package.json`?**
  _High betweenness centrality (0.113) - this node is a cross-community bridge._
- **Why does `lenis` connect `layout.tsx` to `dependencies`?**
  _High betweenness centrality (0.064) - this node is a cross-community bridge._
- **What connects `eslintConfig`, `nextConfig`, `name` to the rest of the system?**
  _62 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.10526315789473684 - nodes in this community are weakly interconnected._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.10526315789473684 - nodes in this community are weakly interconnected._
- **Should `compilerOptions` be split into smaller, more focused modules?**
  _Cohesion score 0.10526315789473684 - nodes in this community are weakly interconnected._