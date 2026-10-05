"use client";

import { Star, X } from "lucide-react";
import { useEffect, useState } from "react";
import type { Product } from "@/content/products";
import { getUI } from "@/content/ui";
import { sum, tr, type Locale } from "@/lib/i18n";
import { shop } from "@/lib/shop";
import ProductArt from "./ProductArt";

export default function QuickView({ product, lang, onClose }: { product: Product; lang: Locale; onClose: () => void }) {
  const ui = getUI(lang);
  const t = ui.product;
  const [size, setSize] = useState(product.volumes[0].size);
  const v = product.volumes.find((x) => x.size === size)!;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-ink/40 sm:items-center sm:p-6" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="qv-title"
        onClick={(e) => e.stopPropagation()}
        className="animate-pop grid max-h-[92dvh] w-full max-w-4xl overflow-y-auto rounded-t-[2rem] bg-surface shadow-2xl sm:rounded-[2rem] md:grid-cols-2"
      >
        <div className="relative flex items-center justify-center p-6" style={{ backgroundColor: product.colors.bg }}>
          <ProductArt product={product} className="w-full max-w-xs" />
          <button type="button" onClick={onClose} aria-label={t.close} className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-surface/90 md:hidden">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="flex flex-col p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <h2 id="qv-title" className="font-serif text-3xl leading-tight">
              {tr(product.name, lang)}
            </h2>
            <button type="button" onClick={onClose} aria-label={t.close} className="hidden rounded-full p-2 text-muted hover:bg-bg md:block">
              <X className="h-5 w-5" />
            </button>
          </div>
          <p className="mt-2 flex items-center gap-1 text-sm text-muted">
            <Star className="h-4 w-4 fill-gold text-gold" />
            {product.rating.toFixed(1)}
          </p>
          <p className="mt-4 leading-relaxed text-muted">{tr(product.description, lang)}</p>

          <p className="mt-6 text-sm font-bold">{t.volume}</p>
          <div className="mt-2 flex gap-2">
            {product.volumes.map((x) => (
              <button
                key={x.size}
                type="button"
                aria-pressed={size === x.size}
                onClick={() => setSize(x.size)}
                className={`rounded-full border px-4 py-2 text-sm font-semibold ${size === x.size ? "border-ink bg-ink text-white" : "border-line hover:border-ink/30"}`}
              >
                {x.size}
              </button>
            ))}
          </div>

          <dl className="mt-6 grid gap-4 text-sm">
            <div>
              <dt className="font-bold">{t.howTo}</dt>
              <dd className="mt-1 text-muted">{tr(product.howTo, lang)}</dd>
            </div>
            <div>
              <dt className="font-bold">{t.ingredients}</dt>
              <dd className="mt-2 flex flex-wrap gap-2">
                {product.ingredients.map((i) => (
                  <span key={i.ru} className="rounded-full bg-bg px-3 py-1 text-xs font-semibold">
                    {tr(i, lang)}
                  </span>
                ))}
              </dd>
            </div>
            <div>
              <dt className="font-bold">{t.skin}</dt>
              <dd className="mt-1 text-muted">{product.skin.map((s) => ui.skins[s]).join(", ")}</dd>
            </div>
          </dl>

          <div className="mt-auto flex items-center gap-4 pt-8">
            <p className="text-2xl font-extrabold">
              {sum(v.price)} <span className="text-sm font-semibold text-muted">{ui.currency}</span>
            </p>
            <button
              type="button"
              onClick={() => {
                shop.add(product.id, size);
                onClose();
                shop.openCart(true);
              }}
              className="h-12 flex-1 rounded-full bg-brand font-semibold text-white transition-colors hover:bg-brand-dark"
            >
              {t.add}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
