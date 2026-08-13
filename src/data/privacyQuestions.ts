import type { PrivacyQuestion } from "@/types";

export const PRIVACY_QUESTIONS: PrivacyQuestion[] = [
  { id: "q1", question: "Saya memakai password berbeda untuk setiap akun penting.", category: "password", weight: 2 },
  { id: "q2", question: "Saya mengaktifkan 2FA di semua layanan yang mendukung.", category: "account", weight: 2 },
  { id: "q3", question: "Saya rutin mengganti password akun yang pernah bocor.", category: "password", weight: 1 },
  { id: "q4", question: "Saya berhati-hati sebelum mengklik link dari email atau chat yang tidak dikenal.", category: "browsing", weight: 2 },
  { id: "q5", question: "Saya memakai password manager atau generator untuk akun.", category: "password", weight: 2 },
  { id: "q6", question: "Saya memeriksa https / keaslian situs sebelum memasukkan data.", category: "browsing", weight: 1 },
  { id: "q7", question: "Saya tidak membagikan data pribadi sensitif di media sosial.", category: "social", weight: 2 },
  { id: "q8", question: "Saya memperbarui software dan sistem operasi secara rutin.", category: "account", weight: 1 },
  { id: "q9", question: "Saya menghindari transaksi sensitif saat memakai Wi-Fi publik.", category: "browsing", weight: 2 },
  { id: "q10", question: "Saya mengecek izin aplikasi sebelum menginstalnya.", category: "account", weight: 1 },
  { id: "q11", question: "Saya menghindari kuis atau tautan yang menanyakan data pribadi.", category: "social", weight: 1 },
  { id: "q12", question: "Saya tahu hak saya atas data pribadi (UU PDP).", category: "social", weight: 1 },
];

export type Answer = "never" | "sometimes" | "always";

export const ANSWER_SCORE: Record<Answer, number> = {
  always: 1,
  sometimes: 0.5,
  never: 0,
};

export function calculateScore(answers: Record<string, Answer>): number {
  const answered = PRIVACY_QUESTIONS.filter((q) => answers[q.id] !== undefined);
  if (answered.length === 0) return 0;
  const totalWeight = answered.reduce((sum, q) => sum + q.weight, 0);
  const weighted = answered.reduce(
    (sum, q) => sum + ANSWER_SCORE[answers[q.id]] * q.weight,
    0
  );
  return Math.round((weighted / totalWeight) * 100);
}

export function scoreCategory(score: number): {
  label: string;
  emoji: string;
  color: string;
  advice: string;
} {
  if (score <= 40)
    return {
      label: "Rendah",
      emoji: "📉",
      color: "text-[#ff6b6b]",
      advice: "Kebiasaan digitalmu masih berisiko. Mulai dari password unik, aktifkan 2FA, dan waspadai link mencurigakan.",
    };
  if (score <= 70)
    return {
      label: "Sedang",
      emoji: "📊",
      color: "text-[#ffd166]",
      advice: "Lumayan, tapi masih bisa ditingkatkan. Lengkapi 2FA dan rutin cek kebocoran password.",
    };
  return {
    label: "Tinggi",
    emoji: "📈",
    color: "text-[#4cd99b]",
    advice: "Kebiasaanmu sudah bagus! Pertahankan dan bagikan edukasi ini ke orang sekitar.",
  };
}