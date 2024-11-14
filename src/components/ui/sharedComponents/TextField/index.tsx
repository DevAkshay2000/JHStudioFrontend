import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface TextFieldProps {
  label?: string;
  type?: string;
  placeholder?: string;
  name: string;
}

const TextField = ({ label, type, placeholder, name }: TextFieldProps) => {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor={name}>{label}</Label>
      <Input type={type} name={name} id={name} placeholder={placeholder} />
    </div>
  );
};

export default TextField;
