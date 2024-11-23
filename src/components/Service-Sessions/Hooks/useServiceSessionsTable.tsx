/* eslint-disable @typescript-eslint/no-explicit-any */
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
//importing form schema in json format
import dynamicFormSchema from "../schema/formSchema.json";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import getData from "@/api/getData.api";
import { useEffect, useState } from "react";
import deleteDataAPI from "@/api/deleteData.api";
import toast from "react-hot-toast";

// Type defination for columns header
export type ColumnHeaderType = {
  id: string;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
  name?: string;
  mobile?: string;
  sortBy?: string;
};

//interface for Column Data
interface CustomerData {
  id: string;
  name: string;
  mobile: number;
  birthDate: string;
  email: string;
  isInactive: number;
  createdDate: string;
  modifiedDate: string;
}

const useServiceSessionsTable = () => {
  const [tableData, setTableData] = useState<CustomerData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedDeleteId, setSelectedDeleteId] = useState<number | null>(null);
  const [showAlert, setShowAlert] = useState<boolean>(false);

  //Column defination
  const columns: ColumnDef<ColumnHeaderType>[] = [
    {
      accessorKey: "code",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Code
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
    },
    {
      accessorKey: "name",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Customer Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
    },
    {
      accessorKey: "birthdateUpdated",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date Of Birth
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
    },
    {
      accessorKey: "mobile",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Mobile Number
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
    },
    {
      accessorKey: "email",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email ID
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
    },
    {
      accessorKey: "isInactiveUpdated",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const records = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(records.id)}
              >
                Edit Record
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Button
                  onClick={() => handleDeleteClick(Number(records.id))}
                  style={{ background: "none", color: "red", border: "none" }}
                >
                  Delete Record
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  //API for table data
  const fetchTableData = async () => {
    try {
      setLoading(true);
      console.log("dsds",dynamicFormSchema.postUrl)
      let response: any = await getData("/sale-headers");
      // response = response?.data?.map((item: any) => {
      //   const originalDate = new Date(item.birthDate);
      //   const day = String(originalDate.getUTCDate()).padStart(2, "0");
      //   const month = String(originalDate.getUTCMonth() + 1).padStart(2, "0");
      //   const year = originalDate.getUTCFullYear();

      //   //Birthdate in DD/MM/YYYY format
      //   item.birthdateUpdated = `${day}/${month}/${year}`;
      //   //Status in Active/Not Active
      //   item.isInactiveUpdated =
      //     item.isInactive === 1 ? "Active" : "Not Active";
      //   return item;
      // });
      console.log(response)
      setTableData(response.data);
      setLoading(false);
    } catch (err: any) {
      setLoading(false);
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTableData();
  }, []);

  const handleDeleteClick = (id: number) => {
    setShowAlert(true);
    setSelectedDeleteId(id);
  };

  // Function to delete the record
  const handleAgreeDelete = async () => {
    if (selectedDeleteId) {
      try {
        await deleteDataAPI(dynamicFormSchema.postUrl, selectedDeleteId);
        toast.success("Record deleted successfully");
        setTimeout(() => {
          fetchTableData(); // Calling function after successfully deleting record for updated table data
        }, 2000);
      } catch (err: any) {
        if (err) {
          toast.error("Failed to delete record!");
        }
      }
    }
  };

  return {
    columns,
    data: tableData,
    dynamicFormSchema,
    loading,
    showAlert,
    setShowAlert,
    handleAgreeDelete,
  };
};

export default useServiceSessionsTable;
