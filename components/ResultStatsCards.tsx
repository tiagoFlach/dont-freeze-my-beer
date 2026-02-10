import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { t, type Language } from "@/lib/i18n";

interface ResultStatsCardsProps {
  language: Language;
  timeToIdeal: number;
  idealTemp: number;
}

export function ResultStatsCards({
  language,
  timeToIdeal,
  idealTemp,
}: ResultStatsCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <Card>
        <CardHeader className="items-center text-center">
          <CardDescription className="text-slate-400 text-sm uppercase tracking-wider">
            {t(language, "estimatedTime")}
          </CardDescription>
          <CardTitle className="text-5xl font-black text-primary">
            {timeToIdeal}
            <span className="text-xl ml-1">{t(language, "minutesShort")}</span>
          </CardTitle>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader className="items-center text-center">
          <CardDescription className="text-slate-400 text-sm uppercase tracking-wider">
            {t(language, "targetTemp")}
          </CardDescription>
          <CardTitle className="text-5xl font-black text-blue-400">
            {idealTemp}
            <span className="text-xl ml-1">°C</span>
          </CardTitle>
        </CardHeader>
      </Card>
    </div>
  );
}
