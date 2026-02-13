"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent } from "@/components/ui/card";
import { Field, FieldLabel } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  DRINK_TYPES,
  CONTAINER_MATERIALS,
  CONTAINER_SIZES,
  COOLING_METHODS,
  CoolingParams,
} from "@/lib/cooling";
import { optionLabels, t } from "@/lib/i18n";
import { useLanguage } from "@/components/language-provider";

type FormState = {
  drinkType: "beer" | "wine" | "spirits";
  initialTemp: string;
  material: "glass" | "aluminum" | "plastic";
  size: string;
  method: "fridge" | "freezer";
};

interface CoolingFormProps {
  onCalculate: (params: CoolingParams) => void;
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <FieldLabel htmlFor="drinkType">
                {t(language, "formDrinkTypeLabel")}
              </FieldLabel>
              <Select
                onValueChange={(value) =>
                  setFormState((prev) => ({
                    ...prev,
                    drinkType: value as FormState["drinkType"],
                  }))
                }
                value={formState.drinkType}
              >
                <div>
                  <SelectTrigger id="drinkType">
                    <SelectValue
                      placeholder={t(language, "formDrinkTypePlaceholder")}
                    />
                  </SelectTrigger>
                </div>
                <SelectContent>
                  {Object.entries(DRINK_TYPES).map(([key]) => (
                    <SelectItem key={key} value={key}>
                      {
                        optionLabels.drinkType[
                          key as keyof typeof optionLabels.drinkType
                        ][language]
                      }
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Field>
              <FieldLabel htmlFor="initialTemp">
                {t(language, "formInitialTempLabel")}
              </FieldLabel>
              <InputGroup>
                <InputGroupInput
                  id="initialTemp"
                  type="number"
                  inputMode="decimal"
                  min={0}
                  max={45}
                  step={1}
                  placeholder="0 - 45"
                  className="pr-12"
                  value={formState.initialTemp}
                  onChange={(event) =>
                    setFormState((prev) => ({
                      ...prev,
                      initialTemp: event.target.value,
                    }))
                  }
                />
                <InputGroupAddon
                  align="inline-end"
                  className="text-muted-foreground"
                >
                  °C
                </InputGroupAddon>
              </InputGroup>
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
                  <SelectTrigger id="size">
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

            <div className="space-y-3">
              <FieldLabel>{t(language, "formMaterialLabel")}</FieldLabel>
              <RadioGroup
                onValueChange={(value) =>
                  setFormState((prev) => ({
                    ...prev,
                    material: value as FormState["material"],
                  }))
                }
                value={formState.material}
                className="flex flex-col space-y-1"
              >
                {Object.entries(CONTAINER_MATERIALS).map(([key]) => (
                  <div
                    key={key}
                    className="flex items-center space-x-3 space-y-0"
                  >
                    <RadioGroupItem value={key} />
                    <span className="text-sm">
                      {
                        optionLabels.material[
                          key as keyof typeof optionLabels.material
                        ][language]
                      }
                    </span>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="space-y-3">
              <FieldLabel>{t(language, "formMethodLabel")}</FieldLabel>
              <RadioGroup
                onValueChange={(value) =>
                  setFormState((prev) => ({
                    ...prev,
                    method: value as FormState["method"],
                  }))
                }
                value={formState.method}
                className="flex flex-col space-y-1"
              >
                {Object.entries(COOLING_METHODS).map(([key]) => (
                  <div
                    key={key}
                    className="flex items-center space-x-3 space-y-0"
                  >
                    <RadioGroupItem value={key} />
                    <span className="text-sm">
                      {
                        optionLabels.method[
                          key as keyof typeof optionLabels.method
                        ][language]
                      }
                    </span>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
