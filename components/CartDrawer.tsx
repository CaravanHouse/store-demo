"use client";

import { ArrowLeft, Banknote, Check, CreditCard, Minus, Package, Plus, ShoppingBag, Store, Trash2, Truck, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";
import { delivery, FREE_DELIVERY_FROM, products } from "@/content/products";
import { getUI } from "@/content/ui";
import { sum, tr, type Locale } from "@/lib/i18n";
import { priceOf, shop, totals, useShop, type Method, type Order } from "@/lib/shop";
import ProductArt from "./ProductArt";

type Step = "cart" | "contacts" | "delivery" | "payment" | "done";

export default function CartDrawer({ lang }: { lang: Locale }) {
  const state = useShop();
  if (!state.cartOpen) return null;
  return <Drawer lang={lang} />;
}

function Drawer({ lang }: { lang: Locale }) {
  const ui = getUI(lang);
  const c = ui.cart;
  const k = ui.checkout;
  const state = useShop();
  const [step, setStep] = useState<Step>("cart");
  const [code, setCode] = useState("");
  const [promoMsg, setPromoMsg] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("+998 ");
  const [address, setAddress] = useState("");
  const [method, setMethod] = useState<Method>("courier");
  const [pay, setPay] = useState<"card" | "cash">("card");
  const [error, setError] = useState(false);
  const [order, setOrder] = useState<Order | null>(null);
  const sums = totals(state, step === "cart" ? "courier" : method);
  const close = () => shop.openCart(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && shop.openCart(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, []);

  const steps: Step[] = ["contacts", "delivery", "payment"];
  const stepIndex = steps.indexOf(step);
  const back = () => setStep(stepIndex <= 0 ? "cart" : steps[stepIndex - 1]);

  const next = () => {
    if (step === "contacts") {
      if (name.trim().length < 2 || phone.replace(/\D/g, "").length < 12) return setError(true);
      setError(false);
      setStep("delivery");
    } else if (step === "delivery") {
      if (method !== "pickup" && address.trim().length < 5) return setError(true);
      setError(false);
      setStep("payment");
    } else if (step === "payment") {
      setOrder(shop.placeOrder({ name: name.trim(), phone, address: method === "pickup" ? "—" : address.trim(), method }));
      setStep("done");
    }
  };

  const left = FREE_DELIVERY_FROM - sums.goods;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-ink/40" onClick={close}>
      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
        onClick={(e) => e.stopPropagation()}
        className="animate-slide-in flex h-full w-full max-w-md flex-col bg-surface shadow-2xl"
      >
        <div className="flex items-center gap-3 border-b border-line px-5 py-4">
          {step !== "cart" && step !== "done" ? (
            <button type="button" onClick={back} aria-label={k.back} className="rounded-full p-2 text-muted hover:bg-bg">
              <ArrowLeft className="h-5 w-5" />
            </button>
          ) : null}
          <h2 id="cart-title" className="flex-1 font-serif text-2xl">
            {step === "cart" ? c.title : step === "done" ? k.successTitle : k.title}
          </h2>
          <button type="button" onClick={close} aria-label={ui.product.close} className="rounded-full p-2 text-muted hover:bg-bg">
            <X className="h-5 w-5" />
          </button>
        </div>

        {stepIndex >= 0 ? (
          <ol className="flex gap-2 px-5 pt-4">
            {k.steps.map((label, i) => (
              <li key={label} className="flex-1">
                <span className={`block h-1.5 rounded-full ${i <= stepIndex ? "bg-brand" : "bg-line"}`} />
                <span className={`mt-1.5 block text-xs ${i === stepIndex ? "font-bold" : "text-subtle"}`}>{label}</span>
              </li>
            ))}
          </ol>
        ) : null}

        <div className="flex-1 overflow-y-auto px-5 py-5">
          {step === "cart" ? (
            state.cart.length ? (
              <>
                <div className="rounded-2xl bg-bg p-4 text-sm">
                  {left > 0 ? (
                    <>
                      <p>
                        {c.freeLeft}: <b>{sum(left)} {ui.currency}</b>
                      </p>
                      <div className="mt-2 h-2 rounded-full bg-line">
                        <div className="h-full rounded-full bg-sage transition-all" style={{ width: `${Math.min(100, (sums.goods / FREE_DELIVERY_FROM) * 100)}%` }} />
                      </div>
                    </>
                  ) : (
                    <p className="font-semibold text-sage">{c.freeOk}</p>
                  )}
                </div>
                <ul className="mt-4 flex flex-col gap-3">
                  {state.cart.map((line) => {
                    const p = products.find((x) => x.id === line.id)!;
                    return (
                      <li key={`${line.id}-${line.size}`} className="flex gap-3">
                        <span className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl" style={{ backgroundColor: p.colors.bg }}>
                          <ProductArt product={p} className="h-16" />
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm leading-snug font-semibold">{tr(p.name, lang)}</p>
                          <p className="text-xs text-muted">{line.size}</p>
                          <div className="mt-2 flex items-center justify-between">
                            <div className="flex items-center gap-2 rounded-full bg-bg p-1">
                              <button type="button" aria-label="−" onClick={() => shop.setQty(line.id, line.size, line.qty - 1)} className="flex h-7 w-7 items-center justify-center rounded-full bg-surface">
                                <Minus className="h-3.5 w-3.5" />
                              </button>
                              <span className="w-4 text-center text-sm font-bold">{line.qty}</span>
                              <button type="button" aria-label="+" onClick={() => shop.add(line.id, line.size)} className="flex h-7 w-7 items-center justify-center rounded-full bg-surface">
                                <Plus className="h-3.5 w-3.5" />
                              </button>
                            </div>
                            <span className="text-sm font-bold">{sum(priceOf(line) * line.qty)}</span>
                          </div>
                        </div>
                        <button type="button" aria-label={c.remove} onClick={() => shop.setQty(line.id, line.size, 0)} className="self-start p-1 text-subtle hover:text-brand">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </li>
                    );
                  })}
                </ul>
                <div className="mt-6">
                  {state.promo ? (
                    <p className="rounded-2xl bg-sage/10 px-4 py-3 text-sm font-semibold text-sage">{c.promoOk}</p>
                  ) : (
                    <>
                      <div className="flex gap-2">
                        <input value={code} onChange={(e) => setCode(e.target.value)} placeholder={c.promo} className="input h-11 uppercase" />
                        <button
                          type="button"
                          onClick={() => setPromoMsg(shop.applyPromo(code) ? null : c.promoBad)}
                          className="h-11 shrink-0 rounded-xl border border-line px-4 text-sm font-semibold hover:bg-bg"
                        >
                          {c.apply}
                        </button>
                      </div>
                      <p className="mt-1.5 text-xs text-muted">{promoMsg ?? c.promoHint}</p>
                    </>
                  )}
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center py-12 text-center">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-soft text-brand">
                  <ShoppingBag className="h-7 w-7" />
                </span>
                <p className="mt-4 font-serif text-2xl">{c.empty}</p>
                <p className="mt-2 max-w-xs text-sm text-muted">{c.emptyHint}</p>
                <a href="#catalog" onClick={close} className="mt-6 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white">
                  {c.toCatalog}
                </a>
              </div>
            )
          ) : step === "contacts" ? (
            <div className="grid gap-4">
              <Field label={k.name}>
                <input value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" className="input" autoFocus />
              </Field>
              <Field label={k.phone}>
                <input value={phone} onChange={(e) => setPhone(e.target.value)} inputMode="tel" autoComplete="tel" className="input" />
              </Field>
            </div>
          ) : step === "delivery" ? (
            <div className="grid gap-3">
              <Choice active={method === "courier"} onClick={() => setMethod("courier")} icon={<Truck className="h-5 w-5" />} title={k.courier} note={k.courierNote} price={sums.goods >= FREE_DELIVERY_FROM ? c.free : `${sum(delivery.courier)} ${ui.currency}`} />
              <Choice active={method === "region"} onClick={() => setMethod("region")} icon={<Package className="h-5 w-5" />} title={k.region} note={k.regionNote} price={sums.goods >= FREE_DELIVERY_FROM ? c.free : `${sum(delivery.region)} ${ui.currency}`} />
              <Choice active={method === "pickup"} onClick={() => setMethod("pickup")} icon={<Store className="h-5 w-5" />} title={k.pickup} note={k.pickupNote} price={c.free} />
              {method !== "pickup" ? (
                <Field label={k.address}>
                  <input value={address} onChange={(e) => setAddress(e.target.value)} autoComplete="street-address" className="input" />
                </Field>
              ) : null}
            </div>
          ) : step === "payment" ? (
            <div className="grid gap-3">
              <Choice active={pay === "card"} onClick={() => setPay("card")} icon={<CreditCard className="h-5 w-5" />} title={k.card} note={k.cardNote} />
              <Choice active={pay === "cash"} onClick={() => setPay("cash")} icon={<Banknote className="h-5 w-5" />} title={k.cash} note={k.cashNote} />
            </div>
          ) : order ? (
            <div className="flex flex-col items-center text-center">
              <span className="animate-pop flex h-16 w-16 items-center justify-center rounded-full bg-sage text-white">
                <Check className="h-8 w-8" strokeWidth={3} />
              </span>
              <p className="mt-4 font-serif text-3xl">
                {k.order} №{order.id}
              </p>
              <p className="mt-1 text-lg font-bold">
                {sum(order.total)} {ui.currency}
              </p>
              <p className="mt-4 text-sm text-muted">{k.successText}</p>
              <Link href={`/${lang}/admin`} onClick={close} className="mt-6 inline-flex h-12 w-full items-center justify-center rounded-full bg-ink font-semibold text-white">
                {k.toAdmin}
              </Link>
              <button type="button" onClick={close} className="mt-3 h-12 w-full rounded-full border border-line font-semibold">
                {k.continue}
              </button>
            </div>
          ) : null}
          {error ? <p className="mt-3 text-sm text-brand">{k.required}</p> : null}
        </div>

        {state.cart.length && step !== "done" ? (
          <div className="border-t border-line px-5 py-4">
            <dl className="mb-4 grid gap-1.5 text-sm">
              <Row label={c.subtotal} value={`${sum(sums.subtotal)} ${ui.currency}`} />
              {sums.discount ? <Row label={c.discount} value={`−${sum(sums.discount)} ${ui.currency}`} accent /> : null}
              <Row label={c.delivery} value={sums.ship ? `${sum(sums.ship)} ${ui.currency}` : c.free} />
              <Row label={c.total} value={`${sum(sums.total)} ${ui.currency}`} bold />
            </dl>
            <button
              type="button"
              onClick={step === "cart" ? () => setStep("contacts") : next}
              className="h-12 w-full rounded-full bg-brand font-semibold text-white transition-colors hover:bg-brand-dark"
            >
              {step === "cart" ? c.checkout : step === "payment" ? k.place : k.next}
            </button>
          </div>
        ) : null}
      </aside>
    </div>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="grid gap-1.5 text-sm font-semibold">
      {label}
      {children}
    </label>
  );
}

function Row({ label, value, bold, accent }: { label: string; value: string; bold?: boolean; accent?: boolean }) {
  return (
    <div className={`flex justify-between ${bold ? "pt-1 text-base font-extrabold" : "text-muted"} ${accent ? "text-sage" : ""}`}>
      <dt>{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}

function Choice({ active, onClick, icon, title, note, price }: { active: boolean; onClick: () => void; icon: ReactNode; title: string; note: string; price?: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`flex items-center gap-3 rounded-2xl border p-4 text-left transition-colors ${active ? "border-brand bg-brand-soft/60" : "border-line hover:border-brand/40"}`}
    >
      <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${active ? "bg-brand text-white" : "bg-bg text-muted"}`}>{icon}</span>
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-semibold">{title}</span>
        <span className="block text-xs text-muted">{note}</span>
      </span>
      {price ? <span className="shrink-0 text-sm font-bold">{price}</span> : null}
    </button>
  );
}
