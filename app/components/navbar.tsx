"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Github } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { useLanguage } from "@/components/language-provider";
import { t, type Language } from "@/lib/i18n";

export default function Navbar() {
  const { language, setLanguage } = useLanguage();

  return (
    <header>
      <div className="border-b text-primary h-16 items-center">
        <div className="h-16 px-6 flex mx-auto max-w-5xl justify-between items-center">
          <div className="text-xl font-bold">{t(language, "appName")}</div>
          <nav className="">
            <ul className="flex items-center gap-3">
              <li>
                <Select
                  defaultValue="pt"
                  value={language}
                  onValueChange={(value) => setLanguage(value as Language)}
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
