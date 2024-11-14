import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
//importing form schema in json format
import dynamicFormSchema from "../formSchema.json";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Type defination for columns header
export type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
  name?: string;
  mobile?: string;
  address?: string;
  artist?: string;
  services?: string;
};

//interface for Column Data
interface CustomerData {
  id: string;
  name: string;
  mobile: number;
  address: string;
  artist: string;
  services: string;
}

const useCustomerTable = () => {
  //Column defination
  const columns: ColumnDef<Payment>[] = [
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
      accessorKey: "address",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Address
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
    },
    {
      accessorKey: "artist",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Artist Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
    },
    {
      accessorKey: "services",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Services
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const payment = row.original;

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
                onClick={() => navigator.clipboard.writeText(payment.id)}
              >
                View Record
              </DropdownMenuItem>
              <DropdownMenuItem>Delete Record</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  // Column data
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

  return { columns, data, dynamicFormSchema };
};

export default useCustomerTable;
