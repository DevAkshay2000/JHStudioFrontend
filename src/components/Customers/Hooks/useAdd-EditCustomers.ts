/* eslint-disable @typescript-eslint/no-explicit-any */
import postData from "@/api/postData.api";
import dynamicFormSchema from "../formSchema.json";
import { useState } from "react";
import PayloadModify from "@/components/ui/sharedComponents/Utility/PayloadModify";
import toast from "react-hot-toast";
import { useFetchDataContext } from "../../context/fetchTableDataContext";

const useAddEditCustomers = () => {
  //Importing global state from context
  const { isRefresh, setIsRefresh } = useFetchDataContext();
  // state for button loadewr
  const [buttonLoader, setButtonLoader] = useState<boolean>(false);

  // On submit handler to saving new record
  const handleCustomerAddSubmit = async (data?: any) => {
    // Following utility will modify payload for isInactive and dropdown ids and add created and modifiedDate
    const payload = PayloadModify(dynamicFormSchema, data);
    try {
      setButtonLoader(true);
      const response = await postData(dynamicFormSchema.postUrl, payload);
      if (response) {
        setButtonLoader(false);
        setIsRefresh(!isRefresh);
        toast.success("Record added successfully..!");
      }
    } catch (err: any) {
      if (err) {
        setButtonLoader(false);
        toast.error("Error while saving record, Please try again!");
      }
    }
  };

  return { handleCustomerAddSubmit, buttonLoader };
};
export default useAddEditCustomers;
