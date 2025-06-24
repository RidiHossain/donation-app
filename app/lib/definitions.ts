// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.
export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type Customer = {
  id: string;
  name: string;
  email: string;
  image_url: string;
};

export type Invoice = {
  id: string;
  customer_id: string;
  amount: number;
  date: string;
  // In TypeScript, this is called a string union type.
  // It means that the "status" property can only be one of the two strings: 'pending' or 'paid'.
  status: 'pending' | 'paid';
};

export type Revenue = {
  month: string;
  revenue: number;
};

export type LatestInvoice = {
  id: string;
  name: string;
  image_url: string;
  email: string;
  amount: string;
};
export type LatestDonor = {
  id: string;
  name: string;
  email: string;
  image_url: string | null;
  donationAmount: string;
};

// The database returns a number for amount, but we later format it to a string with the formatCurrency function
export type LatestInvoiceRaw = Omit<LatestInvoice, 'amount'> & {
  amount: number;
};

export type InvoicesTable = {
  id: string;
  customer_id: string;
  name: string;
  email: string;
  image_url: string;
  date: string;
  amount: number;
  status: 'pending' | 'paid';
};
export type DonorsTable = {
  id: string;
  name: string;
  phone: string;
  address: string;
  email: string;
  image_url: string | null;
};
export type Donor = {
  id: string;
  name: string;
  email: string;
  image_url: string | null;
};

export type CampaignDonor = {
  id: string;
  name: string;
  email: string;
  amount: string; // already formatted
  image_url:string;
};

export type CampaignTable = {
  id: string;
  name: string;
  amount_to_raise: number;
  status: 'running' | 'completed' | 'paused' | 'in_future';
};
export type PledgeTable = {
  id: string;
  donor_name: string;
  campaign_name: string;
  amount: number;
  image_url: string;
  payment_type: 'onetime' | 'monthly';
  start_date: string; // or Date if you’re handling Date objects
  end_date: string;   // or Date if you’re handling Date objects
};


export type CustomersTableType = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: number;
  total_paid: number;
};

export type FormattedCustomersTable = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: string;
  total_paid: string;
};

export type CustomerField = {
  id: string;
  name: string;
};

export type InvoiceForm = {
  id: string;
  customer_id: string;
  amount: number;
  status: 'pending' | 'paid';
};