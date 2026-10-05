"use client";

import { Eye, Heart, Minus, Plus, SlidersHorizontal, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { categories, products, skins, type Category, type Product, type Skin } from "@/content/products";
import { getUI } from "@/content/ui";
import { sum, tr, type Locale } from "@/lib/i18n";
import { shop, useShop } from "@/lib/shop";
import ProductArt from "./ProductArt";
import QuickView from "./QuickView";

type Sort = "popular" | "cheap" | "expensive" | "new";
const MAX_PRICE = 400000;

export default function Catalog({ lang }: { lang: Locale }) {
  const ui = getUI(lang);
  const t = ui.catalog;
  const { query } = useShop();
  const [category, setCategory] = useState<Category | "all">("all");
  const [skin, setSkin] = useState<Skin[]>([]);
  const [maxPrice, setMaxPrice] = useState(MAX_PRICE);
  const [sort, setSort] = useState<Sort>("popular");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [quick, setQuick] = useState<Product | null>(null);

  // Ссылки «Наборы», «Хиты» в шапке
  useEffect(() => {
    const onFilter = (e: Event) => {
      const { category: c, sort: s } = (e as CustomEvent<{ category: Category | "all"; sort?: Sort }>).detail;
      setCategory(c);
      if (s) setSort(s);
    };
    window.addEventListener("store:filter", onFilter);
    return () => window.removeEventListener("store:filter", onFilter);
  }, []);

  const q = query.trim().toLowerCase();
  const list = products
    .filter(
      (p) =>
        (category === "all" || p.category === category) &&
        (!skin.length || skin.some((s) => p.skin.includes(s))) &&
        p.volumes[0].price <= maxPrice &&
        (!q || tr(p.name, lang).toLowerCase().includes(q) || p.label.toLowerCase().includes(q))
    )
    .sort((a, b) =>
      sort === "cheap" ? a.volumes[0].price - b.volumes[0].price : sort === "expensive" ? b.volumes[0].price - a.volumes[0].price : sort === "new" ? a.addedDaysAgo - b.addedDaysAgo : b.popularity - a.popularity
    );

  const resetFilters = () => {
    setCategory("all");
    setSkin([]);
    setMaxPrice(MAX_PRICE);
    shop.search("");
  };

  const filters = (
    <div className="flex flex-col gap-6">
      <fieldset>
        <legend className="text-sm font-bold">{t.skin}</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {skins.map((s) => {
            const on = skin.includes(s);
            return (
              <button
                key={s}
                type="button"
                aria-pressed={on}
                onClick={() => setSkin(on ? skin.filter((x) => x !== s) : [...skin, s])}
                className={`rounded-full border px-3.5 py-1.5 text-sm transition-colors ${on ? "border-ink bg-ink text-white" : "border-line bg-surface hover:border-ink/30"}`}
              >
                {ui.skins[s]}
              </button>
            );
          })}
        </div>
      </fieldset>
      <label className="block">
        <span className="flex justify-between text-sm font-bold">
          {t.price}
          <span className="font-semibold text-brand">
            {sum(maxPrice)} {ui.currency}
          </span>
        </span>
        <input type="range" min={60000} max={MAX_PRICE} step={10000} value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} className="mt-3 w-full accent-brand" />
      </label>
      <button type="button" onClick={resetFilters} className="self-start text-sm font-semibold text-brand hover:underline">
        {t.reset}
      </button>
    </div>
  );

  return (
    <section id="catalog" aria-labelledby="catalog-title" className="bg-surface py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <h2 id="catalog-title" className="font-serif text-4xl sm:text-5xl">
            {t.title}
          </h2>
          <div className="flex items-center gap-2">
            <button type="button" onClick={() => setFiltersOpen(!filtersOpen)} aria-expanded={filtersOpen} className="inline-flex h-11 items-center gap-2 rounded-full border border-line px-4 text-sm font-semibold lg:hidden">
              <SlidersHorizontal className="h-4 w-4" />
              {t.filters}
            </button>
            <label className="flex items-center gap-2 text-sm">
              <span className="hidden text-muted sm:inline">{t.sort}</span>
              <select value={sort} onChange={(e) => setSort(e.target.value as Sort)} className="input h-11 w-auto cursor-pointer rounded-full py-0 text-sm">
                {(Object.keys(t.sorts) as Sort[]).map((s) => (
                  <option key={s} value={s}>
                    {t.sorts[s]}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>

        <div role="tablist" className="-mx-4 mt-6 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0">
          {(["all", ...categories] as const).map((c) => (
            <button
              key={c}
              role="tab"
              aria-selected={category === c}
              onClick={() => setCategory(c)}
              className={`shrink-0 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${category === c ? "bg-brand text-white" : "bg-bg hover:bg-brand-soft"}`}
            >
              {ui.categories[c]}
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[15rem_1fr]">
          <aside className={`${filtersOpen ? "block" : "hidden"} rounded-3xl bg-bg p-5 lg:block lg:self-start lg:bg-transparent lg:p-0`}>{filters}</aside>
          <div>
            <p className="text-sm text-muted">
              {list.length} {t.found}
            </p>
            {list.length ? (
              <ul className="mt-4 grid grid-cols-2 gap-3 sm:gap-5 xl:grid-cols-3">
                {list.map((p) => (
                  <ProductCard key={p.id} product={p} lang={lang} onQuick={() => setQuick(p)} />
                ))}
              </ul>
            ) : (
              <div className="mt-6 rounded-3xl border border-dashed border-line p-10 text-center">
                <p className="text-muted">{t.empty}</p>
                <button type="button" onClick={resetFilters} className="mt-4 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white">
                  {t.reset}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      {quick ? <QuickView product={quick} lang={lang} onClose={() => setQuick(null)} /> : null}
    </section>
  );
}

function ProductCard({ product, lang, onQuick }: { product: Product; lang: Locale; onQuick: () => void }) {
  const ui = getUI(lang);
  const { cart } = useShop();
  const [liked, setLiked] = useState(false);
  const v = product.volumes[0];
  const line = cart.find((l) => l.id === product.id && l.size === v.size);

  return (
    <li className="group flex flex-col">
      <div className="relative overflow-hidden rounded-3xl" style={{ backgroundColor: product.colors.bg }}>
        <button type="button" onClick={onQuick} className="block w-full" aria-label={`${ui.product.quick}: ${tr(product.name, lang)}`}>
          <ProductArt product={product} className="mx-auto aspect-[5/6] w-full max-w-[16rem] p-4 transition-transform duration-500 group-hover:scale-105" />
        </button>
        {product.badge ? (
          <span className={`absolute top-3 left-3 rounded-full px-2.5 py-1 text-[11px] font-bold ${product.badge === "sale" ? "bg-brand text-white" : product.badge === "new" ? "bg-sage text-white" : "bg-ink text-white"}`}>
            {ui.badge[product.badge]}
          </span>
        ) : null}
        <button
          type="button"
          aria-pressed={liked}
          aria-label={ui.product.wish}
          onClick={() => setLiked(!liked)}
          className="absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-surface/90 shadow-sm"
        >
          <Heart className={`h-4 w-4 ${liked ? "fill-brand text-brand" : "text-muted"}`} />
        </button>
        <button
          type="button"
          onClick={onQuick}
          className="absolute inset-x-3 bottom-3 hidden h-10 items-center justify-center gap-2 rounded-full bg-surface/95 text-sm font-semibold opacity-0 shadow-lg transition-opacity group-hover:opacity-100 lg:flex"
        >
          <Eye className="h-4 w-4" />
          {ui.product.quick}
        </button>
      </div>
      <p className="mt-3 flex items-center gap-1 text-xs text-muted">
        <Star className="h-3.5 w-3.5 fill-gold text-gold" />
        {product.rating.toFixed(1)} · {v.size}
      </p>
      <h3 className="mt-1 text-sm leading-snug font-semibold sm:text-base">{tr(product.name, lang)}</h3>
      <p className="mt-1.5 flex items-baseline gap-2">
        <span className="font-bold">
          {sum(v.price)} <span className="text-xs font-semibold text-muted">{ui.currency}</span>
        </span>
        {v.old ? <span className="text-xs text-subtle line-through">{sum(v.old)}</span> : null}
      </p>
      <div className="mt-auto pt-3">
        {line ? (
          <div className="flex h-11 items-center justify-between rounded-full bg-brand-soft px-1.5">
            <button type="button" aria-label="−" onClick={() => shop.setQty(product.id, v.size, line.qty - 1)} className="flex h-8 w-8 items-center justify-center rounded-full bg-surface">
              <Minus className="h-4 w-4" />
            </button>
            <span className="text-sm font-bold">{line.qty}</span>
            <button type="button" aria-label="+" onClick={() => shop.add(product.id, v.size)} className="flex h-8 w-8 items-center justify-center rounded-full bg-surface">
              <Plus className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <button type="button" onClick={() => shop.add(product.id, v.size)} className="h-11 w-full rounded-full bg-ink text-sm font-semibold text-white transition-colors hover:bg-brand">
            {ui.product.add}
          </button>
        )}
      </div>
    </li>
  );
}
