"use client";

import { useState, useCallback } from "react";
import { CoolingForm } from "@/components/CoolingForm";
import { CoolingChart } from "@/components/CoolingChart";
import { ResultStatsCard } from "@/components/ResultStatsCard";
import { FormulaCard } from "@/components/FormulaCard";
import { SectionTitle } from "@/components/SectionTitle";
import { CoolingParams, generateCoolingData, DRINK_TYPES } from "@/lib/cooling";
import { Thermometer, Clock, Snowflake } from "lucide-react";
import { useLanguage } from "@/components/language-provider";
import { t } from "@/lib/i18n";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardAction,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
  const [coolingResult, setCoolingResult] = useState<ReturnType<
    typeof generateCoolingData
  > | null>(null);
  const [currentParams, setCurrentParams] = useState<CoolingParams | null>(
    null,
  );
  const { language } = useLanguage();

  const handleCalculate = useCallback((params: CoolingParams) => {
    const result = generateCoolingData(params);
    setCoolingResult(result);
    setCurrentParams(params);
  }, []);

  const formatTimeLabel = (value: number) =>
    Number.isFinite(value) ? value : "∞";

  return (
    <main className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900 via-slate-900 to-black text-white px-3 py-6 lg:p-6 mb-16 font-[family-name:var(--font-geist-sans)]">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Hero Section */}
        <section className="text-center space-y-4 pt-8 mb-16 animate-in fade-in slide-in-from-top-4 duration-1000">
          <div className="inline-flex items-center justify-center mb-4">
            <Snowflake className="w-16 h-16 snowflake-color-shift" />
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-white">
            {t(language, "heroTitle")}
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-3xl mx-auto">
            {t(language, "heroSubtitle")}
          </p>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Form Column */}
          <div className="lg:col-span-5 space-y-5 sm:space-y-6 animate-in fade-in slide-in-from-left-4 duration-700 delay-200">
            <SectionTitle icon={Thermometer}>
              {t(language, "sectionSettings")}
            </SectionTitle>
            <CoolingForm onCalculate={handleCalculate} />
          </div>

          {/* Result Column */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-6 animate-in fade-in slide-in-from-right-4 duration-700 delay-400">
            <SectionTitle icon={Clock}>
              {t(language, "sectionResult")}
            </SectionTitle>

            {coolingResult && currentParams && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 lg:gap-5">
                  <ResultStatsCard
                    label={t(language, "estimatedTime")}
                    value={formatTimeLabel(coolingResult.timeToIdeal)}
                    unit={t(language, "minutesShort")}
                    valueClassName="text-primary"
                  />
                  <ResultStatsCard
                    label={t(language, "targetTemp")}
                    value={DRINK_TYPES[currentParams.drinkType].idealTemp}
                    unit="°C"
                    valueClassName="text-blue-400"
                  />
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>{t(language, "chartTitle")}</CardTitle>
                    <CardAction>
                      <span className="inline-flex items-center rounded-full border border-primary/30 bg-primary/20 px-2.5 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
                        {t(language, "chartIdealLabel")}{" "}
                        {DRINK_TYPES[currentParams.drinkType].idealTemp}°C
                      </span>
                    </CardAction>
                    <CardDescription>
                      {t(language, "chartIdealBadge", {
                        temp: DRINK_TYPES[currentParams.drinkType].idealTemp,
                        time: formatTimeLabel(coolingResult.timeToIdeal),
                      })}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <CoolingChart
                      data={coolingResult.data}
                      timeToIdeal={coolingResult.timeToIdeal}
                      idealTemp={DRINK_TYPES[currentParams.drinkType].idealTemp}
                    />
                  </CardContent>
                  <CardFooter className="justify-center text-sm text-foreground-muted text-center italic">
                    {t(language, "footnoteLine1")}{" "}
                    {t(language, "footnoteLine2")}
                  </CardFooter>
                </Card>
              </div>
            )}

            {!coolingResult && (
              <div className="h-full flex items-center justify-center min-h-[400px] border-2 border-dashed border-slate-800 rounded-2xl text-slate-600">
                {t(language, "waitingParams")}
              </div>
            )}
          </div>
        </div>

        {/* Formula Section - Full Width */}
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500">
          <FormulaCard language={language} />
        </div>
      </div>
    </main>
  );
}
