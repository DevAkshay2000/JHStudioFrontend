/* eslint-disable @typescript-eslint/no-unsafe-function-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import SearchBoxTable from "../SearchBox";
import { Dialog, DialogContent } from "../../dialog";
import { FaSearchPlus } from "react-icons/fa";
import {
  footerDataInterface,
  SaleTabInterface,
} from "@/components/service-sessions/types";

// JSON file schema
type TabTableInterface = {
  items: any[];
  handlFormFieldStateUpdate: Function;
  searchBoxSchema: object;
  searchBoxData: any[];
  selectNewItem: Function;
  footerData: footerDataInterface;
  setFooterData: any;
  removeSelectedItems: Function;
};
export function TabTable({
  items,
  handlFormFieldStateUpdate,
  searchBoxSchema,
  searchBoxData,
  selectNewItem,
  footerData,
  setFooterData,
  removeSelectedItems,
}: TabTableInterface): JSX.Element {
  //********* */
  //1. toggle selected / checked items item
  const [selectedItems, setSelectedItems] = useState<any[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const toggleSelectItem = (id: number | string) => {
    setSelectedItems((prevSelected: any) =>
      prevSelected.includes(id)
        ? prevSelected.filter((itemId: any) => itemId !== id)
        : [...prevSelected, id]
    );
  };
  //********* */

  const [isOpen, setOpen] = useState<boolean>(false);

  const updateGrandTotal = (prev: SaleTabInterface, updateValue: number) => {
    setFooterData({
      ...footerData,
      // subtotal: Number(footerData.subtotal + prev.discountAmount - updateValue),
      totalDiscount:
        updateValue <= prev.amount
          ? Number(footerData.totalDiscount - prev.discountAmount + updateValue)
          : footerData.totalDiscount,
    });
  };
  return (
    <>
      <div className="pr-4 mb-4 mt-8 space-y-2">
        {/* Search Input and Icon */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={searchText}
              placeholder="Recently searched item"
              className="border rounded p-1 text-xs w-60 h-9 text-gray-700 focus:ring-blue-500 focus:border-blue-500"
            />
            <button
              onClick={() => {
                setOpen(true);
              }}
              style={{ backgroundColor: "var(--color-primary)" }}
              className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:ring-2 focus:ring-blue-300"
            >
              <FaSearchPlus size={18} />
            </button>
          </div>
          <span className="text-sm text-blue-700">
            Click on the search box to select item
          </span>
          {/* Remove Selected Items Button */}
          <button
            onClick={() => {
              removeSelectedItems(selectedItems);
            }}
            className="px-3 py-1 h-8 bg-red-500 text-white text-sm rounded hover:bg-red-600"
          >
            Remove Selected Item
          </button>
        </div>
      </div>

      <Dialog
        open={isOpen}
        onOpenChange={() => {
          setOpen(false);
        }}
      >
        <DialogContent className="sm:max-w-[425px]">
          <SearchBoxTable
            items={searchBoxData}
            itemsPerPage={1}
            onRowDoubleClick={selectNewItem}
            searchBoxSchema={searchBoxSchema}
            setSearchText={setSearchText}
            setOpen={setOpen}
            open={open}
          />
        </DialogContent>
      </Dialog>
      {/* Table */}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg border">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-3 text-left text-sm font-medium text-gray-500 text-slate-950 font-serif">
                Select
              </th>
              <th className="p-3 text-left text-sm font-medium text-gray-500 text-slate-950 font-serif">
                Item Name
              </th>
              <th className="p-3 text-left text-sm font-medium text-gray-500 text-slate-950 font-serif">
                Price (₹)
              </th>
              <th className="p-3 text-left text-sm font-medium text-gray-500 text-slate-950 font-serif">
                Tax %
              </th>
              <th className="p-3 text-left text-sm font-medium text-gray-500 text-slate-950 font-serif">
                Tax Amount
              </th>
              <th className="p-3 text-left text-sm font-medium text-gray-500 text-slate-950 font-serif">
                Discount Amount
              </th>
              <th className="p-3 text-left text-sm font-medium text-gray-500 text-slate-950 font-serif">
                Amount (₹)
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((item: SaleTabInterface) => (
              <Form
                toggleSelectItem={toggleSelectItem}
                item={item}
                handlFormFieldStateUpdate={handlFormFieldStateUpdate}
                checked={selectedItems.includes(item?.id)}
                updateGrandTotal={updateGrandTotal}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Summary Section */}
      <div className="mt-4 p-3 bg-white rounded-lg shadow-md text-right border font-serif">
        <p className="text-sm">
          Subtotal: <span className="font-medium">₹{footerData.subtotal}</span>
        </p>
        <p className="text-sm">
          Total Tax: <span className="font-medium">₹{footerData.totalTax}</span>
        </p>
        <p className="text-sm">
          Total Discount:{" "}
          <span className="font-medium">₹{footerData.totalDiscount}</span>
        </p>
        <p className="text-base font-semibold">
          Grand Total:{" "}
          <span>
            ₹
            {footerData.subtotal +
              footerData.totalTax -
              footerData.totalDiscount}
          </span>
        </p>
      </div>
    </>
  );
}
function Form({
  item,
  handlFormFieldStateUpdate,
  checked,
  toggleSelectItem,
  updateGrandTotal,
}: {
  item: SaleTabInterface;
  checked: boolean;
  toggleSelectItem: Function;
  handlFormFieldStateUpdate: Function;
  updateGrandTotal: Function;
}): JSX.Element {
  const handleDiscountChange = (
    prev: SaleTabInterface,
    curr: number,
    id: number | string
  ): void => {
    const _newData: SaleTabInterface = {
      ...prev,
      discountAmount:
        curr <= Number(prev.rate) + Number(prev.taxAmount) ? curr : 0,
      amount:
        curr <= Number(prev.rate) + Number(prev.taxAmount)
          ? Number(prev.rate) + Number(prev.taxAmount) - Number(curr)
          : Number(prev.rate) + Number(prev.taxAmount),
    };
    setRowData(_newData);
    if (curr <= prev.amount) {
      updateGrandTotal(prev, curr);
    } else {
      updateGrandTotal(prev, 0);
    }
    handlFormFieldStateUpdate(_newData, id);
  };
  const [rowData, setRowData] = useState(item);
  useEffect(() => {
    setRowData(item);
  }, [item]);
  return (
    <>
      <tr key={item.id} className="hover:bg-gray-50">
        <td className="p-2">
          <input
            type="checkbox"
            // checked={selectedItems.includes(item?.id)}
            checked={checked}
            onChange={() => toggleSelectItem(item?.id)}
            className="form-checkbox h-4 w-4 text-blue-500"
          />
        </td>
        <td className="p-2 text-sm">{rowData.service.name}</td>
        <td className="p-2">
          <input
            disabled={true}
            type="number"
            value={rowData.rate}
            // onChange={(e) =>
            //   updateItem(item.id, "price", parseFloat(e.target.value))
            // }
            className="border rounded p-1 w-full text-sm text-center focus:ring-blue-500 focus:border-blue-500"
          />
        </td>
        <td className="p-2">
          <input
            disabled={true}
            type="number"
            value={rowData.tax.percentage}
            // onChange={(e) =>
            //   updateItem(item.id, "taxRate", parseFloat(e.target.value))
            // }
            className="border rounded p-1 w-full text-sm text-center focus:ring-blue-500 focus:border-blue-500"
          />
        </td>
        <td className="p-2">
          <input
            disabled={true}
            type="number"
            value={rowData.taxAmount}
            // onChange={(e) =>
            //   updateItem(item.id, "taxRate", parseFloat(e.target.value))
            // }
            className="border rounded p-1 w-full text-sm text-center focus:ring-blue-500 focus:border-blue-500"
          />
        </td>
        <td className="p-2">
          <input
            type="text"
            value={rowData.discountAmount}
            onChange={(e) =>
              handleDiscountChange(item, parseFloat(e.target.value), item.id)
            }
            style={{ WebkitAppearance: "none", MozAppearance: "textfield" }}
            className="border rounded p-1 w-full text-sm text-center focus:ring-blue-500 focus:border-blue-500"
          />
        </td>
        {/* {0 ? (
          <td className="p-2">
            <input
              type="number"
              value={rowData.quantity}
              // onChange={(e) =>
              //   updateItem(item.id, "quantity", parseInt(e.target.value))
              // }
              className="border rounded p-1 w-full text-sm text-center focus:ring-blue-500 focus:border-blue-500"
            />
          </td>
        ) : (
          ""
        )} */}
        <td className="p-2 text-sm font-medium">{Number(rowData.amount)}</td>
      </tr>
    </>
  );
}
