"use client";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface ToggleButtonProps {
  label?: string;
  value?: boolean;
  disabled?: boolean;
  required?: boolean;
}

const ToggleButton = ({
  label,
  value,
  disabled,
  required,
}: ToggleButtonProps) => {
  return (
    <div className="flex items-center space-x-2">
      <Switch
        id="airplane-mode"
        checked={value}
        required={required}
        disabled={disabled}
      />
      <Label htmlFor="airplane-mode">{label}</Label>
    </div>
  );
};

export default ToggleButton;
