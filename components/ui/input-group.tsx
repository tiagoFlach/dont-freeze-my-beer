import * as React from "react";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

type InputGroupAddonAlign = "inline-start" | "inline-end";

function InputGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div className={cn("relative flex items-center", className)} {...props} />
  );
}

const InputGroupInput = React.forwardRef<
  React.ElementRef<typeof Input>,
  React.ComponentPropsWithoutRef<typeof Input>
>(({ className, ...props }, ref) => (
  <Input ref={ref} className={cn("pr-10", className)} {...props} />
));
InputGroupInput.displayName = "InputGroupInput";

type InputGroupAddonProps = React.ComponentProps<"span"> & {
  align?: InputGroupAddonAlign;
};

function InputGroupAddon({
  className,
  align = "inline-end",
  ...props
}: InputGroupAddonProps) {
  return (
    <span
      className={cn(
        "absolute top-1/2 -translate-y-1/2",
        align === "inline-end" && "right-3",
        align === "inline-start" && "left-3",
        className,
      )}
      {...props}
    />
  );
}

export { InputGroup, InputGroupAddon, InputGroupInput };
