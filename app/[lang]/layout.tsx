import Navbar from "../components/navbar";
import { LanguageProvider } from "@/components/language-provider";
import { SUPPORTED_LANGUAGES, t, type Language } from "@/lib/i18n";
import { getSiteUrl } from "@/lib/site";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

const LOCALE_MAP: Record<Language, string> = {
  pt: "pt_BR",
  en: "en_US",
  es: "es_ES",
};

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
};

export function generateStaticParams() {
  return SUPPORTED_LANGUAGES.map((lang) => ({ lang }));
}

type MetadataProps = {
  params: Promise<{ lang: string }>;
};

export async function generateMetadata({
  params,
}: MetadataProps): Promise<Metadata> {
  const { lang } = await params;
  const language = SUPPORTED_LANGUAGES.includes(lang as Language)
    ? (lang as Language)
    : "pt";
  const baseUrl = getSiteUrl();
  const canonical = new URL(`/${language}`, baseUrl).toString();

  return {
    title: t(language, "metaTitle"),
    description: t(language, "metaDescription"),
    keywords: t(language, "metaKeywords").split(", "),
    alternates: {
      canonical,
      languages: {
        pt: new URL("/pt", baseUrl).toString(),
        en: new URL("/en", baseUrl).toString(),
        es: new URL("/es", baseUrl).toString(),
      },
    },
    openGraph: {
      type: "website",
      url: canonical,
      locale: LOCALE_MAP[language],
      siteName: t(language, "appName"),
      title: t(language, "metaTitle"),
      description: t(language, "metaDescription"),
    },
    twitter: {
      card: "summary",
      title: t(language, "metaTitle"),
      description: t(language, "metaDescription"),
    },
  };
}

export default async function LanguageLayout({
  children,
  params,
}: LayoutProps) {
  const { lang } = await params;
  const language = SUPPORTED_LANGUAGES.includes(lang as Language)
    ? (lang as Language)
    : null;

  if (!language) {
    redirect("/pt");
  }

  return (
    <LanguageProvider defaultLanguage={language}>
      <Navbar />
      <main>
        <div className="mx-auto max-w-5xl">{children}</div>
      </main>
    </LanguageProvider>
  );
}
