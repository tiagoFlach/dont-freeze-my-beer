"use client";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ResultStatsCardProps {
  label: string;
  value: number | string;
  unit: string;
  valueClassName?: string;
}

export function ResultStatsCard({
  label,
  value,
  unit,
  valueClassName,
}: ResultStatsCardProps) {
  return (
    <Card>
      <CardHeader className="items-center text-center">
        <CardDescription className="text-slate-400 text-sm uppercase tracking-wider">
          {label}
        </CardDescription>
        <CardTitle
          className={`text-5xl font-black ${valueClassName ?? ""}`.trim()}
        >
          {value}
          <span className="text-xl ml-1">{unit}</span>
        </CardTitle>
      </CardHeader>
    </Card>
  );
}
