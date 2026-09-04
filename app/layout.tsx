import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://focusmarketing.uz"),
  title: {
    default: "FOCUS Marketing — Biznesingizni keyingi bosqichga olib chiqamiz",
    template: "%s | FOCUS Marketing",
  },
  description:
    "Strategiya, kreativ va natijaga yo'naltirilgan marketing yechimlari bilan brendingizni kuchaytiramiz. FOCUS Marketing — professional marketing agentligi.",
  keywords: [
    "marketing agentligi",
    "SMM",
    "performance marketing",
    "branding",
    "FOCUS Marketing",
    "O'zbekiston marketing",
  ],
  openGraph: {
    title: "FOCUS Marketing — Biznesingizni keyingi bosqichga olib chiqamiz",
    description:
      "Strategiya, kreativ va natijaga yo'naltirilgan marketing yechimlari bilan brendingizni kuchaytiramiz.",
    url: "https://focusmarketing.uz",
    siteName: "FOCUS Marketing",
    locale: "uz_UZ",
    type: "website",
    images: ["/focus-logo.png"],
  },
  icons: {
    icon: "/focus-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="uz" className={`${manrope.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
