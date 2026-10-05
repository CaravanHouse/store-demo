import type { Metadata, Viewport } from "next";
import { Manrope, Prata } from "next/font/google";
import { notFound } from "next/navigation";
import { getUI } from "@/content/ui";
import { hasLocale, htmlLang, locales } from "@/lib/i18n";
import "../globals.css";

const manrope = Manrope({ subsets: ["latin", "latin-ext", "cyrillic"], variable: "--font-manrope", display: "swap" });
const prata = Prata({ weight: "400", subsets: ["latin", "cyrillic"], variable: "--font-prata", display: "swap" });

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export const viewport: Viewport = { themeColor: "#c8553d" };

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const { meta } = getUI(lang);
  return {
    metadataBase: new URL("https://store.caravanhouse.uz"),
    title: meta.title,
    description: meta.description,
    alternates: { canonical: `/${lang}`, languages: { ru: "/ru", uz: "/uz" } },
    openGraph: { title: meta.title, description: meta.description, url: `/${lang}`, type: "website" },
    robots: { index: false, follow: true },
  };
}

export default async function Layout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  return (
    <html lang={htmlLang[lang]} className={`${manrope.variable} ${prata.variable} antialiased`}>
      <body className="min-h-dvh overflow-x-clip">{children}</body>
    </html>
  );
}
