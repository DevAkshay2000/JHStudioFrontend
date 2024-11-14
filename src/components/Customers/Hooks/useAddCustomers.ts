/* eslint-disable @typescript-eslint/no-explicit-any */
const useAddCustomers = () => {
  const handleCustomerAddSubmit = (data?: any) => {
    console.log("Submitted Data add case", data);
  };

  return handleCustomerAddSubmit;
};
export default useAddCustomers;
