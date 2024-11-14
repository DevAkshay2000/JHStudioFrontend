/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FaPlus } from "react-icons/fa6";
// React hook forms
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Switch } from "../../switch";

//Form Fields schema
type FieldSchema = {
  label: string;
  name: string;
  type: string;
  required: boolean;
  error: string;
  validations: { min?: number; max?: number; message?: string }[];
};

//JSON file schema
type SampleSchema = {
  menuId: number;
  buttonName?: string;
  sheetTitle?: string;
  sheetDescription?: string;
  fields: FieldSchema[];
};
interface SideSheetProps {
  formGenSchema: SampleSchema;
  onSubmit: () => void;
}

export function SideSheet({ formGenSchema, onSubmit }: SideSheetProps): JSX.Element {

  //Zod validation schema based on field validations
  const validationSchema = z.object(
    formGenSchema.fields.reduce((acc, field) => {
      let validator: any;

      if (field.type === "checkbox") {
        validator = z.boolean();
        if (field.required) {
          validator = validator.refine((val: any) => val === true, {
            message: field.error || "This field is required",
          });
        }
      } else {
        validator = z.string();
        if (field?.required) {
          validator = validator?.min(1, field.error);
        }
        field.validations.forEach((rule) => {
          if (rule.min !== undefined) {
            validator = validator?.min(rule.min, rule.message);
          }
          if (rule.max !== undefined) {
            validator = validator?.max(rule.max, rule.message);
          }
        });
      }

      acc[field.name] = validator;
      return acc;
    }, {} as Record<string, z.ZodType<any>>)
  );

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(validationSchema),
  });


  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">
          <FaPlus /> Add New {formGenSchema?.buttonName}
        </Button>
      </SheetTrigger>
      <SheetContent style={{ maxWidth: "40vw" }}>
        <SheetHeader>
          <SheetTitle>{formGenSchema?.sheetTitle}</SheetTitle>
          <SheetDescription>{formGenSchema?.sheetDescription}</SheetDescription>
        </SheetHeader>
        <div className="grid grid-cols-2 gap-4">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="col-span-2 grid grid-cols-2 gap-4 mt-5"
          >
            {formGenSchema.fields.map((field) => (
              <div
                className="grid grid-rows-1 gap-2"
                key={field?.name}
                style={{ marginBottom: "1rem" }}
              >
                {field.type !== "checkbox" ? (
                  <Label htmlFor={field?.name} className="text-left">
                    {field.label}
                  </Label>
                ) : null}

                <Controller
                  name={field.name}
                  control={control}
                  defaultValue={field?.type === "checkbox" ? false : ""}
                  render={({ field: controllerField }) => {
                    if (field.type === "select" && "options" in field) {
                      return (
                        <select
                          {...controllerField}
                          className="col-span-3 p-2 border border-gray-300 rounded"
                        >
                          <option value="">-- Select an option --</option>
                          {Array.isArray(field?.options) &&
                            field?.options?.map(
                              (option: { label: string; value: string }) => (
                                <option key={option?.value} value={option?.value}>
                                  {option?.label}
                                </option>
                              )
                            )}
                        </select>
                      );
                    } else if (field.type === "checkbox") {
                      return (
                        <div className="flex items-center space-x-2">
                          <Label htmlFor={field.name} className="text-left">
                            {field.label}
                          </Label>
                          <Switch
                            checked={!!controllerField?.value}
                            onCheckedChange={(checked) =>
                              controllerField.onChange(checked)
                            }
                          />
                        </div>
                      );
                    } else {
                      return (
                        <Input
                          className="col-span-3"
                          {...controllerField}
                          type={field.type}
                        />
                      );
                    }
                  }}
                />
                {errors[field.name] && (
                  <p style={{ color: "orangered", fontSize: "13px" }}>
                    {errors[field.name]?.message?.toString()}
                  </p>
                )}
              </div>
            ))}
            <div className="grid col-span-2 w-full">
              <Button type="submit" disabled={isSubmitting} className="w-full">
                {isSubmitting ? "Submitting..." : "Submit"}
              </Button>
            </div>
          </form>
        </div>
      </SheetContent>
    </Sheet>
  );
}
