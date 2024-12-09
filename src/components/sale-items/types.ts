export interface SaleTabInterface {
  id: number | string; // Unique identifier
  txnHeader?: {
    id?: number;
  }; // Reference to the SaleHeaders entity
  service: {
    id: number;
    name: string;
  }; // Reference to the Services entity
  tax: {
    id: number;
    name:string,
    percentage: 0;
  }; // Reference to the Taxes entity
  quantity: number; // Quantity of items or services
  rate: number; // Rate per item or service
  amount: number; // Total amount
  discountAmount: number; // Discount amount, if applicable
  taxAmount: number; // Tax amount, if applicable
  createdDate: string; // Date of creation
  modifiedDate: string; // Date of last modification
}

export interface footerDataInterface {
  subtotal: number;
  totalTax: number;
  grandTotal: number;
  totalDiscount: number;
}
