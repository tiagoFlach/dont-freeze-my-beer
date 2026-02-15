"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Field, FieldLabel } from "@/components/ui/field";
import {
  DRINK_TYPES,
  CONTAINER_MATERIALS,
  CONTAINER_SIZES,
  COOLING_METHODS,
  CoolingParams,
} from "@/lib/cooling";
import { optionLabels, t } from "@/lib/i18n";
import { useLanguage } from "@/components/language-provider";
import { cn } from "@/lib/utils";
import {
  Beer,
  BottleWine,
  Martini,
  Package,
  Recycle,
  Snowflake,
  Thermometer,
  ThermometerSnowflake,
  Wine,
} from "lucide-react";

type FormState = {
  drinkType: "beer" | "wine" | "spirits";
  initialTemp: string;
  material: "glass" | "aluminum" | "plastic";
  size: string;
  method: "fridge" | "freezer";
};

type OptionCardProps = {
  selected: boolean;
  label: string;
  onClick: () => void;
  Icon: React.ComponentType<{ className?: string }>;
};

interface CoolingFormProps {
  onCalculate: (params: CoolingParams) => void;
}

function OptionCard({ selected, label, onClick, Icon }: OptionCardProps) {
  const optionCardClass = (isSelected: boolean) =>
    cn(
      "flex flex-col items-center gap-2 rounded-lg border border-border bg-muted/30 p-3 text-center text-sm transition",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
      "hover:border-primary/60",
      isSelected && "border-primary/60 bg-primary/10 text-foreground",
    );

  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      className={optionCardClass(selected)}
      onClick={onClick}
    >
      <Icon className="h-5 w-5 text-primary" />
      <span className="text-xs text-muted-foreground">{label}</span>
    </button>
  );
}

