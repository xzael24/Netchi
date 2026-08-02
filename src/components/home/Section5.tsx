"use client";

import { useState } from "react";

const LINE = "border-[#1A3CDB]/25";

const FAQS = [
  {
    question: "Apakah cek kebocoran data gratis dan aman?",
    answer:
      "Ya, cek kebocoran data di Netchi gratis dan aman. Data yang kamu masukkan diproses langsung di perangkatmu (client-side) dan tidak pernah dikirim atau disimpan di server kami. Netchi juga open source, jadi siapa pun bisa memeriksa bagaimana data ditangani.",
  },
  {
    question: "Apakah password yang saya generate tersimpan di server?",
    answer:
      "Tidak. Password yang dihasilkan generator Netchi dibuat langsung di browser kamu dan tidak pernah dikirim atau disimpan di server kami. Semua proses berjalan di perangkatmu secara lokal, sehingga tidak ada satu pun password yang meninggalkan perangkatmu.",
  },
  {
    question: "Bagaimana Netchi mematuhi UU PDP?",
    answer:
      "Netchi menerapkan prinsip privacy by design: minimasi data (kami tidak mengumpulkan data pribadi), pemrosesan lokal di perangkat, dan seluruh kode bersifat open source agar bisa diaudit. Dengan begitu, kami tidak menyimpan data yang seharusnya tidak kami butuhkan — sesuai semangat UU PDP.",
  },
  {
    question: "Apa itu privacy score dan bagaimana cara meningkatkannya?",
    answer:
      "Privacy score adalah skor yang mengukur seberapa aman kebiasaan digitalmu, dihitung dari hasil cek kebocoran, kekuatan password, dan praktik keamanan lainnya. Skor naik saat kamu memakai password unik, mengaktifkan 2FA, dan mengganti password akun yang pernah bocor.",
  },
];

function AccordionItem({
  qa,
  open,
  onToggle,
}: {
  qa: { question: string; answer: string };
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div className={`border-b-2 ${LINE}`}>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-6 py-5 text-left"
      >
        <span className="font-display font-bold text-[#1A3CDB] leading-tight tracking-[-0.02em] text-[clamp(0.9rem,1.6cqw,1.35rem)]">
          {qa.question}
        </span>
        <span className={`shrink-0 font-mono text-[#1A3CDB] text-[clamp(1rem,2cqw,1.5rem)] transition-transform duration-300 ${open ? "rotate-45" : ""}`}>
          +
        </span>
      </button>
      <div
        className={`grid transition-all duration-300 ease-in-out ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
      >
        <div className="overflow-hidden">
          <p className="pb-5 font-display text-[#1A3CDB]/70 leading-relaxed text-[clamp(0.8rem,1.4cqw,1rem)]">
            {qa.answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export function Section5() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="relative z-10 bg-[#f5f0d5] text-[#1A3CDB] w-screen min-w-full -mt-[15vh]">
      {/* Mobile: flex-col */}
      <div className="lg:hidden flex flex-col px-5 pt-20 pb-8">
        <div className="flex items-end justify-between mb-6">
          <h2 className="font-display font-bold leading-[1] tracking-[-0.03em] text-5xl">FAQ</h2>
          <span
            className="font-mono font-extrabold uppercase tracking-widest text-[#1A3CDB]/60 whitespace-nowrap"
            style={{ writingMode: "vertical-rl", fontSize: "0.55rem" }}
          >
            5://FAQ
          </span>
        </div>
        {FAQS.map((qa, i) => (
          <AccordionItem key={i} qa={qa} open={openIndex === i} onToggle={() => setOpenIndex(openIndex === i ? null : i)} />
        ))}
      </div>

      {/* Desktop: lg editorial grid */}
      <div className="hidden lg:grid w-full min-w-full">
        <div className={`grid grid-cols-[2.6%_94.05%_3.35%] grid-rows-[22vh] border-b-2 ${LINE}`}>
          <div className={`border-r-2 ${LINE} flex items-start justify-start p-1 text-[8px] text-[#1A3CDB]/40 font-mono`}>R1C1</div>
          <div className={`border-r-2 ${LINE} flex flex-col items-start justify-end pl-2 md:pl-4 pb-2 relative container-cell`}>
            <span className="absolute top-0 left-0 p-1 text-[8px] text-[#1A3CDB]/40 font-mono">R1C2</span>
            <span className="font-mono font-extrabold uppercase tracking-widest text-[#1A3CDB]/60 text-[clamp(0.4rem,2cqw,0.7rem)]">(5)//FAQ</span>
            <h2 className="font-display font-bold text-[#1A3CDB] leading-[0.9] tracking-[-0.03em] text-[clamp(2.5rem,10cqw,5.5rem)]">
              FAQ
            </h2>
          </div>
          <div className="flex items-end justify-start p-1 pb-2 relative">
            <span className="absolute top-0 left-0 p-1 text-[8px] text-[#1A3CDB]/40 font-mono">R1C3</span>
            <span
              className="font-mono font-extrabold uppercase tracking-widest text-[#1A3CDB] whitespace-nowrap"
              style={{ writingMode: "vertical-rl", fontSize: "clamp(0.3rem, 14cqw, 0.5rem)" }}
            >
              5://FAQ
            </span>
          </div>
        </div>

        <div className={`grid grid-cols-[2.6%_94.05%_3.35%] ${LINE}`}>
          <div className={`border-r-2 ${LINE} flex items-start justify-start p-1 text-[8px] text-[#1A3CDB]/40 font-mono`}>R2C1</div>
          <div className={`border-r-2 ${LINE} container-cell px-6 md:px-8 py-2`}>
            <div className="grid grid-cols-2 gap-x-10">
              {FAQS.map((qa, i) => (
                <AccordionItem key={i} qa={qa} open={openIndex === i} onToggle={() => setOpenIndex(openIndex === i ? null : i)} />
              ))}
            </div>
          </div>
          <div className="flex items-start justify-start p-1 text-[8px] text-[#1A3CDB]/40 font-mono">R2C3</div>
        </div>
      </div>
    </section>
  );
}
