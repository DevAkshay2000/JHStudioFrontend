/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// React hook forms
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Switch } from "../../switch";
import { useEffect, useState } from "react";
import getData from "@/api/getData.api";
import Autocomplete from "../Combobox";

// Form Fields schema
type FieldSchema = {
  label: string;
  name: string;
  type: string;
  required: boolean;
  error: string;
  validations: { min?: number; max?: number; message?: string }[];
  defaultValue?: boolean;
  optionsAPI?: string;
};

// JSON file schema
type SampleSchema = {
  menuId: number;
  buttonName?: string;
  sheetTitle?: string;
  sheetDescription?: string;
  fields: FieldSchema[];
};
interface SideSheetProps {
  formGenSchema: SampleSchema;
  onSubmit: (data: any) => void;
  buttonLoader?: boolean;
  maxWidth?: number;
}

export function ModalForm({
  formGenSchema,
  onSubmit,
  buttonLoader,
}: SideSheetProps): JSX.Element {
  // Zod validation schema based on field validations
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

  // Options for dropdown field
  const [dropdownOptions, setDropdownOptions] = useState<Record<string, any[]>>(
    {}
  );
  useEffect(() => {
    // Function to fetch dropdown options from the API
    const fetchOptions = async (fieldName: string, apiUrl: string) => {
      const apiFilter = {
        fields: {
          id: true,
          name: true,
          stateId: true,
        },
      };
      try {
        const response = await getData(apiUrl, apiFilter);
        setDropdownOptions((prev: any) => ({
          ...prev,
          [fieldName]: response.data,
        }));
      } catch (error) {
        console.error("Failed to fetch options:", error);
      }
    };

    // Loop through form fields to load options as needed
    formGenSchema.fields.forEach((field: any) => {
      if (field.type === "select" && !field.options) {
        // Pass the field's name and API endpoint to fetchOptions
        fetchOptions(field.name, field.optionsAPI);
      }
    });
  }, [formGenSchema.fields]);

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="font-serif"> Add New {formGenSchema?.buttonName}</div>
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
              <Label htmlFor={field?.name} className="text-left font-serif">
                {field.label}
              </Label>
            ) : null}

            <Controller
              name={field.name}
              control={control}
              defaultValue={
                field.type === "checkbox" ? field.defaultValue || false : ""
              }
              render={({ field: controllerField }) => {
                if (field.type === "select") {
                  return (
                    <select
                      {...controllerField}
                      className="p-2 border border-gray-300 rounded w-full font-serif h-9.5 text-sm"
                    >
                      <option value="">-- Select an option --</option>
                      {(dropdownOptions[field.name] || []).map((option) => (
                        <option key={option.id} value={option.id}>
                          {option.name}
                        </option>
                      ))}
                    </select>
                  );
                } else if (field.type === "checkbox") {
                  return (
                    <div className="flex items-center space-x-2">
                      <Label htmlFor={field.name} className="text-left font-serif">
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
                } else if (field.type === "date") {
                  return <Input type="date" {...controllerField} />;
                } else if (field.type === "autoComplete") {
                  return (
                    <Autocomplete
                      api={`${field.optionsAPI}`}
                      onChange={(e: number) => {
                        controllerField.onChange(e);
                      }}
                      className=""
                      nquery=""
                    />
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
          <Button type="submit" disabled={isSubmitting} className="w-full font-serif">
            {buttonLoader ? "Submitting.." : "Submit"}
          </Button>
        </div>
      </form>
    </div>
  );
}
