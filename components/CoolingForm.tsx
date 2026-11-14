"use client";

import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  DRINK_TYPES,
  CONTAINER_MATERIALS,
  CONTAINER_SIZES,
  COOLING_METHODS,
  CoolingParams,
} from "@/lib/cooling";
import { optionLabels, t } from "@/lib/i18n";
import { useLanguage } from "@/components/language-provider";
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
  method: keyof typeof COOLING_METHODS;
};

type OptionCardProps = {
  value: string;
  label: string;
  detail?: string;
  Icon: React.ComponentType<{ className?: string }>;
};

interface CoolingFormProps {
  onCalculate: (params: CoolingParams) => void;
}

function OptionCard({ value, label, detail, Icon }: OptionCardProps) {
  return (
    <label className="flex cursor-pointer flex-col items-center gap-2 rounded-lg border border-border bg-muted/30 p-3 text-center text-sm transition hover:border-primary/60 has-checked:border-primary/60 has-checked:bg-primary/10 has-focus-visible:ring-2 has-focus-visible:ring-primary/40">
      <RadioGroupItem value={value} className="sr-only" />
      <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
      <span className="text-xs text-muted-foreground">
        {label}
        {detail && <span className="block font-medium text-foreground">{detail}</span>}
      </span>
    </label>
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

  const parsedInitialTemp = Number(formState.initialTemp);
  const isValid =
    Number.isFinite(parsedInitialTemp) &&
    parsedInitialTemp >= 0 &&
    parsedInitialTemp <= 40;

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
    freezerCompartment: Snowflake,
  } as const;

  useEffect(() => {
    if (isValid) {
      onCalculate({
        drinkType: formState.drinkType,
        initialTemp: parsedInitialTemp,
        material: formState.material,
        size: formState.size,
        method: formState.method,
      });
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
    const availableSizes = Object.keys(CONTAINER_SIZES[formState.drinkType]);
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
              <RadioGroup
                className="grid grid-cols-3 gap-2"
                aria-label={t(language, "formDrinkTypeLabel")}
                value={formState.drinkType}
                onValueChange={(value) =>
                  setFormState((prev) => ({
                    ...prev,
                    drinkType: value as FormState["drinkType"],
                  }))
                }
              >
                {Object.entries(DRINK_TYPES).map(([key]) => {
                  const Icon = drinkIcons[key as keyof typeof drinkIcons];

                  return (
                    <OptionCard
                      key={key}
                      value={key}
                      Icon={Icon}
                      label={
                        optionLabels.drinkType[
                          key as keyof typeof optionLabels.drinkType
                        ][language]
                      }
                    />
                  );
                })}
              </RadioGroup>
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
              <RadioGroup
                className="grid grid-cols-3 gap-2"
                aria-label={t(language, "formMaterialLabel")}
                value={formState.material}
                onValueChange={(value) =>
                  setFormState((prev) => ({
                    ...prev,
                    material: value as FormState["material"],
                  }))
                }
              >
                {Object.entries(CONTAINER_MATERIALS).map(([key]) => {
                  const Icon = materialIcons[key as keyof typeof materialIcons];

                  return (
                    <OptionCard
                      key={key}
                      value={key}
                      Icon={Icon}
                      label={
                        optionLabels.material[
                          key as keyof typeof optionLabels.material
                        ][language]
                      }
                    />
                  );
                })}
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <FieldLabel>{t(language, "formMethodLabel")}</FieldLabel>
              <RadioGroup
                className="grid grid-cols-3 gap-2"
                aria-label={t(language, "formMethodLabel")}
                aria-describedby="method-temperature-help"
                value={formState.method}
                onValueChange={(value) =>
                  setFormState((prev) => ({
                    ...prev,
                    method: value as FormState["method"],
                  }))
                }
              >
                {Object.entries(COOLING_METHODS).map(([key, { ambientTemp }]) => {
                  const Icon = methodIcons[key as keyof typeof methodIcons];

                  return (
                    <OptionCard
                      key={key}
                      value={key}
                      Icon={Icon}
                      detail={`${ambientTemp}°C`}
                      label={
                        optionLabels.method[
                          key as keyof typeof optionLabels.method
                        ][language]
                      }
                    />
                  );
                })}
              </RadioGroup>
              <FieldDescription
                id="method-temperature-help"
                className="text-xs text-muted-foreground"
              >
                <strong>{t(language, "formMethodTempNote")}</strong>{" "}
                {t(language, "formMethodTempHelp")}
              </FieldDescription>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
