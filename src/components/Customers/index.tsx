/* eslint-disable @typescript-eslint/no-explicit-any */
import { DataTable } from "../ui/sharedComponents/DataTable";
import { SideSheet } from "../ui/sharedComponents/SideSheet";
// import hook
import useCustomerTable from "./Hooks/useCustomerTable";
import useAddCustomers from "./Hooks/useAddCustomers";
export default function Customers() {
  const { columns, data, dynamicFormSchema } = useCustomerTable();
  const handleCustomerAddSubmit = useAddCustomers();

  return (
    <>
      <div className="container mx-auto py-10 flex flex-col">
        <div className="grid gap-4 grid-cols-2 px-2">
          <div>
            <p className="mb-5 text-lg font-bold uppercase">Our Customers</p>
          </div>
          {/* Div for side short form */}
          <div className="mb-5 flex justify-end">
            <SideSheet
              formGenSchema={dynamicFormSchema}
              onSubmit={handleCustomerAddSubmit}
            />
          </div>
        </div>
        <hr />
        {/* Div for data table */}
        <div className="row mt-2 pr-4">
          <DataTable columns={columns} data={data as any} />
        </div>
      </div>
    </>
  );
}
