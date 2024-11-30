/* eslint-disable @typescript-eslint/no-explicit-any */
import { DataTable } from "../ui/sharedComponents/DataTable";
import { HistorySideSheet } from "@/components/ui/sharedComponents/HistorySideSheet";
// import hook
import useCustomerHistoryTable from "@/components/customer-history/hooks/useCustomerHistoryTable";
import ReactLoader from "../../components/ui/sharedComponents/ReactLoader";
// Import toaster for success or error msg popup
import { Toaster } from "react-hot-toast";
// Importing context
import { FetchDataProvider } from "../context/fetchTableDataContext";

export default function Customers(): JSX.Element {
  return (
    <FetchDataProvider>
      <CustomerHistoryTable />
    </FetchDataProvider>
  );
}

function CustomerHistoryTable(): JSX.Element {
  // Table hook
  const { columns, data, dynamicFormSchema, loading, customerHistoryData } =
    useCustomerHistoryTable();

  return (
    <>
      <div className="container mx-auto py-10 flex flex-col">
        <Toaster position="top-center" reverseOrder={false} />
        <div className="grid gap-4 grid-cols-2 px-2">
          <ReactLoader loading={loading} />
          <div>
            <p
              className="mb-5 text-lg font-normal uppercase"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Customer History
            </p>
          </div>
          {/* Div for side short form */}
          <div className="mb-5 flex justify-end">
            <HistorySideSheet
              formGenSchema={dynamicFormSchema}
              customerHistoryData={customerHistoryData as any}
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
