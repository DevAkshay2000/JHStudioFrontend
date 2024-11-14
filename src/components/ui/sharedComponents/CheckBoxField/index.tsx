"use client";

import { Checkbox } from "@/components/ui/checkbox";

export default function CheckboxField({
  label,
  name,
  disabled,
  required,
}: {
  label: string;
  name: string;
  disabled?: boolean;
  required?: boolean;
}) {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox id={name} disabled={disabled} required={required} />
      <label
        htmlFor={name}
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {label}
      </label>
    </div>
  );
}
