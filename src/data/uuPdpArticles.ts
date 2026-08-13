import type { UuPdpArticle } from "@/types";
import { UU_PDP_ARTICLES_EXTENDED } from "@/data/uPdpArticlesExtended";

// Daftar pasal untuk halaman list — di-derive dari sumber detail (uPdpArticlesExtended)
// supaya tidak ada duplikasi data yang harus dijaga sinkron.
export const UU_PDP_ARTICLES: UuPdpArticle[] = UU_PDP_ARTICLES_EXTENDED.map(
  ({ id, chapter, title, summary }) => ({ id, chapter, title, summary, points: [] })
);

export const UU_CATEGORIES = ["Semua", "Hak Subjek Data", "Kewajiban Pengendali Data", "Sanksi & Denda", "Contoh Kasus"] as const;