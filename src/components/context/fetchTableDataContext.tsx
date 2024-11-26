/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, ReactNode, useContext, useState } from "react";
import { footerDataInterface } from "../service-sessions/types";

const FetchDataContext = createContext<any>(null);

const FetchDataProvider = ({ children }: { children: ReactNode }): any => {
  const [isRefresh, setIsRefresh] = useState<boolean>(false);
  const [selectedRecordId, setSelectedRecordId] = useState<number | null>(null);
  const [sheetOpen, setSheetOpen] = useState<boolean>(false);
  const [resetFormData, setResetFormData] = useState<boolean>(false);
  const [footerData, setFooterData] = useState<footerDataInterface>({
    subtotal: 0,
    totalTax: 0,
    grandTotal: 0,
    totalDiscount: 0,
  });
  return (
    <FetchDataContext.Provider
      value={{
        isRefresh,
        setIsRefresh,
        selectedRecordId,
        setSelectedRecordId,
        sheetOpen,
        setSheetOpen,
        resetFormData,
        setResetFormData,
        footerData,
        setFooterData
      }}
    >
      {children}
    </FetchDataContext.Provider>
  );
};

function useFetchDataContext() {
  const context = useContext(FetchDataContext);

  if (!context) {
    throw new Error(
      "useFetchDataContext should be used inside the FetchDataProvider."
    );
  }

  return context;
}

export { FetchDataProvider, useFetchDataContext };
