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

interface Balance {
  month_to_date_balance: number;
  account_balance: number;
  month_to_date_usage: number;
  generated_at: Date;
}

interface InvoiceItem {
  product: string;
  resource_uuid: string;
  resource_id: string;
  group_description: string;
  description: string;
  amount: number;
  duration: number;
  duration_unit: string;
  start_time: Date;
  end_time: Date;
  project_name: string;
}

// interface Invoice {
//   items: InvoiceItem[];
//   links: Object;
//   meta: Meta;
// }

interface BillingAddress {
  address_line1: string;
  address_line2?: string;
  address_line3?: string;
  city: string;
  region: string;
  postal_code: string;
  country_iso2_code: string;
  created_at: Date;
  updated_at: Date;
}

interface ProjectItem {
  amount: number;
  name: string;
  count: number;
}

interface ProductCharges {
  name: string;
  amount: number;
  items: ProjectItem[];
}

interface Overages {
  name: string;
  amount: number;
}

interface TaxItem {
  amount: string;
  name: string;
  count: string;
}

interface Taxes {
  name: string;
  amount: number;
  items: TaxItem[];
}

interface CreditsAndAdjustments {
  name: string;
  amount: number;
}

interface Invoice {
  invoice_uuid: string;
  billing_period: Date;
  issue_date: Date;
  invoice_generated_at: Date;
  amount: number;
  user_name: string;
  user_billing_address: BillingAddress;
  user_email: string;
  product_charges: ProductCharges;
  overages: Overages;
  taxes: Taxes;
  credits_and_adjustments: CreditsAndAdjustments;
}

export { BillingHistory, Balance, Invoice };
