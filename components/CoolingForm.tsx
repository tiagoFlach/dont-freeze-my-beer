"use client";

import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  DRINK_TYPES,
  CONTAINER_MATERIALS,
  CONTAINER_SIZES,
  COOLING_METHODS,
  CoolingParams,
} from "@/lib/cooling";
import { useEffect } from "react";
import { optionLabels, t } from "@/lib/i18n";
import { useLanguage } from "@/components/language-provider";

const formSchema = z.object({
  drinkType: z.enum(["beer", "wine", "spirits"]),
  initialTemp: z.coerce.number().min(0).max(40),
  material: z.enum(["glass", "aluminum", "plastic"]),
  size: z.enum(["small", "medium", "large"]),
  method: z.enum(["fridge", "freezer"]),
});

interface CoolingFormProps {
  onCalculate: (params: CoolingParams) => void;
}

export function CoolingForm({ onCalculate }: CoolingFormProps) {
  const { language } = useLanguage();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      drinkType: "beer",
      initialTemp: 25,
      material: "aluminum",
      size: "small",
      method: "freezer",
    },
  });

  const drinkType = useWatch({ control: form.control, name: "drinkType" });
  const initialTemp = useWatch({ control: form.control, name: "initialTemp" });
  const material = useWatch({ control: form.control, name: "material" });
  const size = useWatch({ control: form.control, name: "size" });
  const method = useWatch({ control: form.control, name: "method" });

  useEffect(() => {
    if (form.formState.isValid) {
      onCalculate({
        drinkType,
        initialTemp,
        material,
        size,
        method,
      } as CoolingParams);
    }
  }, [
    drinkType,
    initialTemp,
    material,
    size,
    method,
    onCalculate,
    form.formState.isValid,
  ]);

  return (
    <Form {...form}>
      <Card>
        <CardContent>
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="drinkType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t(language, "formDrinkTypeLabel")}</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            placeholder={t(
                              language,
                              "formDrinkTypePlaceholder",
                            )}
                          />
                        </SelectTrigger>
                      </FormControl>
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
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="initialTemp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t(language, "formInitialTempLabel")}</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        className="bg-background/50"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="size"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t(language, "formSizeLabel")}</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="bg-background/50">
                          <SelectValue
                            placeholder={t(language, "formSizePlaceholder")}
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.entries(CONTAINER_SIZES).map(([key]) => (
                          <SelectItem key={key} value={key}>
                            {
                              optionLabels.size[
                                key as keyof typeof optionLabels.size
                              ][language]
                            }
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="material"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>{t(language, "formMaterialLabel")}</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        {Object.entries(CONTAINER_MATERIALS).map(([key]) => (
                          <FormItem
                            key={key}
                            className="flex items-center space-x-3 space-y-0"
                          >
                            <FormControl>
                              <RadioGroupItem value={key} />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {
                                optionLabels.material[
                                  key as keyof typeof optionLabels.material
                                ][language]
                              }
                            </FormLabel>
                          </FormItem>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="method"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>{t(language, "formMethodLabel")}</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        {Object.entries(COOLING_METHODS).map(([key]) => (
                          <FormItem
                            key={key}
                            className="flex items-center space-x-3 space-y-0"
                          >
                            <FormControl>
                              <RadioGroupItem value={key} />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {
                                optionLabels.method[
                                  key as keyof typeof optionLabels.method
                                ][language]
                              }
                            </FormLabel>
                          </FormItem>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </form>
        </CardContent>
      </Card>
    </Form>
  );
}
