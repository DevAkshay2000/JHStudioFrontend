/* eslint-disable @typescript-eslint/no-unsafe-function-type */
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
import getData from "@/api/getData.api";
import { TabTable } from "../TabTable";
import { footerDataInterface } from "@/components/Service-Sessions/types";
import Autocomplete from "../Combobox";
import { RiAddLine } from "react-icons/ri";
import { menuSchemaHandlerMap } from "@/mappings";
import { ModalForm } from "../ModalForm";
import { Dialog, DialogContent } from "../../dialog";
import PayloadModify from "../Utility/PayloadModify";
import toast from "react-hot-toast";
import postData from "@/api/postData.api";
import { useFetchDataContext } from "@/components/context/fetchTableDataContext";

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
  targetMenuId?: any;
  disabled?: boolean;
};

// JSON file schema
interface SampleSchema {
  menuId: number;
  buttonName?: string;
  sheetTitle?: string;
  sheetDescription?: string;
  fields: FieldSchema[];
}
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
  footerData?: footerDataInterface;
  setFooterData?: any;
  removeSelectedItems: Function;
  // onEditSubmit: any;

  editButtonLoader?: any;
  editModeData: any;
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
  removeSelectedItems,
  // onEditSubmit,
  // editButtonLoader,
  editModeData,
}: SideSheetProps): JSX.Element {
  // Zod validation schema based on field validations
  const [schema, setSchema] = useState<any>({});
  // const [handler, sethandler] = useState<Function>(() => {});
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
    // isRefresh,
    // setIsRefresh,
    selectedRecordId,
    // setSelectedRecordId,
    sheetOpen,
    setSheetOpen,
    resetFormData,
    // setResetFormData,
    footerData,
    setFooterData,
  } = useFetchDataContext();
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
  // Reset form entries after submission of data successfully
  useEffect(() => {
    reset();
  }, [reset, resetFormData]);
  //Setting up value in edit to each field
  useEffect(() => {
    const nameTypeMapping: any = {};
    formGenSchema?.fields?.forEach((element: any) => {
      nameTypeMapping[element.name] = element.type;
    });
    if (selectedRecordId) {
      Object.entries(editModeData).forEach(([key, value]: [string, any]) => {
        if (nameTypeMapping[key] === "select") {
          setValue(key, `${value?.id}`);
        } else if (nameTypeMapping[key] === "autoComplete") {
          setValue(key, `${value?.id}`);
          setNQuery(`${value?.name}`);
        } else if (nameTypeMapping[key] === "checkbox") {
          setValue(key, Boolean(value));
        } else {
          setValue(key, `${value}`);
        }
      });
    }
  }, [selectedRecordId, editModeData, setValue, formGenSchema?.fields]);
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
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            style={{
              fontFamily: "'Playfair Display', serif",
              backgroundColor: "var(--color-primary)",
              color: "white",
            }}
          >
            <FaPlus /> Add New {formGenSchema?.buttonName}
          </Button>
        </SheetTrigger>
        <SheetContent
          style={{ maxWidth: maxWidth ? `${maxWidth}vw` : "40vw" }}
          className="max-h-screen overflow-y-scroll"
        >
          <SheetHeader>
            <div className="d-flex row">
              <div className="grid col-span-2 w-1/4 float-right mr-5">
                <Button
                  form="hook-form"
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full font-serif"
                >
                  {buttonLoader ? "Submitting.." : "Submit"}
                </Button>
              </div>
              <div className="w-1/3">
                <SheetTitle style={{ fontFamily: "'Playfair Display', serif" }}>
                  {formGenSchema?.sheetTitle}
                </SheetTitle>
                <SheetDescription>
                  {formGenSchema?.sheetDescription}
                </SheetDescription>
              </div>
            </div>
          </SheetHeader>
          <div className="grid grid-cols-2 gap-4 mt-4 mb-4">
            <form
              id="hook-form"
              onSubmit={handleSubmit(onSubmit)}
              className="col-span-2 grid grid-cols-3 gap-4 mt-5"
            >
              {formGenSchema.fields.map((field: FieldSchema) => (
                <div className="grid grid-rows-1 gap-2" key={field?.name}>
                  {field.type !== "checkbox" ? (
                    <Label
                      htmlFor={field?.name}
                      className="text-left font-serif"
                    >
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
                            className="p-2 border border-gray-300 rounded w-full font-serif h-9 text-sm"
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
                            <Label
                              htmlFor={field.name}
                              className="text-left font-serif"
                            >
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
                          <div className="flex items-center space-x-2 h-8.5">
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
                              className="p-1.5 text-white rounded focus:ring-2 focus:ring-blue-300"
                              style={{
                                backgroundColor: "var(--color-primary)",
                              }}
                            >
                              <RiAddLine style={{ color: "white " }} />
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
          <hr />
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
