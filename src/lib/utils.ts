import { type ClassValue, clsx } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat("id-ID").format(num);
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

export function getTimeToCrack(entropy: number): string {
  if (entropy < 30) return "Instan";
  if (entropy < 40) return "Detik";
  if (entropy < 50) return "Menit";
  if (entropy < 60) return "Jam";
  if (entropy < 70) return "Hari";
  if (entropy < 80) return "Tahun";
  if (entropy < 100) return "Abur";
  return "Tidak terpecahkan";
}

export function calculatePasswordEntropy(password: string): number {
  const poolSize = getPoolSize(password);
  return Math.log2(Math.pow(poolSize, password.length));
}

function getPoolSize(password: string): number {
  let pool = 0;
  if (/[a-z]/.test(password)) pool += 26;
  if (/[A-Z]/.test(password)) pool += 26;
  if (/[0-9]/.test(password)) pool += 10;
  if (/[^a-zA-Z0-9]/.test(password)) pool += 32;
  return pool;
}

export function getStrengthColor(entropy: number): string {
  if (entropy < 30) return "text-danger";
  if (entropy < 50) return "text-warning";
  if (entropy < 70) return "text-accent";
  return "text-success";
}

export function getStrengthLabel(entropy: number): string {
  if (entropy < 30) return "Sangat Lemah";
  if (entropy < 50) return "Lemah";
  if (entropy < 70) return "Sedang";
  if (entropy < 90) return "Kuat";
  return "Sangat Kuat";
}