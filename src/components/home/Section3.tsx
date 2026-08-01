"use client";

const LINE = "border-cream/25";

const ROW: Record<string, { top: string; height: string }> = {
  r1: { top: "0vh", height: "4vh" },
  r2: { top: "4vh", height: "25vh" },
  r3: { top: "29vh", height: "15vh" },
  r4: { top: "44vh", height: "20vh" },
  r6: { top: "44vh", height: "15vh" },
  r7: { top: "59vh", height: "20vh" },
  r9: { top: "59vh", height: "15vh" },
  r10: { top: "74vh", height: "20vh" },
};

export function Section3() {
  return (
    <section className="bg-white w-screen min-w-full">
      <div className="relative h-screen w-screen overflow-hidden bg-[#1A3CDB]">

        <div data-row="r1" style={{ top: ROW.r1.top, height: ROW.r1.height }}
          className={`hidden lg:grid absolute w-full grid-cols-[2.6%_18.81%_75.24%_1fr] grid-rows-[0.5fr] bg-[#1A3CDB] text-cream border-b-2 ${LINE}`}>
          {[
            { id: "R1C1" },
            { id: "R1C2" },
            { id: "R1C3" },
            { id: "R1C4" },
          ].map((cell, i) => (
            <div key={`r1-${i}`} className={`${i < 2 ? `border-r-2 ${LINE}` : i === 2 ? "border-r-2 border-r-[#1A3CDB]" : ""} ${i >= 2 ? "bg-white text-[#1A3CDB]/40" : "text-cream/30"} flex items-start justify-start p-1 text-[8px] font-mono`}>
              {cell.id}
            </div>
          ))}
        </div>

        <div data-row="r2" style={{ top: ROW.r2.top, height: ROW.r2.height }}
          className={`hidden lg:grid absolute w-full grid-cols-[2.6%_18.81%_75.24%_1fr] grid-rows-[4fr] bg-[#1A3CDB] text-cream border-b-2 ${LINE}`}>
          <div className={`border-r-2 ${LINE} flex items-start justify-start p-1 text-[8px] text-cream/30 font-mono`}>R2C1</div>
          <div className="col-span-2 border-r-2 border-cream/25 flex flex-col items-start justify-end pl-1 md:pl-2 relative">
            <span className="absolute top-0 left-0 p-1 text-[8px] text-cream/30 font-mono">R2C2</span>
            <h2 className="font-display font-bold text-cream leading-[1] tracking-[-0.03em] text-[clamp(2rem,5cqw,4rem)]">
              Artikel Kami
            </h2>
          </div>
          <div className="flex items-end justify-start p-1 relative">
            <span className="absolute top-0 left-0 p-1 text-[8px] text-cream/30 font-mono">R2C3</span>
            <span
              className="font-mono font-extrabold uppercase tracking-widest text-cream whitespace-nowrap"
              style={{ writingMode: "vertical-rl", fontSize: "clamp(0.3rem, 14cqw, 0.5rem)" }}
            >
              2://EDU
            </span>
          </div>
        </div>

        <div data-row="r3" style={{ top: ROW.r3.top, height: ROW.r3.height }}
          className={`hidden lg:grid absolute w-full grid-cols-[2.6%_94.05%_3.35%] grid-rows-[15vh] bg-[#1A3CDB] text-cream border-b-2 ${LINE}`}>
          <div className={`border-r-2 ${LINE} flex items-start justify-start p-1 text-[8px] text-cream/30 font-mono`}>R3C1</div>
          <div className={`border-r-2 ${LINE} flex items-end justify-start pl-1 pb-2 relative`}>
            <span className="absolute top-0 left-0 p-1 text-[8px] text-cream/30 font-mono">R3C2</span>
            <h2 className="font-display font-bold text-cream leading-[1] tracking-[-0.03em] text-[clamp(1rem,2.5cqw,2rem)]">
              1. 16 Miliar Password Bocor — 30 Database Jadi Target Malware
            </h2>
          </div>
          <div className="flex items-start justify-start p-1 text-[8px] text-cream/30 font-mono">R3C3</div>
        </div>

        <div data-row="r4" style={{ top: ROW.r4.top, height: ROW.r4.height }}
          className={`hidden lg:grid absolute w-full grid-cols-[2.6%_31.35%_31.35%_31.35%_3.35%] grid-rows-[20vh] bg-[#1A3CDB] text-cream border-b-2 ${LINE}`}>
          <div className={`border-r-2 ${LINE} flex items-start justify-start p-1 text-[8px] text-cream/30 font-mono`}>R4C1</div>
          <div className={`border-r-2 ${LINE} flex flex-col items-start justify-center p-3 relative container-cell`}>
            <span className="absolute top-0 left-0 p-1 text-[8px] text-cream/30 font-mono">R4C2</span>
            <span className="font-display font-bold text-cream leading-tight uppercase text-[clamp(0.9rem,4cqw,1.4rem)]">Apa Yang Terjadi</span>
            <span className="font-display text-cream/70 leading-snug text-[clamp(0.65rem,3cqw,1rem)] mt-1">16 miliar kredensial login bocor dari 30 database berbeda lewat malware infostealer. Ini kebocoran password terbesar dalam sejarah.</span>
          </div>
          <div className={`border-r-2 ${LINE} flex flex-col items-start justify-center p-3 relative container-cell`}>
            <span className="absolute top-0 left-0 p-1 text-[8px] text-cream/30 font-mono">R4C3</span>
            <span className="font-display font-bold text-cream leading-tight uppercase text-[clamp(0.9rem,4cqw,1.4rem)]">Kenapa Berbahaya</span>
            <span className="font-display text-cream/70 leading-snug text-[clamp(0.65rem,3cqw,1rem)] mt-1">Kombinasi email+password rawan dipakai credential stuffing ke akun lain. 1 password bocor = risiko di semua akunmu.</span>
          </div>
          <div className={`border-r-2 ${LINE} flex flex-col items-start justify-center p-3 relative container-cell`}>
            <span className="absolute top-0 left-0 p-1 text-[8px] text-cream/30 font-mono">R4C4</span>
            <span className="font-display font-bold text-cream leading-tight uppercase text-[clamp(0.9rem,4cqw,1.4rem)]">Yang Harus Dilakukan</span>
            <span className="font-display text-cream/70 leading-snug text-[clamp(0.5rem,1.2cqw,0.75rem)] mt-1">Jangan pakai password sama. Generate password unik tiap akun lewat 3://CRACK. Aktifkan 2FA di semua layanan.</span>
          </div>
          <div className="flex items-start justify-start p-1 text-[8px] text-cream/30 font-mono">R4C5</div>
        </div>

        <div data-row="r6" style={{ top: ROW.r6.top, height: ROW.r6.height }}
          className={`hidden lg:grid absolute w-full z-20 grid-cols-[2.6%_94.05%_3.35%] grid-rows-[15vh] bg-[#1A3CDB] text-cream border-b-2 ${LINE}`}>
          <div className={`border-r-2 ${LINE} flex items-start justify-start p-1 text-[8px] text-cream/30 font-mono`}>R6C1</div>
          <div className={`border-r-2 ${LINE} flex items-end justify-start pl-1 pb-2 relative`}>
            <span className="absolute top-0 left-0 p-1 text-[8px] text-cream/30 font-mono">R6C2</span>
            <h2 className="font-display font-bold text-cream leading-[1] tracking-[-0.03em] text-[clamp(1rem,2.5cqw,2rem)]">
              2. Prabowo Segera Tunjuk 'Wasit' Data Warga RI
            </h2>
          </div>
          <div className="flex items-start justify-start p-1 text-[8px] text-cream/30 font-mono">R6C3</div>
        </div>

        <div data-row="r7" style={{ top: ROW.r7.top, height: ROW.r7.height }}
          className={`hidden lg:grid absolute w-full z-30 grid-cols-[2.6%_31.35%_31.35%_31.35%_3.35%] grid-rows-[20vh] bg-[#1A3CDB] text-cream border-b-2 ${LINE}`}>
          <div className={`border-r-2 ${LINE} flex items-start justify-start p-1 text-[8px] text-cream/30 font-mono`}>R7C1</div>
          <div className={`border-r-2 ${LINE} flex flex-col items-start justify-center p-3 relative container-cell`}>
            <span className="absolute top-0 left-0 p-1 text-[8px] text-cream/30 font-mono">R7C2</span>
            <span className="font-display font-bold text-cream leading-tight uppercase text-[clamp(0.9rem,4cqw,1.4rem)]">Apa Yang Terjadi</span>
            <span className="font-display text-cream/70 leading-snug text-[clamp(0.65rem,3cqw,1rem)] mt-1">Pemerintah merampungkan pembentukan Otoritas PDP via Perpres. Lembaga ini akan bekerja independen di luar Komdigi, lapor langsung ke Presiden.</span>
          </div>
          <div className={`border-r-2 ${LINE} flex flex-col items-start justify-center p-3 relative container-cell`}>
            <span className="absolute top-0 left-0 p-1 text-[8px] text-cream/30 font-mono">R7C3</span>
            <span className="font-display font-bold text-cream leading-tight uppercase text-[clamp(0.9rem,4cqw,1.4rem)]">Kenapa Penting</span>
            <span className="font-display text-cream/70 leading-snug text-[clamp(0.65rem,3cqw,1rem)] mt-1">Otoritas PDP bakal jadi 'wasit' data warga. Berwenang mengawasi, menyelidiki, dan menjatuhkan sanksi atas pelanggaran data pribadi.</span>
          </div>
          <div className={`border-r-2 ${LINE} flex flex-col items-start justify-center p-3 relative container-cell`}>
            <span className="absolute top-0 left-0 p-1 text-[8px] text-cream/30 font-mono">R7C4</span>
            <span className="font-display font-bold text-cream leading-tight uppercase text-[clamp(0.9rem,4cqw,1.4rem)]">Dampaknya</span>
            <span className="font-display text-cream/70 leading-snug text-[clamp(0.65rem,3cqw,1rem)] mt-1">Masyarakat bisa lapor pelanggaran data. Perusahaan wajib patuh atau kena sanksi administratif hingga pidana sesuai UU PDP.</span>
          </div>
          <div className="flex items-start justify-start p-1 text-[8px] text-cream/30 font-mono">R7C5</div>
        </div>

        <div data-row="r9" style={{ top: ROW.r9.top, height: ROW.r9.height }}
          className={`hidden lg:grid absolute w-full z-40 grid-cols-[2.6%_94.05%_3.35%] grid-rows-[15vh] bg-[#1A3CDB] text-cream border-b-2 ${LINE}`}>
          <div className={`border-r-2 ${LINE} flex items-start justify-start p-1 text-[8px] text-cream/30 font-mono`}>R9C1</div>
          <div className={`border-r-2 ${LINE} flex items-end justify-start pl-1 pb-2 relative`}>
            <span className="absolute top-0 left-0 p-1 text-[8px] text-cream/30 font-mono">R9C2</span>
            <h2 className="font-display font-bold text-cream leading-[1] tracking-[-0.03em] text-[clamp(1rem,2.5cqw,2rem)]">
              3. Ecommerce Ini Kena Denda Rp7,38 Triliun
            </h2>
          </div>
          <div className="flex items-start justify-start p-1 text-[8px] text-cream/30 font-mono">R9C3</div>
        </div>

        <div data-row="r10" style={{ top: ROW.r10.top, height: ROW.r10.height }}
          className={`hidden lg:grid absolute w-full z-50 grid-cols-[2.6%_31.35%_31.35%_31.35%_3.35%] grid-rows-[20vh] bg-[#1A3CDB] text-cream border-b-2 ${LINE}`}>
          <div className={`border-r-2 ${LINE} flex items-start justify-start p-1 text-[8px] text-cream/30 font-mono`}>R10C1</div>
          <div className={`border-r-2 ${LINE} flex flex-col items-start justify-center p-3 relative container-cell`}>
            <span className="absolute top-0 left-0 p-1 text-[8px] text-cream/30 font-mono">R10C2</span>
            <span className="font-display font-bold text-cream leading-tight uppercase text-[clamp(0.9rem,4cqw,1.4rem)]">Apa Yang Terjadi</span>
            <span className="font-display text-cream/70 leading-snug text-[clamp(0.65rem,3cqw,1rem)] mt-1">Coupang, ecommerce terbesar Korea Selatan, kena denda Rp7,38 triliun atas kebocoran data 37,6 juta orang — lebih dari 70% populasi negara itu.</span>
          </div>
          <div className={`border-r-2 ${LINE} flex flex-col items-start justify-center p-3 relative container-cell`}>
            <span className="absolute top-0 left-0 p-1 text-[8px] text-cream/30 font-mono">R10C3</span>
            <span className="font-display font-bold text-cream leading-tight uppercase text-[clamp(0.9rem,4cqw,1.4rem)]">Skala Besar</span>
            <span className="font-display text-cream/70 leading-snug text-[clamp(0.65rem,3cqw,1rem)] mt-1">Denda terbesar dalam sejarah kebocoran data global. Mantan developer China masih simpan kunci autentikasi setelah keluar dari perusahaan.</span>
          </div>
          <div className={`border-r-2 ${LINE} flex flex-col items-start justify-center p-3 relative container-cell`}>
            <span className="absolute top-0 left-0 p-1 text-[8px] text-cream/30 font-mono">R10C4</span>
            <span className="font-display font-bold text-cream leading-tight uppercase text-[clamp(0.9rem,4cqw,1.4rem)]">Pelajaran</span>
            <span className="font-display text-cream/70 leading-snug text-[clamp(0.65rem,3cqw,1rem)] mt-1">Keamanan data bukan opsional. Sanksi berat menanti perusahaan lalai. kamu juga wajib aktif lindungi data pribadimu sendiri.</span>
          </div>
          <div className="flex items-start justify-start p-1 text-[8px] text-cream/30 font-mono">R10C5</div>
        </div>

      </div>
    </section>
  );
}
