"use client";

import { Search, ShoppingBag, Store, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import type { Category } from "@/content/products";
import { getUI } from "@/content/ui";
import type { Locale } from "@/lib/i18n";
import { shop, totals, useShop } from "@/lib/shop";
import LangSwitch from "./LangSwitch";
import Logo from "./Logo";

/** Переключить фильтр каталога из шапки (Catalog слушает событие) */
export const showCategory = (category: Category | "all", sort?: "popular") => {
  window.dispatchEvent(new CustomEvent("store:filter", { detail: { category, sort } }));
  document.getElementById("catalog")?.scrollIntoView();
};

export default function Header({ lang }: { lang: Locale }) {
  const ui = getUI(lang);
  const state = useShop();
  const { count } = totals(state);
  const [searchOpen, setSearchOpen] = useState(false);

  const searchInput = (
    <label className="relative block">
      <span className="sr-only">{ui.search}</span>
      <Search className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-subtle" />
      <input
        value={state.query}
        onChange={(e) => {
          shop.search(e.target.value);
          document.getElementById("catalog")?.scrollIntoView();
        }}
        placeholder={ui.search}
        className="input h-11 rounded-full pl-10 text-sm"
      />
    </label>
  );

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/95">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:h-[4.5rem] lg:px-8">
        <Logo lang={lang} />
        <nav aria-label={ui.nav.catalog} className="ml-4 hidden lg:block">
          <ul className="flex gap-1 text-sm font-semibold">
            <li><button type="button" onClick={() => showCategory("all")} className="rounded-full px-3 py-2 hover:bg-brand-soft">{ui.nav.catalog}</button></li>
            <li><button type="button" onClick={() => showCategory("all", "popular")} className="rounded-full px-3 py-2 hover:bg-brand-soft">{ui.nav.hits}</button></li>
            <li><button type="button" onClick={() => showCategory("sets")} className="rounded-full px-3 py-2 hover:bg-brand-soft">{ui.nav.sets}</button></li>
            <li><a href="#delivery" className="block rounded-full px-3 py-2 hover:bg-brand-soft">{ui.nav.delivery}</a></li>
          </ul>
        </nav>
        <div className="ml-auto hidden w-64 md:block">{searchInput}</div>
        <div className="ml-auto flex items-center gap-2 md:ml-0">
          <button type="button" onClick={() => setSearchOpen(!searchOpen)} aria-label={ui.search} className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-surface md:hidden">
            {searchOpen ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
          </button>
          <Link href={`/${lang}/admin`} className="hidden h-11 items-center gap-2 rounded-full border border-line bg-surface px-4 text-sm font-semibold hover:border-brand/40 sm:inline-flex">
            <Store className="h-4 w-4 text-brand" />
            <span className="hidden xl:inline">{ui.nav.admin}</span>
          </Link>
          <div className="hidden sm:block">
            <LangSwitch lang={lang} label={ui.langLabel} />
          </div>
          <button
            type="button"
            onClick={() => shop.openCart(true)}
            aria-label={ui.cart.title}
            className="relative inline-flex h-11 items-center gap-2 rounded-full bg-ink px-4 text-sm font-semibold text-white transition-colors hover:bg-brand"
          >
            <ShoppingBag className="h-5 w-5" />
            <span className="hidden sm:inline">{ui.cart.title}</span>
            {count ? <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-brand px-1 text-[11px] font-bold">{count}</span> : null}
          </button>
        </div>
      </div>
      {searchOpen ? (
        <div className="flex flex-col gap-3 border-t border-line px-4 py-3 md:hidden">
          {searchInput}
          <div className="flex items-center justify-between">
            <LangSwitch lang={lang} label={ui.langLabel} />
            <Link href={`/${lang}/admin`} className="inline-flex items-center gap-2 text-sm font-semibold">
              <Store className="h-4 w-4 text-brand" />
              {ui.nav.admin}
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
