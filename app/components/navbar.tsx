"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Github, Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { usePathname, useRouter } from "next/navigation";
import { useLanguage } from "@/components/language-provider";
import { t, type Language } from "@/lib/i18n";
import { useState } from "react";

export default function Navbar() {
  const { language } = useLanguage();
  const router = useRouter();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLanguageChange = (value: Language) => {
    const pattern = /^\/(en|pt|es)(?=\/|$)/;
    const nextPath = pattern.test(pathname)
      ? pathname.replace(pattern, `/${value}`)
      : `/${value}${pathname === "/" ? "" : pathname}`;

    router.push(nextPath);
  };

  return (
    <header>
      <div className="border-b text-primary">
        <div className="px-6 py-3 flex mx-auto max-w-5xl flex-wrap items-center gap-x-6">
          <div className="text-xl font-bold leading-tight">
            {t(language, "appName")}
          </div>
          <div className="ml-auto flex items-center gap-3">
            <Button
              variant="outline"
              size="icon"
              className="md:hidden"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? <X /> : <Menu />}
            </Button>
          </div>
          <nav
            className={`w-full overflow-hidden transition-[max-height,opacity] duration-200 ease-out md:w-auto md:overflow-visible md:transition-none ${
              menuOpen
                ? "max-h-64 opacity-100 mt-2"
                : "max-h-0 opacity-0 pointer-events-none md:max-h-none md:opacity-100 md:pointer-events-auto"
            }`}
          >
            <ul className="flex w-full items-center justify-end gap-3 md:w-auto">
              <li>
                <Select
                  defaultValue="pt"
                  value={language}
                  onValueChange={(value) =>
                    handleLanguageChange(value as Language)
                  }
                >
                  <SelectTrigger
                    className="w-[140px]"
                    aria-label={t(language, "languageSelectLabel")}
                  >
                    <SelectValue
                      placeholder={t(language, "languageSelectPlaceholder")}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="pt">Português</SelectItem>
                    <SelectItem value="es">Español</SelectItem>
                  </SelectContent>
                </Select>
              </li>
              <li>
                <ThemeToggle />
              </li>
              <li>
                <a
                  href="https://github.com/tiagoFlach/dont-freeze-my-beer"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    variant="outline"
                    size="icon"
                    aria-label={t(language, "githubLabel")}
                  >
                    <Github />
                  </Button>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
