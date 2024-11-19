import postData from "@/api/postData.api";
import dynamicFormSchema from "../formSchema.json";
import { useState } from "react";
import PayloadModify from "@/components/ui/sharedComponents/Utility/PayloadModify";

/* eslint-disable @typescript-eslint/no-explicit-any */
const useAddEditCustomers = () => {
  const [buttonLoader, setButtonLoader] = useState<boolean>(false);
  const handleCustomerAddSubmit = async (data?: any) => {
    // Following utility will modify payload for isInactive and dropdown ids and add created and modifiedDate
    const payload = PayloadModify(dynamicFormSchema, data);
    try {
      setButtonLoader(true);
      const response = await postData(dynamicFormSchema.postUrl, payload);
      if (response) {
        setButtonLoader(false);
      }
    } catch (err: any) {
      setButtonLoader(false);
      console.log("Error in add customer", err);
    }
  };

  return { handleCustomerAddSubmit, buttonLoader };
};
export default useAddEditCustomers;
