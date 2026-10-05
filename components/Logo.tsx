import Link from "next/link";
import type { Locale } from "@/lib/i18n";

export default function Logo({ lang, light = false }: { lang: Locale; light?: boolean }) {
  return (
    <Link href={`/${lang}`} className={`inline-flex items-center gap-2 rounded-lg font-serif text-2xl leading-none tracking-wide ${light ? "text-white" : "text-ink"}`}>
      <svg viewBox="0 0 40 40" className="h-8 w-8" aria-hidden="true">
        <rect width="40" height="40" rx="12" fill="#c8553d" />
        <path d="M20 9c5 6 7 11 7 15a7 7 0 0 1-14 0c0-4 2-9 7-15z" fill="#fbf6f1" />
      </svg>
      Nafis
    </Link>
  );
}
