import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAbout } from "@/lib/content";
import { isLocale, type Locale } from "@/lib/locale";
import SetDocumentLang from "@/components/SetDocumentLang";

type Props = { children: React.ReactNode; params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return [{ locale: "en" as const }, { locale: "vi" as const }];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: l } = await params;
  if (!isLocale(l)) {
    return { title: "Portfolio" };
  }
  const about = getAbout(l);
  return { title: about.name, description: about.tagline };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale: l } = await params;
  if (!isLocale(l)) {
    notFound();
  }
  const locale = l as Locale;
  return (
    <>
      <SetDocumentLang locale={locale} />
      {children}
    </>
  );
}
