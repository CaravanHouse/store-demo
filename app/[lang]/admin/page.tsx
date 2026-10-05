import { notFound } from "next/navigation";
import AdminPanel from "@/components/AdminPanel";
import DemoBar from "@/components/DemoBar";
import { hasLocale } from "@/lib/i18n";

export default async function AdminPage({ params }: PageProps<"/[lang]/admin">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  return (
    <>
      <DemoBar lang={lang} />
      <AdminPanel lang={lang} />
    </>
  );
}
