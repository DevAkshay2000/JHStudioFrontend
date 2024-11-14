import { Textarea } from "@/components/ui/textarea";

interface TextAreaFieldProps {
  value?: any;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
}

export default function TextAreaField({
  value,
  placeholder,
  required,
  disabled,
}: TextAreaFieldProps) {
  return (
    <Textarea
      value={value}
      required={required}
      disabled={disabled}
      placeholder={placeholder}
    />
  );
}
