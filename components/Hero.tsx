import { ArrowDown, Check, Sparkles } from "lucide-react";
import { products, PROMO } from "@/content/products";
import { getUI } from "@/content/ui";
import type { Locale } from "@/lib/i18n";
import ProductArt from "./ProductArt";

const byId = (id: string) => products.find((p) => p.id === id)!;

export default function Hero({ lang }: { lang: Locale }) {
  const t = getUI(lang).hero;
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 pt-10 pb-14 sm:px-6 lg:grid-cols-2 lg:px-8 lg:pt-14 lg:pb-20">
        <div className="animate-pop">
          <p className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.18em] text-brand">
            <Sparkles className="h-4 w-4" />
            {t.eyebrow}
          </p>
          <h1 className="mt-5 font-serif text-5xl leading-[1.05] text-balance sm:text-6xl lg:text-7xl">
            {t.title} <span className="text-brand italic">{t.titleAccent}</span>
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted">{t.subtitle}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a href="#catalog" className="inline-flex h-14 shrink-0 items-center justify-center gap-2 rounded-full bg-brand px-8 whitespace-nowrap font-semibold text-white shadow-xl shadow-brand/25 transition-colors hover:bg-brand-dark">
              {t.cta}
              <ArrowDown className="h-4 w-4" />
            </a>
            <p className="rounded-full border border-dashed border-brand/50 bg-brand-soft/60 px-5 py-3 text-sm">
              {t.promo} <span className="font-bold tracking-wider text-brand">{PROMO.code}</span>
            </p>
          </div>
          <ul className="mt-8 flex flex-col gap-2 text-sm text-muted sm:flex-row sm:flex-wrap sm:gap-x-6">
            {t.perks.map((perk) => (
              <li key={perk} className="inline-flex items-center gap-2">
                <Check className="h-4 w-4 text-sage" />
                {perk}
              </li>
            ))}
          </ul>
        </div>

        {/* Композиция из упаковок — вместо фотосессии */}
        <div aria-hidden="true" className="relative mx-auto aspect-square w-full max-w-lg">
          <div className="absolute inset-[8%] rounded-full bg-gradient-to-br from-brand-soft via-[#fdeee2] to-[#f3e1c4]" />
          <div className="absolute inset-[22%] rounded-full border border-white/70" />
          <ProductArt product={byId("vitc")} className="animate-bob absolute top-[14%] left-[30%] w-[40%] drop-shadow-2xl" />
          <ProductArt product={byId("night")} className="animate-bob absolute bottom-[10%] left-[6%] w-[36%] [animation-delay:-2s]" />
          <ProductArt product={byId("toner")} className="animate-bob absolute right-[4%] bottom-[14%] w-[34%] [animation-delay:-4s]" />
          <span className="absolute top-[12%] right-[10%] rounded-2xl bg-surface px-4 py-3 text-sm shadow-xl">
            <span className="block text-xs text-muted">VIT C 15%</span>
            <span className="font-bold">★ 4.9</span>
          </span>
        </div>
      </div>
    </section>
  );
}
