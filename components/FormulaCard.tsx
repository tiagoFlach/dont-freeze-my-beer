import { FlaskConical, Beer, Wine, Martini, ExternalLink } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { t, type Language } from "@/lib/i18n";
import {
  calculateK,
  CONTAINER_MATERIALS,
  COOLING_RATE_MODEL,
  DRINK_TYPES,
  type CoolingParams,
} from "@/lib/cooling";

interface FormulaCardProps {
  language: Language;
  params: CoolingParams | null;
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

export function FormulaCard({ language, params }: FormulaCardProps) {
  const format = (value: number) =>
    new Intl.NumberFormat(language, {
      maximumFractionDigits: 6,
      useGrouping: false,
    }).format(value);

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
        <div
          className="overflow-x-auto rounded-lg bg-muted/50 border border-border p-4 text-xl md:text-2xl text-primary"
          dangerouslySetInnerHTML={{
            __html: `
              <math xmlns="http://www.w3.org/1998/Math/MathML" display="block">
                <semantics>
                  <mrow>
                    <mi>T</mi><mo>(</mo><mi>t</mi><mo>)</mo>
                    <mo>=</mo>
                    <msub><mi>T</mi><mi>s</mi></msub>
                    <mo>+</mo>
                    <mrow>
                      <mo>(</mo>
                      <msub><mi>T</mi><mn>0</mn></msub>
                      <mo>−</mo>
                      <msub><mi>T</mi><mi>s</mi></msub>
                      <mo>)</mo>
                    </mrow>
                    <mo>·</mo>
                    <msup>
                      <mi mathvariant="normal">e</mi>
                      <mrow><mo>−</mo><mi>k</mi><mi>t</mi></mrow>
                    </msup>
                  </mrow>
                  <annotation encoding="application/x-tex">T(t) = T_s + (T_0 - T_s) \\cdot e^{-kt}</annotation>
                </semantics>
              </math>
            `,
          }}
        />

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

        {params && (
          <section className="space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              {t(language, "rateCalculationTitle")}
            </h4>
            <div
              className="overflow-x-auto rounded-lg bg-muted/50 border border-border p-4 text-lg text-primary"
              dangerouslySetInnerHTML={{
                __html: `
                  <math xmlns="http://www.w3.org/1998/Math/MathML" display="block">
                    <mi>k</mi><mo>=</mo><msub><mi>k</mi><mtext>ref</mtext></msub>
                    <mo>·</mo><mi>c</mi><mo>·</mo>
                    <mfrac><msub><mi>k</mi><mi>b</mi></msub><msub><mi>k</mi><mtext>b,ref</mtext></msub></mfrac>
                    <mo>·</mo><mfrac><mi>m</mi><msub><mi>m</mi><mtext>ref</mtext></msub></mfrac>
                    <mo>·</mo><msup>
                      <mrow><mo>(</mo><mfrac><msub><mi>V</mi><mtext>ref</mtext></msub><mi>V</mi></mfrac><mo>)</mo></mrow>
                      <mi>α</mi>
                    </msup>
                  </math>
                `,
              }}
            />
            <p className="break-words text-sm font-medium text-foreground">
              k ≈ {format(COOLING_RATE_MODEL.referenceK)} ·{" "}
              {format(COOLING_RATE_MODEL.calibrationFactor)} ·{" "}
              ({format(DRINK_TYPES[params.drinkType].kBase)} /{" "}
              {format(DRINK_TYPES.beer.kBase)}) ·{" "}
              ({format(CONTAINER_MATERIALS[params.material].mult)} /{" "}
              {format(CONTAINER_MATERIALS.aluminum.mult)}) ·{" "}
              ({format(COOLING_RATE_MODEL.referenceVolume)} / {format(Number(params.size))})
              <sup>{format(COOLING_RATE_MODEL.volumeExponent)}</sup>
              {" ≈ "}
              {format(calculateK(params))} min⁻¹
            </p>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>
                <span className="font-medium text-foreground">k<sub>ref</sub></span>
                {" — "}{t(language, "rateReference")}: {format(COOLING_RATE_MODEL.referenceK)} min⁻¹
              </li>
              <li>
                <span className="font-medium text-foreground">c</span>
                {" — "}{t(language, "rateCalibration")}: {format(COOLING_RATE_MODEL.calibrationFactor)}
              </li>
              <li>
                <span className="font-medium text-foreground">k<sub>b</sub> / k<sub>b,ref</sub></span>
                {" — "}{t(language, "rateDrink")}: {format(DRINK_TYPES[params.drinkType].kBase)} / {format(DRINK_TYPES.beer.kBase)}
              </li>
              <li>
                <span className="font-medium text-foreground">m / m<sub>ref</sub></span>
                {" — "}{t(language, "rateMaterial")}: {format(CONTAINER_MATERIALS[params.material].mult)} / {format(CONTAINER_MATERIALS.aluminum.mult)}
              </li>
              <li>
                <span className="font-medium text-foreground">V<sub>ref</sub> / V</span>
                {" — "}{t(language, "rateVolume")}: {format(COOLING_RATE_MODEL.referenceVolume)} / {format(Number(params.size))} ml
              </li>
              <li>
                <span className="font-medium text-foreground">α</span>
                {" — "}{t(language, "rateExponent")}: {format(COOLING_RATE_MODEL.volumeExponent)}
              </li>
            </ul>
            <p className="text-xs text-muted-foreground">{t(language, "rateRounded")}</p>
          </section>
        )}

        <div className="space-y-2 text-sm text-muted-foreground">
          <p>
            {t(language, "formulaAssumptions")} {t(language, "formulaEstimate")}
          </p>
          <a
            href="https://openstax.org/books/calculus-volume-2/pages/4-3-separable-equations#fs-id1170571198014"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-medium text-primary underline underline-offset-4"
          >
            {t(language, "formulaSource")}
            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
          <div>
            <a
              href="https://blog.sintef.com/energy/efficient-way-to-cool-a-drink/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-medium text-primary underline underline-offset-4"
            >
              {t(language, "freezerSource")}
              <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </div>
        </div>

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
