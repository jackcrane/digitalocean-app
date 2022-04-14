import type { Meta } from "./General";

interface BillingHistoryItem {
  description: string;
  amount: number;
  invoice_id?: string;
  invoice_uuid?: string;
  recipt_id?: string;
  date: Date;
  type:
    | "ACHFailure"
    | "Adjustment"
    | "AttemptFailed"
    | "Chargeback"
    | "Credit"
    | "CreditExpiration"
    | "Invoice"
    | "Payment"
    | "Refund"
    | "Reversal";
}

interface BillingHistory {
  billing_history: BillingHistoryItem[];
  links: Object;
  meta: Meta;
}

export { BillingHistory };
