"use client";

import { RotateCcw } from "lucide-react";
import Link from "next/link";
import { products } from "@/content/products";
import { getUI } from "@/content/ui";
import { sum, tr, type Locale } from "@/lib/i18n";
import { shop, useShop, type OrderStatus } from "@/lib/shop";
import Logo from "./Logo";

const statusTone: Record<OrderStatus, string> = {
  new: "bg-brand text-white",
  packing: "bg-gold/20 text-[#7a5310]",
  shipping: "bg-[#efe3d3] text-ink",
  done: "bg-sage/15 text-sage",
};

export default function AdminPanel({ lang }: { lang: Locale }) {
  const ui = getUI(lang);
  const t = ui.admin;
  const { orders } = useShop();
  const today = orders.filter((o) => new Date(o.at).toDateString() === new Date().toDateString());
  const revenue = today.reduce((s, o) => s + o.total, 0);
  const statuses = Object.keys(t.statuses) as OrderStatus[];

  const kpis = [
    { label: t.today, value: String(today.length) },
    { label: t.revenue, value: `${sum(revenue)} ${ui.currency}` },
    { label: t.avg, value: `${sum(today.length ? revenue / today.length : 0)} ${ui.currency}` },
    { label: t.newOrders, value: String(orders.filter((o) => o.status === "new").length) },
  ];

  return (
    <div className="min-h-dvh bg-bg">
      <header className="border-b border-line bg-surface">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
          <Logo lang={lang} />
          <Link href={`/${lang}`} className="text-sm font-semibold text-brand hover:underline">
            {t.back}
          </Link>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <h1 className="font-serif text-4xl">{t.title}</h1>
        <p className="mt-2 max-w-2xl text-muted">{t.subtitle}</p>

        <dl className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {kpis.map((k) => (
            <div key={k.label} className="rounded-3xl bg-surface p-5">
              <dt className="text-sm text-muted">{k.label}</dt>
              <dd className="mt-1 text-2xl font-extrabold tracking-tight">{k.value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-6 overflow-hidden rounded-3xl bg-surface">
          {orders.length ? (
            <ul>
              {orders.map((o) => (
                <li key={o.id} className={`grid gap-3 border-b border-line p-4 last:border-0 sm:grid-cols-[6rem_1fr_9rem_10rem] sm:items-center sm:px-6 ${o.mine ? "bg-brand-soft/40" : ""}`}>
                  <div>
                    <p className="font-bold">
                      №{o.id} {o.mine ? <span className="ml-1 rounded-full bg-brand px-2 py-0.5 text-[10px] text-white">{t.yours}</span> : null}
                    </p>
                    <p className="text-xs text-muted">{new Date(o.at).toLocaleTimeString(lang === "ru" ? "ru-RU" : "uz-UZ", { hour: "2-digit", minute: "2-digit" })}</p>
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold">
                      {o.name} <span className="text-sm font-normal text-muted">· {o.phone}</span>
                    </p>
                    <p className="truncate text-sm text-muted">
                      {o.lines.map((l) => `${tr(products.find((p) => p.id === l.id)!.name, lang)} ×${l.qty}`).join(", ")}
                    </p>
                  </div>
                  <p className="font-bold sm:text-right">
                    {sum(o.total)} <span className="text-xs font-semibold text-muted">{ui.currency}</span>
                  </p>
                  <label className="sm:justify-self-end">
                    <span className="sr-only">{t.status}</span>
                    <select
                      value={o.status}
                      onChange={(e) => shop.setStatus(o.id, e.target.value as OrderStatus)}
                      className={`h-9 cursor-pointer rounded-full border-0 px-3 text-sm font-semibold ${statusTone[o.status]}`}
                    >
                      {statuses.map((s) => (
                        <option key={s} value={s}>
                          {t.statuses[s]}
                        </option>
                      ))}
                    </select>
                  </label>
                </li>
              ))}
            </ul>
          ) : (
            <p className="p-10 text-center text-muted">{t.empty}</p>
          )}
        </div>
        <button type="button" onClick={shop.resetOrders} className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-muted hover:text-ink">
          <RotateCcw className="h-4 w-4" />
          {t.reset}
        </button>
      </main>
    </div>
  );
}
