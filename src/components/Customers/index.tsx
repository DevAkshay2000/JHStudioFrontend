/* eslint-disable @typescript-eslint/no-explicit-any */
import { columns } from "./columns";
import { DataTable } from "../ui/sharedComponents/DataTable";
import { SideSheet } from "../ui/sharedComponents/SideSheet";
//importing form schema in json format
import dynamicFormSchema from "./formSchema.json";

export default function Customers() {
  interface CustomerData {
    id: string;
    name: string;
    mobile: number;
    address: string;
    artist: string;
    services: string;
  }

  const data: CustomerData[] = [
    {
      id: "728ed52f",
      name: "Tanner Linsley",
      mobile: 9874563215,
      address: "London",
      artist: "John Doe",
      services: "Haircut",
    },
    {
      id: "728ed52f",
      name: "BTanner Linsley",
      mobile: 9874563215,
      address: "London",
      artist: "John Doe",
      services: "Haircut",
    },
    {
      id: "728ed52f",
      name: "ATanner Linsley",
      mobile: 9874563215,
      address: "London",
      artist: "John Doe",
      services: "Haircut",
    },
    {
      id: "728ed52f",
      name: "ZTanner Linsley",
      mobile: 9874563215,
      address: "London",
      artist: "John Doe",
      services: "Haircut",
    },
  ];

  return (
    <>
      <div className="container mx-auto py-10 flex flex-col">
        <div className="grid gap-4 grid-cols-2 px-2">
          <div>
            <p className="mb-5 text-lg font-bold uppercase">Our Customers</p>
          </div>
          <div className="mb-5 flex justify-end">
            <SideSheet
              buttonName={"Customer"}
              sheetTitle={"This is title"}
              sheetDescription={"this is description"}
              formGenSchema={dynamicFormSchema}
            />
          </div>
        </div>
        <hr />
        <div className="row mt-2 pr-4">
          <DataTable columns={columns as any} data={data} />
        </div>
      </div>
    </>
  );
}