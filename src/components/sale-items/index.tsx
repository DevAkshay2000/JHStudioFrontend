/* eslint-disable @typescript-eslint/no-explicit-any */
import { DataTable } from "../ui/sharedComponents/DataTable";
// import hook

import ReactLoader from "../../components/ui/sharedComponents/ReactLoader";
import AlertBox from "../ui/sharedComponents/AlertBox";
// Import toaster for success or error msg popup
import { Toaster } from "react-hot-toast";
import useSaleItemsTable from "@/components/sale-items/hooks/useSaleItemsTable";
import useAddEditSaleItems from "@/components/sale-items/hooks/useMakeSale";
import { SideSheetTransaction } from "../ui/sharedComponents/SlideSheetTransaction";
import tabSchema from "./schema/tabSchema.json";

import { FetchDataProvider } from "../context/fetchTableDataContext";
export default function ServiceSessions(): JSX.Element {
  return (
    <FetchDataProvider>
      <SaleItemTable />
    </FetchDataProvider>
  );
}
function SaleItemTable() {
  const {
    columns,
    data,
    dynamicFormSchema,
    loading,
    showAlert,
    setShowAlert,
    handleAgreeDelete,
    dataEditModeData,
  } = useSaleItemsTable();
  const {
    handleSubmit,
    buttonLoader,
    handlFormFieldStateUpdate,
    searchBoxSchema,
    searchBoxData,
    selectNewItem,
    selectedData,
    removeSelectedItems,
  } = useAddEditSaleItems();

  return (
    <>
      {/* <Autocomplete api="/customers"/> */}
      <div className="container mx-auto py-10 flex flex-col">
        <Toaster position="top-center" reverseOrder={false} />
        <div className="grid gap-4 grid-cols-2 px-2">
          <ReactLoader loading={loading} />
          <div>
            <p
              className="mb-5 text-lg font-normal uppercase"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Saled Items
            </p>
          </div>
          {/* Div for side short form */}
          <div className="mb-5 flex justify-end">
            <SideSheetTransaction
              formGenSchema={dynamicFormSchema}
              onSubmit={handleSubmit}
              buttonLoader={buttonLoader}
              maxWidth={70}
              tabSchema={tabSchema}
              handlFormFieldStateUpdate={handlFormFieldStateUpdate}
              searchBoxSchema={searchBoxSchema}
              searchBoxData={searchBoxData}
              selectNewItem={selectNewItem}
              selectedData={selectedData}
              removeSelectedItems={removeSelectedItems}
              editModeData={dataEditModeData as any}
              isSaleItem={true}
            />
          </div>
        </div>
        <hr />
        {/* Div for data table */}
        <div className="row mt-2 pr-4">
          <DataTable columns={columns} data={data as any} />
        </div>

        {/* Alert popup for delet action */}
        {showAlert && (
          <AlertBox
            title="Delete Alert!!"
            description="Are you sure to delete this record?"
            onAgreeFn={handleAgreeDelete}
            open={showAlert}
            setOpen={setShowAlert}
          />
        )}
      </div>
    </>
  );
}