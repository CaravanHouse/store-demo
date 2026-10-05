"use client";

// Корзина и заказы демо-магазина. Хранятся в localStorage; React читает их через useSyncExternalStore —
// на сервере всегда пустое состояние, поэтому разметка совпадает при гидратации.
import { useSyncExternalStore } from "react";
import { delivery, FREE_DELIVERY_FROM, products, PROMO } from "@/content/products";

export interface CartLine {
  id: string;
  size: string;
  qty: number;
}

export type OrderStatus = "new" | "packing" | "shipping" | "done";
export type Method = "courier" | "region" | "pickup";

export interface Order {
  id: number;
  at: string;
  name: string;
  phone: string;
  address: string;
  method: Method;
  lines: CartLine[];
  total: number;
  status: OrderStatus;
  mine?: boolean;
}

export interface ShopState {
  cart: CartLine[];
  promo: boolean;
  orders: Order[];
  cartOpen: boolean;
  query: string;
}

const KEY = "nafis-demo-v1";
const EMPTY: ShopState = { cart: [], promo: false, orders: [], cartOpen: false, query: "" };

export const priceOf = (line: CartLine) => products.find((p) => p.id === line.id)!.volumes.find((v) => v.size === line.size)!.price;

// Несколько заказов «от других покупателей», чтобы панель продавца не была пустой
function demoOrders(): Order[] {
  const now = Date.now();
  const mk = (id: number, minutesAgo: number, name: string, lines: CartLine[], method: Method, status: OrderStatus): Order => ({
    id,
    at: new Date(now - minutesAgo * 60000).toISOString(),
    name,
    phone: "+998 90 000 00 00",
    address: method === "pickup" ? "—" : "Ташкент",
    method,
    lines,
    status,
    total: lines.reduce((s, l) => s + priceOf(l) * l.qty, 0) + (method === "courier" ? delivery.courier : 0),
  });
  return [
    mk(1041, 25, "Мадина", [{ id: "vitc", size: "30 ml", qty: 1 }, { id: "spf", size: "50 ml", qty: 1 }], "courier", "new"),
    mk(1040, 70, "Gulnora", [{ id: "gift", size: "4 шт", qty: 1 }], "courier", "packing"),
    mk(1039, 150, "Сардор", [{ id: "balm", size: "4 g", qty: 2 }, { id: "lotion", size: "250 ml", qty: 1 }], "pickup", "shipping"),
    mk(1038, 260, "Nilufar", [{ id: "morning", size: "3 шт", qty: 1 }], "region", "done"),
  ];
}

let state: ShopState | null = null;
const listeners = new Set<() => void>();

function load(): ShopState {
  try {
    const saved = localStorage.getItem(KEY);
    if (saved) return { ...EMPTY, ...JSON.parse(saved), cartOpen: false, query: "" };
  } catch {
    // без хранилища — чистое демо
  }
  return { ...EMPTY, orders: demoOrders() };
}

function set(patch: Partial<ShopState>) {
  state = { ...get(), ...patch };
  try {
    const { cart, promo, orders } = state;
    localStorage.setItem(KEY, JSON.stringify({ cart, promo, orders }));
  } catch {
    // приватный режим
  }
  listeners.forEach((l) => l());
}

const get = () => (state ??= load());
const subscribe = (l: () => void) => {
  listeners.add(l);
  return () => listeners.delete(l);
};

export const useShop = () => useSyncExternalStore(subscribe, get, () => EMPTY);

export function totals(s: ShopState, method: Method = "courier") {
  const subtotal = s.cart.reduce((sum, l) => sum + priceOf(l) * l.qty, 0);
  const discount = s.promo ? Math.round((subtotal * PROMO.percent) / 100) : 0;
  const goods = subtotal - discount;
  const ship = method === "pickup" || goods >= FREE_DELIVERY_FROM || !subtotal ? 0 : delivery[method];
  return { subtotal, discount, goods, ship, total: goods + ship, count: s.cart.reduce((n, l) => n + l.qty, 0) };
}

export const shop = {
  add(id: string, size: string) {
    const cart = get().cart;
    const line = cart.find((l) => l.id === id && l.size === size);
    set({ cart: line ? cart.map((l) => (l === line ? { ...l, qty: l.qty + 1 } : l)) : [...cart, { id, size, qty: 1 }] });
  },
  setQty(id: string, size: string, qty: number) {
    set({ cart: get().cart.flatMap((l) => (l.id === id && l.size === size ? (qty > 0 ? [{ ...l, qty }] : []) : [l])) });
  },
  applyPromo(code: string) {
    const ok = code.trim().toUpperCase() === PROMO.code;
    if (ok) set({ promo: true });
    return ok;
  },
  openCart: (open: boolean) => set({ cartOpen: open }),
  search: (query: string) => set({ query }),
  placeOrder(data: { name: string; phone: string; address: string; method: Method }) {
    const s = get();
    const id = Math.max(1041, ...s.orders.map((o) => o.id)) + 1;
    const order: Order = { id, at: new Date().toISOString(), ...data, lines: s.cart, total: totals(s, data.method).total, status: "new", mine: true };
    set({ orders: [order, ...s.orders], cart: [], promo: false });
    return order;
  },
  setStatus(id: number, status: OrderStatus) {
    set({ orders: get().orders.map((o) => (o.id === id ? { ...o, status } : o)) });
  },
  resetOrders: () => set({ orders: demoOrders() }),
};
