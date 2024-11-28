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
import PayloadModify from "@/components/ui/sharedComponents/Utility/PayloadModify";
import updateData from "@/api/updateData.api";
import { useFetchDataContext } from "@/components/context/fetchTableDataContext";
import getDataById from "@/api/getDataById.api";

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
  const [dataEditModeData, setEditModaData] = useState([]);
  //Column  const [dataEditModeData, setEditModaData] = useState([]);
  const [editButtonLoader, setEditButtonLoader] = useState<boolean>(false);
console.log(editButtonLoader)
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
      accessorKey: "txnDate",

      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Transaction Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
    },
    {
      accessorKey: "customer",
      accessorFn: (row: any) => row.customer.name,
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
         Customer
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
    },
    {
      accessorKey: "artist",
      accessorFn: (row: any) => row.user.name,
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Artist
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
                onClick={() => handleEditClick(Number(records.id))}
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
  const {
    isRefresh,
    setIsRefresh,
    selectedRecordId,
    setSelectedRecordId,
    sheetOpen,
    setSheetOpen,
    resetFormData,
    setResetFormData,
    setFooterData,
  } = useFetchDataContext();
  //API for table data
  const fetchTableData = async () => {
    try {
      setLoading(true);
      let response: any = await getData("/sale-headers", {
        relations: [
          {
            name: "customer",
            fields: {
              name: true,
              id: true,
            },
          },
          {
            name: "user",
            fields: {
              name: true,
              id: true,
            },
          },
        ],
      });
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
      console.log(response);
      setTableData(response.data);
      setLoading(false);
    } catch (err: any) {
      setLoading(false);
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTableData();
  }, [isRefresh]);

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
        }, 1000);
      } catch (err: any) {
        if (err) {
          toast.error("Failed to delete record!");
        }
      }
    }
  };

  const handleEditClick = (recordId: number) => {
    if (recordId) {
      setSelectedRecordId(recordId);
      let response: any;
      const fetchEdiData = async () => {
        const apiFilter = {
          relations: [
            {
              name: "paymentType",
            },
            {
              name: "customer",
            },
          ],
        };
        response = await getDataById(
          dynamicFormSchema.postUrl,
          recordId,
          apiFilter
        );
        console.log(response.data);
        setFooterData({
          subtotal: response.data.subTotal,
          totalTax: response.data.totalTax,
          grandTotal: response.data.grandTotal,
          totalDiscount: response.data.totalDiscount,
        });
        setEditModaData(response.data);
      };
      fetchEdiData();
      setSheetOpen(!sheetOpen);
    }
  };

  const handleEditSubmit = async (data: any) => {
    // Following utility will modify payload for isInactive and dropdown ids and add created and modifiedDate
    const payload = PayloadModify(dynamicFormSchema, data);
    console.log(payload);
    try {
      setEditButtonLoader(true);
      const response = await updateData(
        dynamicFormSchema.postUrl,
        payload,
        selectedRecordId
      );
      if (response) {
        setSheetOpen(!sheetOpen);
        setEditButtonLoader(false);
        setIsRefresh(!isRefresh);
        setResetFormData(!resetFormData);
        toast.success("Record updated successfully..!");
      }
    } catch (err: any) {
      setEditButtonLoader(false);
      toast.error("Error while updating record..!");
      console.log(err);
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
    dataEditModeData,
    handleEditSubmit,
  };
};

export default useServiceSessionsTable;
