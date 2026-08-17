import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono, Press_Start_2P } from "next/font/google";
import "./globals.css";
import { LenisProvider } from "@/components/providers/LenisProvider";
import { MotionProvider } from "@/components/providers/MotionProvider";
import { LocaleProvider } from "@/components/providers/LocaleProvider";
import { CustomCursor } from "@/components/layout/CustomCursor";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

const pressStart2P = Press_Start_2P({
  variable: "--font-press-start",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://netchi.vercel.app"),
  title: "Netchi — Privacy Shield",
  description: "Platform edukasi & perlindungan privasi data digital untuk masyarakat Indonesia.",
  openGraph: {
    title: "Netchi — Privacy Shield",
    description: "Platform edukasi & perlindungan privasi data digital untuk masyarakat Indonesia.",
    url: "https://netchi.vercel.app",
    siteName: "Netchi",
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Netchi — Privacy Shield",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Netchi — Privacy Shield",
    description: "Platform edukasi & perlindungan privasi data digital untuk masyarakat Indonesia.",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} ${pressStart2P.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground w-screen overflow-x-hidden">
        <LocaleProvider>
          <LenisProvider>
            <MotionProvider>
              {children}
              <CustomCursor />
            </MotionProvider>
          </LenisProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
