---
name: magnetic-hover
description: "Use when the user wants a magnetic hover / bouncy springy cursor-follow effect on buttons, nav links, or menu items — elements that subtly pull toward or push away from the cursor. Covers the reusable React + framer-motion Magnetic component, its props (strength, pull), spring physics tuning for the 'kenyal' feel, and how to keep separator borders static. This pattern is the one used on the Netchi footer nav links."
---

# Magnetic Hover (springy cursor-follow)

Reusable React pattern: an element nudges toward/away from the cursor on hover, springing back when the mouse leaves. Uses `framer-motion` (`useMotionValue` + `useSpring`) — no extra dependencies beyond what Next.js/React projects commonly have.

## When to use
- Big nav links / menu rows (the classic awwwards footer effect).
- Buttons & CTAs that should feel tactile and responsive.
- Any element where you want a "kenyal" (bouncy) spring instead of a static hover state.

## The component

`src/components/layout/Magnetic.tsx`:

```tsx
"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function Magnetic({
  children,
  strength = 0.3,
  pull = 1,
}: {
  children: React.ReactNode;
  strength?: number;
  pull?: 1 | -1;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15 });
  const sy = useSpring(y, { stiffness: 200, damping: 15 });

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength * pull);
    y.set((e.clientY - (r.top + r.height / 2)) * strength * pull);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      style={{ x: sx, y: sy }}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      className="block"
    >
      {children}
    </motion.div>
  );
}
```

## Props

| Prop | Default | Effect |
|------|---------|--------|
| `strength` | `0.3` | Seberapa jauh elemen bergeser. Kecilin (0.1-0.15) buat halus, gedein buat dramatis. |
| `pull` | `1` | Arah: `1` = narik ke arah cursor, `-1` = dorong menjauh (geser searah panah/default). |

## Usage

```tsx
import { Magnetic } from "@/components/layout/Magnetic";

// Narik ke arah cursor (button/CTA biasa)
<Magnetic strength={0.25}>
  <button>MULAI SEKARANG</button>
</Magnetic>

// Dorong menjauh (link besar di kiri row, biar ngegeser ke kanan pas hover huruf)
<Magnetic strength={0.15} pull={-1}>
  <Link href="/beranda">Beranda</Link>
</Magnetic>
```

## Menjaga garis separator tetap statis

Kalau elemen yang di-magnetic punya border/garis pemisah (misal `border-b-2` di nav row), **jangan taruh border di dalam Magnetic** — dia bakal ikut ketarik. Taruh border di wrapper luar:

```tsx
<nav>
  {links.map((link) => (
    <div key={link.label} className="border-b-2 border-cream/25">
      <Magnetic strength={0.15} pull={-1}>
        <Link href={link.href} className="group flex items-center justify-between px-6 py-2">
          <span>{link.label}</span>
          <span>→</span>
        </Link>
      </Magnetic>
    </div>
  ))}
</nav>
```

## Ngatur rasa "kenyal"

Rasa kenyal datang dari `useSpring` di `stiffness` + `damping`:

| Rasa | stiffness | damping |
|------|-----------|---------|
| Lembut/lambat | 100–150 | 20–25 |
| **Kenyal & responsif (default)** | **200** | **15** |
| Kencang/snappy | 400+ | 10–12 |

Semakin kecil `damping` → makin "mantul" sebelum balik. Kalau `stiffness` kecil + `damping` gede → hampir gak kelihatan bergerak.

## Catatan
- Wajib `"use client"` (pakai hooks).
- `framer-motion` harus terpasang (`npm i framer-motion`).
- `useSpring` di sini memberi efek kenyal; kalau mau zero-lag (kotak tooltip yang musti nempel persis cursor), pakai `useMotionValue` langsung tanpa spring.
- Untuk full-width row, `className="block"` di wrapper biar lebarnya tetap penuh.
