"use client";

import { useState, useCallback } from "react";
import { CoolingForm } from "@/components/CoolingForm";
import { CoolingChart } from "@/components/CoolingChart";
import { CoolingParams, generateCoolingData, DRINK_TYPES } from "@/lib/cooling";
import { Thermometer, Clock, Snowflake } from "lucide-react";
import { useLanguage } from "@/components/language-provider";
import { t } from "@/lib/i18n";

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

  return (
    <main className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900 via-slate-900 to-black text-white p-4 md:p-8 font-[family-name:var(--font-geist-sans)]">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Hero Section */}
        <section className="text-center space-y-4 pt-8 animate-in fade-in slide-in-from-top-4 duration-1000">
          <div className="inline-flex items-center justify-center p-3 bg-primary/20 rounded-full mb-4 border border-primary/30 backdrop-blur-sm">
            <Snowflake className="w-8 h-8 text-primary animate-pulse" />
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-white">
            {t(language, "heroTitle")}
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto">
            {t(language, "heroSubtitle")}
          </p>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Form Column */}
          <div className="lg:col-span-6 space-y-6 animate-in fade-in slide-in-from-left-4 duration-700 delay-200">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Thermometer className="w-6 h-6 text-primary" />
              {t(language, "sectionSettings")}
            </h2>
            <CoolingForm onCalculate={handleCalculate} />
          </div>

          {/* Result Column */}
          <div className="lg:col-span-6 space-y-6 animate-in fade-in slide-in-from-right-4 duration-700 delay-400">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Clock className="w-6 h-6 text-primary" />
              {t(language, "sectionResult")}
            </h2>

            {coolingResult && currentParams && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-card/40 backdrop-blur-sm p-6 rounded-2xl border border-primary/20 flex flex-col items-center justify-center text-center">
                    <span className="text-slate-400 text-sm uppercase tracking-wider mb-1">
                      {t(language, "estimatedTime")}
                    </span>
                    <span className="text-5xl font-black text-primary">
                      {coolingResult.timeToIdeal}
                      <span className="text-xl ml-1">
                        {t(language, "minutesShort")}
                      </span>
                    </span>
                  </div>
                  <div className="bg-card/40 backdrop-blur-sm p-6 rounded-2xl border border-primary/20 flex flex-col items-center justify-center text-center">
                    <span className="text-slate-400 text-sm uppercase tracking-wider mb-1">
                      {t(language, "targetTemp")}
                    </span>
                    <span className="text-5xl font-black text-blue-400">
                      {DRINK_TYPES[currentParams.drinkType].idealTemp}
                      <span className="text-xl ml-1">°C</span>
                    </span>
                  </div>
                </div>

                <CoolingChart
                  data={coolingResult.data}
                  timeToIdeal={coolingResult.timeToIdeal}
                  idealTemp={DRINK_TYPES[currentParams.drinkType].idealTemp}
                />

                <p className="text-sm text-slate-500 text-center italic">
                  {t(language, "footnoteLine1")} {t(language, "footnoteLine2")}
                </p>
              </div>
            )}

            {!coolingResult && (
              <div className="h-full flex items-center justify-center min-h-[400px] border-2 border-dashed border-slate-800 rounded-2xl text-slate-600">
                {t(language, "waitingParams")}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
