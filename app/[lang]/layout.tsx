import Navbar from "../components/navbar";
import { LanguageProvider } from "@/components/language-provider";
import type { Language } from "@/lib/i18n";
import { redirect } from "next/navigation";

const LANGUAGES: Language[] = ["pt", "en", "es"];

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
};

export function generateStaticParams() {
  return LANGUAGES.map((lang) => ({ lang }));
}

export default async function LanguageLayout({
  children,
  params,
}: LayoutProps) {
  const { lang } = await params;
  const language = LANGUAGES.includes(lang as Language)
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
