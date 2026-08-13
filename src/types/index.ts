export type PrivacyQuestion = {
  id: string;
  question: string;
  category: "password" | "account" | "browsing" | "social";
  weight: number;
};

export type UuPdpArticle = {
  id: string;
  chapter: string;
  title: string;
  summary: string;
  points: string[];
};