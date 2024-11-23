/* eslint-disable @typescript-eslint/no-explicit-any */
import postData from "@/api/postData.api";
import dynamicFormSchema from "../schema/formSchema.json";
import { useEffect, useState } from "react";
import PayloadModify from "@/components/ui/sharedComponents/Utility/PayloadModify";
import toast from "react-hot-toast";
import getData from "@/api/getData.api";
import { date } from "zod";
import { footerDataInterface, SaleTabInterface } from "../types";

const useAddEditServiceSessions = () => {
  // state for button loadewr
  const [buttonLoader, setButtonLoader] = useState<boolean>(false);

  //**************Item details tab *********************************************
  const [selectedData, setSelectedData] = useState<SaleTabInterface[]>([]);
  const [footerData, setFooterData] = useState<footerDataInterface>({
    subtotal: 0,
    totalTax: 0,
    grandTotal: 0,
    totalDiscount: 0,
  });
  //state to store searchBox Data
  const [searchBoxData, setSearchBoxData] = useState<any[]>([]);
  const searchBoxSchema = {
    code: {
      name: "ID",
    },
    name: {
      name: "Name",
    },
    amount: {
      name: "Price",
    },
  };
  //empty tab object
  const emptyTabObj: SaleTabInterface = {
    id: 0,
    txnHeader: { id: 0 }, // SaleHeaders object reference (null initially)
    service: { id: 0, name: "" }, // Services object reference (null initially)
    tax: { id: 0, percentage: 0 }, // Taxes object reference (null initially)
    quantity: 0, // Default quantity
    rate: 0, // Default rate
    amount: 0, // Default amount
    discountAmount: 0, // Optional, set as null
    taxAmount: 0, // Optional, set as null
    createdDate: "", // Default string (should be populated on creation)
    modifiedDate: "", // Default string (should be populated on update)
  };
  useEffect(() => {
    //fetch your searchBoxData
    async function init() {
      const apiFilter = {
        relations: [
          {
            name: "tax",
          },
        ],
      };
      const response: any = await getData("/services", apiFilter);
      setSearchBoxData(response.data);
    }
    init();
  }, []);

  //1. handle data change from tabs
  const handlFormFieldStateUpdate = (row: any, index: number) => {
    const _selectedData = selectedData;
    const foundIndex = _selectedData.findIndex((data) => data.id === index);
    const _newData = { ..._selectedData[foundIndex], ...row };
    _selectedData[foundIndex] = _newData;
    setSelectedData(_selectedData);
  };

  //2. select new item from
  const selectNewItem = (row: any) => {
    const id = "new" + Date.now() + Math.random().toString(36).slice(2, 9);
    const _selectedData = selectedData;
    const newEntry: SaleTabInterface = {
      ...emptyTabObj,
      ...{
        id: id,
        service: { id: row.id, name: row.name },
        tax: {
          id: row.tax.id,
          percentage: row.tax.percentage,
        },
        quantity: 1,
        rate: row.amount,
        amount: row.amount + row.taxAmount,
        taxAmount: row.taxAmount,
      },
    };
    selectedData.push(newEntry);
    setSelectedData(_selectedData);

    setFooterData({
      ...footerData,
      grandTotal: footerData.grandTotal + newEntry.amount,
      subtotal: footerData.subtotal + newEntry.rate,
      totalTax: footerData.totalTax + newEntry.taxAmount,
    });
  };

  //3. delete selected items
  const removeSelectedItems = (selectedItems: any[]) => {
    const _selectedData = selectedData;
    const newData = _selectedData.filter((val) => {
      if (val.id && selectedItems.includes(val.id)) {
        setFooterData({
          ...footerData,
          subtotal: footerData.subtotal - val.rate,
          totalTax: footerData.totalTax - val.taxAmount,
          totalDiscount: Number(footerData.totalDiscount - val.discountAmount),
        });
      }
      return !selectedItems.includes(val.id);
    });

    setSelectedData(newData);
  };

  //**************Item details tab end ****************************************

  // On submit handler to saving new record
  const handleSubmit = async (data?: any) => {
    // Following utility will modify payload for isInactive and dropdown ids and add created and modifiedDate
    const payload = PayloadModify(dynamicFormSchema, data);
    console.log(data)
    // try {
    //   setButtonLoader(true);
    //   const response = await postData(dynamicFormSchema.postUrl, payload);
    //   if (response) {
    //     setButtonLoader(false);
    //     toast.success("Record added successfully..!");
    //   }
    // } catch (err: any) {
    //   if (err) {
    //     setButtonLoader(false);
    //     toast.error("Error while saving record, Please try again!");
    //   }
    // }
  };

  return {
    handleSubmit,
    buttonLoader,
    handlFormFieldStateUpdate,
    selectedData,
    setSelectedData,
    selectNewItem,
    removeSelectedItems,
    searchBoxData,
    searchBoxSchema,
    footerData,
    setFooterData,
  };
};
export default useAddEditServiceSessions;