export function CoolingForm({ onCalculate }: CoolingFormProps) {
  const { language } = useLanguage();
  const [formState, setFormState] = useState<FormState>({
    drinkType: "beer",
    initialTemp: "25",
    material: "aluminum",
    size: "350",
    method: "freezer",
  });

  const parsedInitialTemp = useMemo(() => {
    const value = Number(formState.initialTemp);
    return Number.isFinite(value) ? value : NaN;
  }, [formState.initialTemp]);

  const isValid = useMemo(() => {
    return parsedInitialTemp >= 0 && parsedInitialTemp <= 40;
  }, [parsedInitialTemp]);

  const sliderValue = Number.isFinite(parsedInitialTemp)
    ? parsedInitialTemp
    : 0;

  const drinkIcons = {
    beer: Beer,
    wine: Wine,
    spirits: Martini,
  } as const;

  const materialIcons = {
    glass: BottleWine,
    aluminum: Package,
    plastic: Recycle,
  } as const;

  const methodIcons = {
    fridge: Thermometer,
    freezer: ThermometerSnowflake,
  } as const;

  useEffect(() => {
    if (isValid) {
      onCalculate({
        drinkType: formState.drinkType,
        initialTemp: parsedInitialTemp,
        material: formState.material,
        size: formState.size,
        method: formState.method,
      } as CoolingParams);
    }
  }, [
    formState.drinkType,
    formState.material,
    formState.method,
    formState.size,
    parsedInitialTemp,
    onCalculate,
    isValid,
  ]);

  // Reset size when drink type changes
  useEffect(() => {
    const availableSizes = Object.keys(
      CONTAINER_SIZES[formState.drinkType as keyof typeof CONTAINER_SIZES] ??
        {},
    );
    // If current size is not valid for new drink type, select the first available one
    if (!availableSizes.includes(formState.size)) {
      setFormState((prev) => ({ ...prev, size: availableSizes[0] }));
    }
  }, [formState.drinkType, formState.size]);

  return (
    <Card>
      <CardContent>
        <form
          className="space-y-6"
          onSubmit={(event) => event.preventDefault()}
        >
          <div className="grid grid-cols-1 gap-5 md:gap-6">
            <div className="space-y-2">
              <FieldLabel>{t(language, "formDrinkTypeLabel")}</FieldLabel>
              <div
                className="grid grid-cols-3 gap-2"
                role="radiogroup"
                aria-label={t(language, "formDrinkTypeLabel")}
              >
                {Object.entries(DRINK_TYPES).map(([key]) => {
                  const selected = formState.drinkType === key;
                  const Icon = drinkIcons[key as keyof typeof drinkIcons];

                  return (
                    <OptionCard
                      key={key}
                      selected={selected}
                      Icon={Icon}
                      label={
                        optionLabels.drinkType[
                          key as keyof typeof optionLabels.drinkType
                        ][language]
                      }
                      onClick={() =>
                        setFormState((prev) => ({
                          ...prev,
                          drinkType: key as FormState["drinkType"],
                        }))
                      }
                    />
                  );
                })}
              </div>
            </div>

            <Field>
              <div className="flex items-center justify-between">
                <FieldLabel htmlFor="initialTemp">
                  {t(language, "formInitialTempLabel")}
                </FieldLabel>
                <span className="text-sm text-muted-foreground">
                  {sliderValue}°C
                </span>
              </div>
              <input
                id="initialTemp"
                type="range"
                min={0}
                max={40}
                step={1}
                value={sliderValue}
                onChange={(event) =>
                  setFormState((prev) => ({
                    ...prev,
                    initialTemp: event.target.value,
                  }))
                }
                className="w-full accent-primary"
              />
            </Field>

            <div className="space-y-2">
              <FieldLabel htmlFor="size">
                {t(language, "formSizeLabel")}
              </FieldLabel>
              <Select
                onValueChange={(value) =>
                  setFormState((prev) => ({ ...prev, size: value }))
                }
                value={formState.size}
              >
                <div>
                  <SelectTrigger id="size" className="w-full">
                    <SelectValue
                      placeholder={t(language, "formSizePlaceholder")}
                    />
                  </SelectTrigger>
                </div>
                <SelectContent>
                  {Object.entries(
                    CONTAINER_SIZES[
                      formState.drinkType as keyof typeof CONTAINER_SIZES
                    ] || {},
                  ).map(([key]) => (
                    <SelectItem key={key} value={key}>
                      {(optionLabels.size as any)[key]?.[language] || key}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <FieldLabel>{t(language, "formMaterialLabel")}</FieldLabel>
              <div
                className="grid grid-cols-3 gap-2"
                role="radiogroup"
                aria-label={t(language, "formMaterialLabel")}
              >
                {Object.entries(CONTAINER_MATERIALS).map(([key]) => {
                  const selected = formState.material === key;
                  const Icon = materialIcons[key as keyof typeof materialIcons];

                  return (
                    <OptionCard
                      key={key}
                      selected={selected}
                      Icon={Icon}
                      label={
                        optionLabels.material[
                          key as keyof typeof optionLabels.material
                        ][language]
                      }
                      onClick={() =>
                        setFormState((prev) => ({
                          ...prev,
                          material: key as FormState["material"],
                        }))
                      }
                    />
                  );
                })}
              </div>
            </div>

            <div className="space-y-2">
              <FieldLabel>{t(language, "formMethodLabel")}</FieldLabel>
              <div
                className="grid grid-cols-2 gap-2"
                role="radiogroup"
                aria-label={t(language, "formMethodLabel")}
              >
                {Object.entries(COOLING_METHODS).map(([key]) => {
                  const selected = formState.method === key;
                  const Icon = methodIcons[key as keyof typeof methodIcons];

                  return (
                    <OptionCard
                      key={key}
                      selected={selected}
                      Icon={Icon}
                      label={
                        optionLabels.method[
                          key as keyof typeof optionLabels.method
                        ][language]
                      }
                      onClick={() =>
                        setFormState((prev) => ({
                          ...prev,
                          method: key as FormState["method"],
                        }))
                      }
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
