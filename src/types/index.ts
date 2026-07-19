export type Breach = {
  Name: string;
  Title: string;
  Domain: string;
  BreachDate: string;
  AddedDate: string;
  PwnCount: number;
  Description: string;
  DataClasses: string[];
  IsVerified: boolean;
  IsFabricated: boolean;
  IsSensitive: boolean;
  IsRetired: boolean;
  IsSpamList: boolean;
};

export type PrivacyAnswer = "never" | "sometimes" | "always";

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
