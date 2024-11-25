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
import { useEffect, useState } from "react";
import getData from "@/API/getData.api";
import { TabTable } from "../TabTable";
import { footerDataInterface } from "@/components/Service-Sessions/types";
import Autocomplete from "../Combobox";
import { SquarePlusIcon } from "lucide-react";
import { menuSchemaHandlerMap } from "@/Mappings";
import { ModalForm } from "../ModalForm";
import { Dialog, DialogContent } from "../../dialog";
import PayloadModify from "../Utility/PayloadModify";
import toast from "react-hot-toast";
import postData from "@/api/postData.api";

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
  targetMenuId: number;
  disabled: boolean;
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
  onSubmit: () => void;
  buttonLoader: boolean;
  maxWidth?: number;
  tabSchema: any;
  handlFormFieldStateUpdate: Function;
  searchBoxSchema: object;
  searchBoxData: any[];
  selectNewItem: Function;
  selectedData: any[];
  footerData: footerDataInterface;
  setFooterData: any;
  removeSelectedItems: Function;
}

export function SideSheetTransaction({
  formGenSchema,
  onSubmit,
  buttonLoader,
  maxWidth,
  handlFormFieldStateUpdate,
  searchBoxSchema,
  searchBoxData,
  selectNewItem,
  selectedData,
  footerData,
  setFooterData,
  removeSelectedItems,
}: SideSheetProps): JSX.Element {
  // Zod validation schema based on field validations
  const [schema, setSchema] = useState<any>({});
  const [handler, sethandler] = useState<Function>(() => {});
  const [modalOpen, setModalOpen] = useState<any>(false);
  const [nquery, setNQuery] = useState(""); // Search input query
  const [modalKey, setModalKey] = useState("");
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
    reset,
    setValue,
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
console.log(errors)
  const modalFormSubmitHandler = async (values: any) => {
    const payload = PayloadModify(schema, values);

    try {
      const response = await postData(schema.postUrl, payload);
      setNQuery(response.data.name);
      setValue(modalKey, response.data.id);
      if (response) {
        toast.success("Record added successfully..!");
        setModalOpen(!modalOpen);
      }
    } catch (err: any) {
      if (err) {
        toast.error("Error while saving record, Please try again!");
      }
    }
  };
  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">
            <FaPlus /> Add New {formGenSchema?.buttonName}
          </Button>
        </SheetTrigger>
        <SheetContent
          style={{ maxWidth: maxWidth ? `${maxWidth}vw` : "40vw" }}
          className="max-h-screen overflow-y-scroll"
        >
          <SheetHeader>
            <div className="d-flex row">
              <div className="grid col-span-2 w-1/4 float-right m-3">
                <Button
                  form="hook-form"
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full"
                >
                  {buttonLoader ? "Submitting.." : "Submit"}
                </Button>
              </div>
              <div className="w-1/3">
                <SheetTitle>{formGenSchema?.sheetTitle}</SheetTitle>
                <SheetDescription>
                  {formGenSchema?.sheetDescription}
                </SheetDescription>
              </div>
            </div>
          </SheetHeader>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <form
              id="hook-form"
              onSubmit={handleSubmit(onSubmit)}
              className="col-span-2 grid grid-cols-3 gap-4 mt-5"
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
                    defaultValue={
                      field.type === "checkbox"
                        ? field.defaultValue || false
                        : ""
                    }
                    render={({ field: controllerField }) => {
                      if (field.type === "select") {
                        return (
                          <select
                            {...controllerField}
                            className="p-2 border border-gray-300 rounded w-full"
                          >
                            <option value="">-- Select an option --</option>
                            {(dropdownOptions[field.name] || []).map(
                              (option) => (
                                <option key={option.id} value={option.id}>
                                  {option.name}
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
                      } else if (field.type === "date") {
                        return <Input type="date" {...controllerField} />;
                      } else if (field.type === "autoComplete") {
                        return (
                          <div className="flex items-center space-x-2">
                            <Autocomplete
                              api={`${field.optionsAPI}`}
                              onChange={(e: number) => {
                                controllerField.onChange(e);
                              }}
                              className="mt-0"
                              nquery={nquery}
                            />
                            <button
                              onClick={() => {
                                setModalOpen(true);
                                setSchema(
                                  menuSchemaHandlerMap[field.targetMenuId]
                                    .schema
                                );
                                setModalKey(field.name);
                              }}
                              type="button"
                              className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:ring-2 focus:ring-blue-300"
                            >
                              <SquarePlusIcon />
                            </button>
                          </div>
                        );
                      } else {
                        return (
                          <Input
                            className="col-span-3"
                            {...controllerField}
                            type={field.type}
                            disabled={field.disabled}
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
            </form>
          </div>
          {/* add tab here */}
          <TabTable
            items={selectedData}
            handlFormFieldStateUpdate={handlFormFieldStateUpdate}
            searchBoxSchema={searchBoxSchema}
            searchBoxData={searchBoxData}
            selectNewItem={selectNewItem}
            footerData={footerData}
            setFooterData={setFooterData}
            removeSelectedItems={removeSelectedItems}
          />
          <Dialog
            open={modalOpen}
            onOpenChange={() => {
              setModalOpen(false);
            }}
          >
            <DialogContent className="sm:max-w-[425px]">
              <ModalForm
                formGenSchema={schema}
                onSubmit={modalFormSubmitHandler}
              />
            </DialogContent>
          </Dialog>
        </SheetContent>
      </Sheet>
    </div>
  );
}
