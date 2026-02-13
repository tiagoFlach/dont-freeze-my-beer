import { FlaskConical, Beer, Wine, Martini } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { t, type Language } from "@/lib/i18n";
import { DRINK_TYPES } from "@/lib/cooling";

interface FormulaCardProps {
  language: Language;
}

const drinkIcons = {
  beer: Beer,
  wine: Wine,
  spirits: Martini,
};

const drinkLabels: Record<string, Record<Language, string>> = {
  beer: { en: "Beer", pt: "Cerveja", es: "Cerveza" },
  wine: { en: "Wine", pt: "Vinho", es: "Vino" },
  spirits: { en: "Spirits", pt: "Destilado", es: "Destilado" },
};

export function FormulaCard({ language }: FormulaCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <FlaskConical className="w-5 h-5 text-primary" />
          <CardTitle>{t(language, "formulaTitle")}</CardTitle>
        </div>
        <CardDescription>{t(language, "formulaSubtitle")}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* Formula */}
        <div className="rounded-lg bg-muted/50 border border-border p-4 text-center">
          <p className="text-xl md:text-2xl font-mono font-semibold tracking-wide text-primary">
            T(t) = T<sub>s</sub> + (T<sub>0</sub> − T<sub>s</sub>) · e
            <sup>−kt</sup>
          </p>
        </div>

        {/* Variable descriptions */}
        <ul className="space-y-1.5 text-sm text-muted-foreground">
          <li className="flex items-start gap-2">
            <code className="font-mono font-semibold text-foreground shrink-0">
              T(t)
            </code>
            <span>
              — {t(language, "formulaDescriptionT").replace("T(t) = ", "")}
            </span>
          </li>
          <li className="flex items-start gap-2">
            <code className="font-mono font-semibold text-foreground shrink-0">
              T<sub>s</sub>
            </code>
            <span>
              — {t(language, "formulaDescriptionTs").replace("T_s = ", "")}
            </span>
          </li>
          <li className="flex items-start gap-2">
            <code className="font-mono font-semibold text-foreground shrink-0">
              T<sub>0</sub>
            </code>
            <span>
              —{" "}
              {language === "pt"
                ? "Temperatura inicial da bebida"
                : language === "es"
                  ? "Temperatura inicial de la bebida"
                  : "Initial temperature of the drink"}
            </span>
          </li>
          <li className="flex items-start gap-2">
            <code className="font-mono font-semibold text-foreground shrink-0">
              k
            </code>
            <span>
              — {t(language, "formulaDescriptionTk").replace("k = ", "")}
            </span>
          </li>
          <li className="flex items-start gap-2">
            <code className="font-mono font-semibold text-foreground shrink-0">
              t
            </code>
            <span>
              —{" "}
              {language === "pt"
                ? "Tempo decorrido (minutos)"
                : language === "es"
                  ? "Tiempo transcurrido (minutos)"
                  : "Time elapsed (minutes)"}
            </span>
          </li>
        </ul>

        {/* Ideal temperatures */}
        <div className="space-y-2">
          <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            {t(language, "idealTempsTitle")}
          </h4>
          <div className="grid grid-cols-3 gap-2">
            {(Object.keys(DRINK_TYPES) as Array<keyof typeof DRINK_TYPES>).map(
              (drinkKey) => {
                const Icon = drinkIcons[drinkKey];
                return (
                  <div
                    key={drinkKey}
                    className="flex flex-col items-center gap-1 rounded-lg border border-border bg-muted/30 p-3"
                  >
                    <Icon className="w-5 h-5 text-primary" />
                    <span className="text-xs text-muted-foreground">
                      {drinkLabels[drinkKey][language]}
                    </span>
                    <span className="text-lg font-bold text-foreground">
                      {DRINK_TYPES[drinkKey].idealTemp}°C
                    </span>
                  </div>
                );
              },
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
