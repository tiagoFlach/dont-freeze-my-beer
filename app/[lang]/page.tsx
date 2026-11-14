"use client";

import { useState, useCallback, useEffect } from "react";
import { CoolingForm } from "@/components/CoolingForm";
import { CoolingChart } from "@/components/CoolingChart";
import { ResultStatsCard } from "@/components/ResultStatsCard";
import { FormulaCard } from "@/components/FormulaCard";
import { SectionTitle } from "@/components/SectionTitle";
import {
  CoolingParams,
  COOLING_METHODS,
  FRIDGE_MIN_MARGIN,
  generateCoolingData,
  DRINK_TYPES,
  getTimeToTarget,
} from "@/lib/cooling";
import { Thermometer, Clock, Snowflake, AlertTriangle } from "lucide-react";
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

  const freezingTime = currentParams
    ? getTimeToTarget(0, currentParams)
    : Infinity;
  const isFreezingTimeFinite = Number.isFinite(freezingTime);
  const freezingTimeLabel = isFreezingTimeFinite
    ? Math.round(freezingTime)
    : "—";

  const fridgeMinTemp =
    COOLING_METHODS.fridge.ambientTemp + FRIDGE_MIN_MARGIN;
  const fridgeMinTime =
    currentParams?.method === "fridge"
      ? getTimeToTarget(fridgeMinTemp, currentParams)
      : Infinity;
  const fridgeMinNote = Number.isFinite(fridgeMinTime)
    ? `${t(language, "fridgeMinTimeLabel", { temp: fridgeMinTemp })}: ${Math.round(fridgeMinTime)} ${t(language, "minutesShort")}`
    : undefined;
  const [showFreezeAlert, setShowFreezeAlert] = useState(false);
  const [freezeAlertLeaving, setFreezeAlertLeaving] = useState(false);
  const freezeAlertExitMs = 500;

  useEffect(() => {
    if (isFreezingTimeFinite) {
      setShowFreezeAlert(true);
      setFreezeAlertLeaving(false);
      return;
    }

    if (!showFreezeAlert) {
      return;
    }

    setFreezeAlertLeaving(true);
    const timer = window.setTimeout(() => {
      setShowFreezeAlert(false);
      setFreezeAlertLeaving(false);
    }, freezeAlertExitMs);

    return () => window.clearTimeout(timer);
  }, [isFreezingTimeFinite, showFreezeAlert]);

  return (
    <main className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-50 via-slate-100 to-white text-foreground dark:from-blue-900 dark:via-slate-900 dark:to-black px-3 py-6 lg:p-6 mb-16 font-[family-name:var(--font-geist-sans)]">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Hero Section */}
        <section className="text-center space-y-4 pt-8 mb-16 animate-in fade-in slide-in-from-top-4 duration-1000">
          <div className="inline-flex items-center justify-center mb-4 animate-spin [animation-duration:48s] will-change-transform">
            <Snowflake className="w-16 h-16 animate-[snowflake-color_25s_ease-in-out_infinite]" />
          </div>
          <h1 className="text-5xl md:text-7xl leading-[1.15] font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-900 to-cyan-800 dark:from-blue-400 dark:to-white">
            {t(language, "heroTitle")}
          </h1>
          <p className="text-slate-700 dark:text-slate-400 text-lg md:text-xl max-w-3xl mx-auto">
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
                    note={fridgeMinNote}
                  />
                  <ResultStatsCard
                    label={t(language, "targetTemp")}
                    value={DRINK_TYPES[currentParams.drinkType].idealTemp}
                    unit="°C"
                    valueClassName="text-blue-400"
                  />
                </div>

                {showFreezeAlert && (
                  <div
                    className={`overflow-hidden transition-[max-height,opacity,transform] duration-500 ease-out ${
                      freezeAlertLeaving
                        ? "max-h-0 opacity-0 -translate-y-1"
                        : "max-h-65 opacity-100 translate-y-0"
                    }`}
                  >
                    <Card
                      className={`border-amber-300 bg-amber-50 dark:border-amber-500/50 dark:bg-amber-500/10 duration-500 ${
                        freezeAlertLeaving
                          ? "animate-out fade-out-0 slide-out-to-top-2"
                          : "animate-in fade-in slide-in-from-top-2"
                      }`}
                    >
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-amber-950 dark:text-card-foreground">
                          <AlertTriangle className="h-5 w-5 text-amber-700 dark:text-amber-400" />
                          {t(language, "freezeAlertTitle")}
                        </CardTitle>
                        <CardDescription className="text-amber-900 dark:text-amber-200/80">
                          {t(language, "freezeAlertDescription", {
                            time: freezingTimeLabel,
                          })}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="flex items-center justify-between">
                        <div className="text-4xl font-black text-amber-800 dark:text-amber-400">
                          {freezingTimeLabel}
                          <span className="text-base ml-1">
                            {t(language, "minutesShort")}
                          </span>
                        </div>
                        <Snowflake className="h-8 w-8 text-amber-700 dark:text-amber-300/80" />
                      </CardContent>
                    </Card>
                  </div>
                )}

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
                      {currentParams.initialTemp <=
                      DRINK_TYPES[currentParams.drinkType].idealTemp
                        ? t(language, "chartAlreadyCool")
                        : Number.isFinite(coolingResult.timeToIdeal)
                          ? t(language, "chartIdealBadge", {
                              temp: DRINK_TYPES[currentParams.drinkType].idealTemp,
                              time: coolingResult.timeToIdeal,
                            })
                          : t(language, "chartUnreachable")}
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
          <FormulaCard language={language} params={currentParams} />
        </div>
      </div>
    </main>
  );
}
