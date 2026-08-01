"use client";

import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const LINE = "border-cream/25";

export function Section4() {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".s4-card");
      cards.forEach((card) => {
        gsap.fromTo(card,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      const cta = document.querySelector(".s4-cta");
      if (cta) {
        gsap.fromTo(cta,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: 0.3,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cta,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, ref.current);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="bg-[#1A3CDB] text-cream relative z-60 min-h-screen w-full flex flex-col items-center justify-center px-4 md:px-8 lg:px-16 py-20">
      <div className="w-full max-w-7xl">
        <div className="mb-16 text-center">
          <span className="font-mono text-cream/40 text-xs tracking-widest uppercase">3://SOLUSI</span>
          <h2 className="font-display font-bold text-cream leading-[1] tracking-[-0.03em] text-[clamp(2rem,5cqw,4rem)] mt-4">
            Netchi Lindungi Identitas Digitalmu
          </h2>
          <p className="font-body text-cream/60 text-[clamp(1rem,2cqw,1.25rem)] mt-6 max-w-2xl mx-0">
            3 artikel di atas buktiin: kebocoran data itu nyata, masif, dan mahal.
            Netchi hadirin 3 tool utama biar kamu nggak jadi korban selanjutnya.
          </p>
        </div>

        <div className="hidden lg:grid grid-cols-3 gap-6 mb-16">
          <article className="s4-card group relative bg-white/5 border border-cream/10 rounded-2xl p-6 md:p-8 transition-all duration-300 hover:border-cream/30 hover:bg-white/10">
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-cream/40 text-xs">2://CHECK</span>
              <div className="w-px h-6 bg-cream/20" />
              <span className="font-mono text-cream/30 text-xs">Breach Monitor</span>
            </div>
            <h3 className="font-display font-bold text-cream text-[clamp(1.25rem,2.5cqw,1.75rem)] mb-3">
              Cek Kebocoran Data
            </h3>
            <p className="font-body text-cream/60 text-[clamp(0.875rem,1.5cqw,1rem)] leading-relaxed mb-6">
              Masukin email atau nomor HP, cek instan apakah data kamu bocor di 16 miliar+ record
              dari 30+ database malware infostealer. Real-time, gratis, tanpa simpan query.
            </p>
            <a href="/breach" className="font-mono text-cream text-sm tracking-wider uppercase flex items-center gap-2 group-hover:gap-3 transition-gap">
              Mulai Cek →
            </a>
          </article>

          <article className="s4-card group relative bg-white/5 border border-cream/10 rounded-2xl p-6 md:p-8 transition-all duration-300 hover:border-cream/30 hover:bg-white/10">
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-cream/40 text-xs">3://CRACK</span>
              <div className="w-px h-6 bg-cream/20" />
              <span className="font-mono text-cream/30 text-xs">Password Vault</span>
            </div>
            <h3 className="font-display font-bold text-cream text-[clamp(1.25rem,2.5cqw,1.75rem)] mb-3">
              Password Generator & Strength
            </h3>
            <p className="font-body text-cream/60 text-[clamp(0.875rem,1.5cqw,1rem)] leading-relaxed mb-6">
              Generate password unik per akun (entropi tinggi, anti-dictionary). Test kekuatan
              password lama — liat estimasi waktu crack dari brute-force sampai nation-state.
            </p>
            <a href="/password" className="font-mono text-cream text-sm tracking-wider uppercase flex items-center gap-2 group-hover:gap-3 transition-gap">
              Generate Sekarang →
            </a>
          </article>

          <article className="s4-card group relative bg-white/5 border border-cream/10 rounded-2xl p-6 md:p-8 transition-all duration-300 hover:border-cream/30 hover:bg-white/10">
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-cream/40 text-xs">1://SCAN</span>
              <div className="w-px h-6 bg-cream/20" />
              <span className="font-mono text-cream/30 text-xs">Privacy Score</span>
            </div>
            <h3 className="font-display font-bold text-cream text-[clamp(1.25rem,2.5cqw,1.75rem)] mb-3">
              Skor Privasi Digital
            </h3>
            <p className="font-body text-cream/60 text-[clamp(0.875rem,1.5cqw,1rem)] leading-relaxed mb-6">
              Audit komprehensif: breach history, password reuse, 2FA status, data broker exposure,
              app permissions. Dapat skor 0-100 + roadmap perbaikan prioritas tinggi → rendah.
            </p>
            <a href="/privacy-score" className="font-mono text-cream text-sm tracking-wider uppercase flex items-center gap-2 group-hover:gap-3 transition-gap">
              Hitung Skor →
            </a>
          </article>
        </div>

        <div className="lg:hidden space-y-4 mb-16">
          <article className="s4-card group relative bg-white/5 border border-cream/10 rounded-2xl p-6 transition-all duration-300 hover:border-cream/30 hover:bg-white/10">
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-cream/40 text-xs">2://CHECK</span>
              <div className="w-px h-6 bg-cream/20" />
              <span className="font-mono text-cream/30 text-xs">Breach Monitor</span>
            </div>
            <h3 className="font-display font-bold text-cream text-lg mb-3">Cek Kebocoran Data</h3>
            <p className="font-body text-cream/60 text-base leading-relaxed mb-4">
              Masukin email atau nomor HP, cek instan apakah data kamu bocor di 16 miliar+ record.
            </p>
            <a href="/breach" className="font-mono text-cream text-sm tracking-wider uppercase flex items-center gap-2 group-hover:gap-3 transition-gap">
              Mulai Cek →
            </a>
          </article>
          <article className="s4-card group relative bg-white/5 border border-cream/10 rounded-2xl p-6 transition-all duration-300 hover:border-cream/30 hover:bg-white/10">
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-cream/40 text-xs">3://CRACK</span>
              <div className="w-px h-6 bg-cream/20" />
              <span className="font-mono text-cream/30 text-xs">Password Vault</span>
            </div>
            <h3 className="font-display font-bold text-cream text-lg mb-3">Password Generator & Strength</h3>
            <p className="font-body text-cream/60 text-base leading-relaxed mb-4">
              Generate password unik per akun. Test kekuatan password lama — estimasi waktu crack.
            </p>
            <a href="/password" className="font-mono text-cream text-sm tracking-wider uppercase flex items-center gap-2 group-hover:gap-3 transition-gap">
              Generate Sekarang →
            </a>
          </article>
          <article className="s4-card group relative bg-white/5 border border-cream/10 rounded-2xl p-6 transition-all duration-300 hover:border-cream/30 hover:bg-white/10">
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-cream/40 text-xs">1://SCAN</span>
              <div className="w-px h-6 bg-cream/20" />
              <span className="font-mono text-cream/30 text-xs">Privacy Score</span>
            </div>
            <h3 className="font-display font-bold text-cream text-lg mb-3">Skor Privasi Digital</h3>
            <p className="font-body text-cream/60 text-base leading-relaxed mb-4">
              Audit komprehensif: breach history, password reuse, 2FA, data broker, app permissions.
            </p>
            <a href="/privacy-score" className="font-mono text-cream text-sm tracking-wider uppercase flex items-center gap-2 group-hover:gap-3 transition-gap">
              Hitung Skor →
            </a>
          </article>
        </div>

        <div className="s4-cta text-center pt-8 border-t border-cream/10">
          <p className="font-body text-cream/40 text-[clamp(0.875rem,1.5cqw,1rem)] mb-4">
            Semua tool gratis, tidak menyimpan data input, open-source logic.
          </p>
          <a
            href="/breach"
            className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-cream text-[#1A3CDB] font-display font-bold text-[clamp(1rem,2cqw,1.25rem)] rounded-full hover:bg-cream/90 transition-colors"
          >
            MULAI SEKARANG
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>

        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {[
            { label: "0 Data Disimpan", desc: "Input tidak pernah ke server" },
            { label: "Open Source Logic", desc: "Transparansi penuh" },
            { label: "Real-time Check", desc: "Database terupdate harian" },
            { label: "UU PDP Compliant", desc: "Sesuai regulasi Indonesia" },
          ].map((item, i) => (
            <div key={i} className="border-r border-cream/10 last:border-0 p-4">
              <div className="font-display font-bold text-cream text-[clamp(0.875rem,1.5cqw,1rem)]">
                {item.label}
              </div>
              <div className="font-mono text-cream/40 text-[clamp(0.625rem,1cqw,0.75rem)] mt-1">
                {item.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}