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
        <div className="px-6 py-3 flex mx-auto max-w-7xl flex-wrap items-center gap-x-6">
          <div className="text-xl font-bold leading-tight">
            {t(language, "appName")}
          </div>
          <div className="ml-auto flex items-center gap-3">
            <Button
              variant="outline"
              size="icon"
              className="md:hidden"
              aria-label={t(language, menuOpen ? "closeMenu" : "openMenu")}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? <X /> : <Menu />}
            </Button>
          </div>
          <nav
            className={`w-full md:block md:w-auto ${
              menuOpen
                ? "mt-2"
                : "hidden"
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
                <Button variant="outline" size="icon" asChild>
                  <a
                    href="https://github.com/tiagoFlach/dont-freeze-my-beer"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={t(language, "githubLabel")}
                  >
                    <Github />
                  </a>
                </Button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
