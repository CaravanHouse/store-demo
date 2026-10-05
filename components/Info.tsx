import { CreditCard, Package, Store, Truck } from "lucide-react";
import Link from "next/link";
import { getUI } from "@/content/ui";
import type { Locale } from "@/lib/i18n";
import Logo from "./Logo";

const icons = [Truck, Package, Store, CreditCard];

export function Delivery({ lang }: { lang: Locale }) {
  const t = getUI(lang).delivery;
  return (
    <section id="delivery" aria-labelledby="delivery-title" className="py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 id="delivery-title" className="font-serif text-4xl sm:text-5xl">
          {t.title}
        </h2>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {t.items.map((item, i) => {
            const Icon = icons[i];
            return (
              <li key={item.title} className="rounded-3xl bg-surface p-6">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-soft text-brand">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 text-lg font-bold">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.text}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

export function Footer({ lang }: { lang: Locale }) {
  const ui = getUI(lang);
  return (
    <footer className="bg-ink text-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-12 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <div className="max-w-sm">
          <Logo lang={lang} light />
          <p className="mt-3 text-sm text-white/60">{ui.footer.about}</p>
        </div>
        <div className="flex flex-col gap-2 text-sm md:items-end">
          <Link href={`/${lang}/admin`} className="font-semibold hover:underline">
            {ui.nav.admin} →
          </Link>
          <a href="https://caravanhouse.uz" className="font-semibold text-[#ffd27a] hover:underline">
            {ui.footer.made} →
          </a>
        </div>
      </div>
    </footer>
  );
}
