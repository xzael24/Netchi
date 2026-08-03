const FIRST = ["Andi", "Budi", "Sari", "Dewi", "Rina", "Agus", "Rizky", "Putri", "Bayu", "Intan", "Fajar", "Mega", "Hendra", "Lestari", "Yoga", "Nadia"];
const LASTNAME = ["Santoso", "Wijaya", "Kusuma", "Pratama", "Ramadhan", "Saputra", "Hidayat", "Anggraini", "Nugroho", "Maharani", "Permata", "Hartono"];
const STREETS = ["Jl. Merdeka", "Jl. Sudirman", "Jl. Gatot Subroto", "Jl. Diponegoro", "Jl. Ahmad Yani", "Jl. Pemuda", "Jl. Gajah Mada", "Jl. Veteran"];
const CITIES = ["Jakarta", "Bandung", "Surabaya", "Yogyakarta", "Medan", "Semarang", "Makassar", "Denpasar"];
const OCCUPATIONS = ["Software Engineer", "Guru", "Dokter", "Wiraswasta", "Desainer", "Akuntan", "Content Creator", "Analis Data"];
const COMPANIES = ["PT Maju Bersama", "PT Sinergi Digital", "CV Karya Utama", "PT Teknologi Nusantara", "PT Cahaya Abadi", "Firma Kreatif 99"];

export type DummyField = "nama" | "email" | "phone" | "alamat" | "ttl" | "pekerjaan" | "perusahaan";

export const FIELD_LABELS: Record<DummyField, string> = {
  nama: "Nama",
  email: "Email",
  phone: "No. HP",
  alamat: "Alamat",
  ttl: "Tanggal Lahir",
  pekerjaan: "Pekerjaan",
  perusahaan: "Perusahaan",
};

export type DummyPerson = Record<DummyField, string>;

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomDigits(len: number): string {
  let s = "";
  for (let i = 0; i < len; i++) s += Math.floor(Math.random() * 10);
  return s;
}

function generatePerson(): DummyPerson {
  const nama = `${pick(FIRST)} ${pick(LASTNAME)}`;
  return {
    nama,
    email: `${nama.toLowerCase().replace(/[^a-z]/g, "")}.${randomDigits(3)}@mail.com`,
    phone: `08${randomDigits(3)}${randomDigits(4)}${randomDigits(2)}`,
    ttl: `${String(1 + Math.floor(Math.random() * 28)).padStart(2, "0")}-${String(1 + Math.floor(Math.random() * 12)).padStart(2, "0")}-${1975 + Math.floor(Math.random() * 25)}`,
    alamat: `${pick(STREETS)} No. ${randomDigits(3)}, ${pick(CITIES)}, Indonesia`,
    pekerjaan: pick(OCCUPATIONS),
    perusahaan: pick(COMPANIES),
  };
}

export function generatePeople(fields: DummyField[], count: number): Partial<DummyPerson>[] {
  const selected = fields.length ? fields : (Object.keys(FIELD_LABELS) as DummyField[]);
  return Array.from({ length: count }, () => {
    const p = generatePerson();
    const row: Partial<DummyPerson> = {};
    selected.forEach((f) => {
      row[f] = p[f];
    });
    return row;
  });
}

export function toCSV(rows: Partial<DummyPerson>[]): string {
  const head = Object.keys(rows[0] ?? { nama: "" }) as DummyField[];
  const esc = (v: string) => (v.includes(",") || v.includes('"') ? `"${v.replace(/"/g, '""')}"` : v);
  const lines = [head.map((h) => FIELD_LABELS[h]).join(",")];
  rows.forEach((r) => lines.push(head.map((h) => esc(r[h] ?? "")).join(",")));
  return lines.join("\n");
}