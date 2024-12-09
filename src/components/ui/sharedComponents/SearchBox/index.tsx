/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";

interface SearchTableProps {
  items: any[];
  itemsPerPage: number;
  onRowDoubleClick: Function;
  searchBoxSchema: object;
  setSearchText: any;
  setOpen: any;
  open: any;
}

const SearchBoxTable: React.FC<SearchTableProps> = ({
  items,
  itemsPerPage,
  onRowDoubleClick,
  searchBoxSchema,
  setSearchText,
  setOpen,
  open,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    const filtered =
      items &&
      items?.filter((item) =>
        item.name.toLowerCase()?.includes(searchQuery.toLowerCase())
      );
    setFilteredItems(filtered);
    setCurrentPage(1); // Reset to first page on new search
  }, [searchQuery, items]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredItems?.slice(
    startIndex,
    startIndex + itemsPerPage
  );
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-lg">
      {/* Search Input */}
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search items..."
        className="border border-gray-300 rounded p-2 w-full text-sm mb-4"
      />

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white text-sm border border-gray-200">
          <thead className="bg-gray-200">
            <tr>
              {Object.values(searchBoxSchema).map((key: any, index1: any) => {
                return (
                  <th key={index1} className="p-3 text-left">
                    {key.name}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {currentItems.length > 0 ? (
              currentItems.map((item: any) => (
                <tr
                  key={item.id}
                  className="border-t cursor-pointer hover:bg-gray-100"
                  onDoubleClick={() => {
                    onRowDoubleClick(item),
                      setSearchText(item.name),
                      setOpen(!open);
                  }}
                >
                  {Object.keys(searchBoxSchema).map((key: any, index2: any) => {
                    return (
                      <td key={index2} className="p-3">
                        {item[key]}
                      </td>
                    );
                  })}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="p-3 text-center text-gray-500">
                  No results found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-2 py-1 text-sm rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <span className="text-xs text-gray-600">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-2 py-1 text-sm rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchBoxTable;
