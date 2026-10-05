import { notFound } from "next/navigation";
import CartDrawer from "@/components/CartDrawer";
import Catalog from "@/components/Catalog";
import DemoBar from "@/components/DemoBar";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import { Delivery, Footer } from "@/components/Info";
import { hasLocale } from "@/lib/i18n";

export default async function Page({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  return (
    <>
      <DemoBar lang={lang} />
      <Header lang={lang} />
      <main>
        <Hero lang={lang} />
        <Catalog lang={lang} />
        <Delivery lang={lang} />
      </main>
      <Footer lang={lang} />
      <CartDrawer lang={lang} />
    </>
  );
}
