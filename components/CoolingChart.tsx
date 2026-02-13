"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceArea,
  ReferenceLine,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/components/language-provider";
import { t } from "@/lib/i18n";

interface CoolingChartProps {
  data: any[];
  timeToIdeal: number;
  idealTemp: number;
}

export function CoolingChart({
  data,
  timeToIdeal,
  idealTemp,
}: CoolingChartProps) {
  const { language } = useLanguage();
  const hasFiniteTime = Number.isFinite(timeToIdeal);

  return (
    <div className="w-full h-[420px] md:h-[460px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 16, right: 32, left: 12, bottom: 28 }}
        >
          <defs>
            <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.1} />
              <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="hsl(var(--muted-foreground) / 0.2)"
          />
          <XAxis
            dataKey="time"
            label={{
              value: t(language, "chartXAxis"),
              position: "insideBottomRight",
              offset: -8,
            }}
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
          />
          <YAxis
            label={{
              value: t(language, "chartYAxis"),
              angle: -90,
              position: "insideLeft",
              offset: 8,
            }}
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              borderColor: "hsl(var(--border))",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }}
            itemStyle={{ color: "var(--primary)" }}
            labelFormatter={(label) =>
              `${label} ${t(language, "chartTooltipMin")}`
            }
          />

          {/* Highlight target area */}
          <ReferenceLine
            y={idealTemp}
            stroke="hsl(var(--primary))"
            strokeDasharray="3 3"
            label={{
              value: t(language, "chartIdealLabel"),
              position: "right",
              fill: "var(--primary)",
              fontSize: 12,
            }}
          />
          {hasFiniteTime && (
            <ReferenceLine
              x={timeToIdeal}
              stroke="hsl(var(--primary))"
              strokeDasharray="3 3"
            />
          )}

          <Line
            type="monotone"
            dataKey="temp"
            stroke="hsl(var(--primary))"
            strokeWidth={3}
            dot={{ fill: "hsl(var(--primary))", r: 4 }}
            activeDot={{
              r: 6,
              stroke: "hsl(var(--background))",
              strokeWidth: 2,
            }}
            animationDuration={1500}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
