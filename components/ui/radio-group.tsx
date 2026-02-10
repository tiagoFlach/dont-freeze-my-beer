"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

type RadioGroupContextValue = {
  name: string;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
};

const RadioGroupContext = React.createContext<
  RadioGroupContextValue | undefined
>(undefined);

type RadioGroupProps = React.ComponentProps<"div"> & {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
};

function RadioGroup({
  className,
  value,
  defaultValue,
  onValueChange,
  disabled,
  ...props
}: RadioGroupProps) {
  const name = React.useId();

  return (
    <RadioGroupContext.Provider
      value={{ name, value, defaultValue, onValueChange, disabled }}
    >
      <div
        className={cn("grid gap-2", className)}
        role="radiogroup"
        {...props}
      />
    </RadioGroupContext.Provider>
  );
}

type RadioGroupItemProps = React.ComponentProps<"input"> & {
  value: string;
};

function RadioGroupItem({
  className,
  value,
  disabled,
  ...props
}: RadioGroupItemProps) {
  const context = React.useContext(RadioGroupContext);

  if (!context) {
    throw new Error("RadioGroupItem must be used within RadioGroup");
  }

  const isControlled = context.value !== undefined;
  const isChecked = isControlled ? context.value === value : undefined;
  const isDefaultChecked = !isControlled
    ? context.defaultValue === value
    : undefined;

  return (
    <input
      type="radio"
      name={context.name}
      value={value}
      checked={isChecked}
      defaultChecked={isDefaultChecked}
      disabled={disabled ?? context.disabled}
      onChange={() => context.onValueChange?.(value)}
      className={cn(
        "h-4 w-4 rounded-full border border-input text-primary shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
        className,
      )}
      {...props}
    />
  );
}

export { RadioGroup, RadioGroupItem };
