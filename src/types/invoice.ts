export type InvoiceStatus = 'unpaid' | 'paid' | 'draft';

export interface InvoiceItem {
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface Invoice {
  id?: string;
  number: string;
  date: string; // YYYY-MM-DD
  dueDate: string; // YYYY-MM-DD
  customerName: string;
  customerEmail?: string;
  items: InvoiceItem[];
  subtotal: number;
  vat: number;
  total: number;
  status: InvoiceStatus;
}