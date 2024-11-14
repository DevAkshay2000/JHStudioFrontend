/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select";

interface SelectFieldProps {
  placeholder?: string;
  label?: string;
  options: { id: number; value: string | number }[];
}
const SelectField = ({ placeholder, label, options }: SelectFieldProps) => {
  return (
    <div>
      <Select>
        <SelectTrigger className="w-[350px]">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>{label}</SelectLabel>

            {options?.map((e: any, index: number) => (
              <SelectItem key={index} value={e?.id || e}>
                {e?.value || e}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectField;
