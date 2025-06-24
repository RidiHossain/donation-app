import postgres from 'postgres';
import {
  CustomerField,
  CustomersTableType,
  InvoiceForm,
  InvoicesTable,
  LatestInvoiceRaw,
  Revenue,
  DonorsTable,
  CampaignTable,
  PledgeTable,
  CampaignDonor, 
  Donor
} from './definitions';
import { formatCurrency } from './utils';
import { campaigns } from './placeholder-data';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export type DonorWithDuePayment = {
  donor_id: string;
  name: string;
  phone: string;
  address: string;
};


export async function fetchCampaignSpecificDonors(
  campaignName: string
): Promise<CampaignDonor[]> {
  try {
    const data = await sql<{
      id: string;
      name: string;
      email: string;
      amount: number;
      image_url:string
    }[]>`
      SELECT donors.id, donors.name, donors.email, pledges.amount, donors.image_url
      FROM pledges
      JOIN donors ON pledges.donor_id = donors.id
      JOIN campaigns ON pledges.campaign_id = campaigns.id
      WHERE LOWER(TRIM(campaigns.name)) = LOWER(TRIM(${campaignName}))
    `;

    const formatted = data.map((donor) => ({
      id: donor.id,
      name: donor.name,
      email: donor.email,
      amount: formatCurrency(donor.amount),
      image_url: donor.image_url
    }));

    return formatted;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch donors for the campaign.');
  }
}
export async function fetchDonorsWithMostRecentDue() {
  try {
    const data = await sql<DonorWithDuePayment[]>`
      SELECT d.id AS donor_id, d.name, d.phone, d.address
      FROM donors d;
    `;

    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch donors with due payments.');
  }
}

export async function fetchRevenue() {
  try {
    // Artificially delay a response for demo purposes.
    // Don't do this in production :)

    // console.log('Fetching revenue data...');
    // await new Promise((resolve) => setTimeout(resolve, 3000));

    const data = await sql<Revenue[]>`SELECT * FROM revenue`;

    // console.log('Data fetch completed after 3 seconds.');

    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}


export async function fetchLatestDonors() {
  try {
    const data = await sql<Donor[]>`
      SELECT id, name, email, image_url
      FROM donors
      ORDER BY name DESC
      LIMIT 5
    `;

    const donorsWithMock = data.map((donor) => ({
      ...donor,
      donationAmount: formatCurrency(Math.floor(Math.random() * 500) + 50), // $50–$550
    }));

    return donorsWithMock;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch latest donors.');
  }
}

export async function fetchLatestInvoices() {
  try {
    const data = await sql<LatestInvoiceRaw[]>`
      SELECT invoices.amount, customers.name, customers.image_url, customers.email, invoices.id
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      ORDER BY invoices.date DESC
      LIMIT 5`;

    const latestInvoices = data.map((invoice) => ({
      ...invoice,
      amount: formatCurrency(invoice.amount),
    }));
    return latestInvoices;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest invoices.');
  }
}

export async function fetchCardData() {
  try {
    // You can probably combine these into a single SQL query
    // However, we are intentionally splitting them to demonstrate
    // how to initialize multiple queries in parallel with JS.
    const invoiceCountPromise = sql`SELECT COUNT(*) FROM invoices`;
    const customerCountPromise = sql`SELECT COUNT(*) FROM customers`;
    const invoiceStatusPromise = sql`SELECT
         SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) AS "paid",
         SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) AS "pending"
         FROM invoices`;

    const data = await Promise.all([
      invoiceCountPromise,
      customerCountPromise,
      invoiceStatusPromise,
    ]);

    const numberOfInvoices = Number(data[0][0].count ?? '0');
    const numberOfCustomers = Number(data[1][0].count ?? '0');
    const totalPaidInvoices = formatCurrency(data[2][0].paid ?? '0');
    const totalPendingInvoices = formatCurrency(data[2][0].pending ?? '0');

    return {
      numberOfCustomers,
      numberOfInvoices,
      totalPaidInvoices,
      totalPendingInvoices,
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch card data.');
  }
}
export async function fetchCampaignSummary(campaignName: string) {
  try {
    const result = await sql<{
      amount_to_raise: number;
      total_pledged: number;
      donor_count: number;
    }[]>`
      SELECT
        c.amount_to_raise,
        COALESCE(SUM(p.amount), 0) AS total_pledged,
        COUNT(DISTINCT p.donor_id) AS donor_count
      FROM campaigns c
      LEFT JOIN pledges p ON c.id = p.campaign_id
      WHERE c.name = ${campaignName}
      GROUP BY c.amount_to_raise;
    `;

    if (result.length === 0) {
      throw new Error('Campaign not found');
    }

    const { amount_to_raise, total_pledged, donor_count } = result[0];

    // 🔧 Mock total_raised as 70% of pledged amount
    const total_raised = total_pledged * 0.7;

    return {
      campaign_name: campaignName,
      amount_to_raise,
      total_pledged,
      total_raised: Math.round(total_raised * 100) / 100,
      donor_count,
    };
  } catch (error) {
    console.error('Error fetching campaign summary:', error);
    throw new Error('Failed to fetch campaign summary');
  }
}


const ITEMS_PER_PAGE = 6;

export async function fetchFilteredDonors(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const donors = await sql<DonorsTable[]>`
  SELECT d.id,
        d.image_url,
         d.name,
         d.phone,
         d.address,
         d.email
  FROM donors d
  WHERE 
      d.name ILIKE ${`%${query}%`} OR
      d.phone ILIKE ${`%${query}%`} OR
      d.address ILIKE ${`%${query}%`} OR
      d.email ILIKE ${`%${query}%`}
  ORDER BY d.name
  LIMIT ${ITEMS_PER_PAGE} OFFSET ${(currentPage - 1) * ITEMS_PER_PAGE};

`;

    return donors;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch donors.');
  }
}

export async function fetchFilteredCampaigns(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  const search = `%${query}%`;

  try {
    const campaigns = await sql<CampaignTable[]>`
      SELECT c.id,
             c.name,
             c.amount_to_raise,
             c.status
      FROM campaigns c
      WHERE 
        c.id::text ILIKE ${search} OR
        c.name ILIKE ${search} OR
        c.amount_to_raise::text ILIKE ${search} OR
        c.status ILIKE ${search}
      ORDER BY c.name
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset};
    `;

    return campaigns;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch campaigns.');
  }
}

export async function fetchFilteredInvoices(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const invoices = await sql<InvoicesTable[]>`
      SELECT
        invoices.id,
        invoices.amount,
        invoices.date,
        invoices.status,
        customers.name,
        customers.email,
        customers.image_url
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      WHERE
        customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`} OR
        invoices.amount::text ILIKE ${`%${query}%`} OR
        invoices.date::text ILIKE ${`%${query}%`} OR
        invoices.status ILIKE ${`%${query}%`}
      ORDER BY invoices.date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return invoices;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoices.');
  }
}

export async function fetchFilteredPledges(
  query: string,
  currentPage: number
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const pledges = await sql<PledgeTable[]>`
      SELECT
        pledges.id,
        pledges.amount,
        pledges.start_date,
        pledges.end_date,
        pledges.payment_type,
        donors.name AS donor_name,
        donors.image_url AS image_url,
        campaigns.name AS campaign_name
      FROM pledges
      JOIN donors ON pledges.donor_id = donors.id
      JOIN campaigns ON pledges.campaign_id = campaigns.id
      WHERE
        donors.name ILIKE ${`%${query}%`} OR
        campaigns.name ILIKE ${`%${query}%`} OR
        pledges.amount::text ILIKE ${`%${query}%`} OR
        pledges.payment_type ILIKE ${`%${query}%`} OR
        pledges.start_date::text ILIKE ${`%${query}%`} OR
        pledges.end_date::text ILIKE ${`%${query}%`}
      ORDER BY pledges.start_date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return pledges;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch pledges.');
  }
}

export async function fetchDonorById(id: string) {
  const result = await sql`
    SELECT id, name, image_url, email, phone, address
    FROM donors
    WHERE id = ${id}
  `;
  return result[0];
}

// Get pledges made by a donor
export async function fetchPledgesByDonorId(donorId: string) {
  const result = await sql`
    SELECT pledges.id, pledges.amount, pledges.start_date, campaigns.name AS campaign_name
    FROM pledges
    JOIN campaigns ON pledges.campaign_id = campaigns.id
    WHERE pledges.donor_id = ${donorId}
    ORDER BY pledges.start_date DESC
  `;
  
  return result.map(p => ({
    ...p,
    date: p.start_date, // Normalize to `date` if needed in UI
  }));
}

// app/lib/data.ts or similar file
export async function fetchPledgePages(query: string) {
  try {
    const result = await sql`
      SELECT COUNT(*) AS count
      FROM pledges
      JOIN donors ON pledges.donor_id = donors.id
      JOIN campaigns ON pledges.campaign_id = campaigns.id
      WHERE
        donors.name ILIKE ${`%${query}%`} OR
        campaigns.name ILIKE ${`%${query}%`} OR
        pledges.amount::text ILIKE ${`%${query}%`} OR
        pledges.payment_type ILIKE ${`%${query}%`} OR
        pledges.start_date::text ILIKE ${`%${query}%`} OR
        pledges.end_date::text ILIKE ${`%${query}%`}
    `;

    const totalCount = Number(result[0]?.count || 0);
    return Math.ceil(totalCount / ITEMS_PER_PAGE);
  } catch (error) {
    console.error('Database Error (fetchPledgesPages):', error);
    throw new Error('Failed to count pledges.');
  }
}

export async function fetchInvoicesPages(query: string) {
  try {
    const data = await sql`SELECT COUNT(*)
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    WHERE
      customers.name ILIKE ${`%${query}%`} OR
      customers.email ILIKE ${`%${query}%`} OR
      invoices.amount::text ILIKE ${`%${query}%`} OR
      invoices.date::text ILIKE ${`%${query}%`} OR
      invoices.status ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(data[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of invoices.');
  }
}
export async function fetchDonorsPages(query: string) {
  try {
    const data = await sql`SELECT COUNT(*)
FROM donors d

WHERE 
    d.name ILIKE ${`%${query}%`} OR
    d.phone ILIKE ${`%${query}%`} OR
    d.address ILIKE ${`%${query}%`} OR
    d.email ILIKE ${`%${query}%`}
  ;
  `;

    const totalPages = Math.ceil(Number(data[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of donors.');
  }
}
export async function fetchCampaignPages(query: string) {
  const search = `%${query}%`;

  try {
    const data = await sql`
      SELECT COUNT(*)
      FROM campaigns c
      WHERE 
        c.name ILIKE ${search}
        OR c.amount_to_raise::text ILIKE ${search}
        OR c.status ILIKE ${search}
        OR c.id::text ILIKE ${search}
    `;

    const count = Number(data[0].count);
    return Math.ceil(count / ITEMS_PER_PAGE);
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch campaigns.');
  }
}

export async function fetchInvoiceById(id: string) {
  try {
    const data = await sql<InvoiceForm[]>`
      SELECT
        invoices.id,
        invoices.customer_id,
        invoices.amount,
        invoices.status
      FROM invoices
      WHERE invoices.id = ${id};
    `;

    const invoice = data.map((invoice) => ({
      ...invoice,
      // Convert amount from cents to dollars
      amount: invoice.amount / 100,
    }));

    return invoice[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoice.');
  }
}

export async function fetchCustomers() {
  try {
    const customers = await sql<CustomerField[]>`
      SELECT
        id,
        name
      FROM customers
      ORDER BY name ASC
    `;

    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all customers.');
  }
}

export async function fetchFilteredCustomers(query: string) {
  try {
    const data = await sql<CustomersTableType[]>`
		SELECT
		  customers.id,
		  customers.name,
		  customers.email,
		  customers.image_url,
		  COUNT(invoices.id) AS total_invoices,
		  SUM(CASE WHEN invoices.status = 'pending' THEN invoices.amount ELSE 0 END) AS total_pending,
		  SUM(CASE WHEN invoices.status = 'paid' THEN invoices.amount ELSE 0 END) AS total_paid
		FROM customers
		LEFT JOIN invoices ON customers.id = invoices.customer_id
		WHERE
		  customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`}
		GROUP BY customers.id, customers.name, customers.email, customers.image_url
		ORDER BY customers.name ASC
	  `;

    const customers = data.map((customer) => ({
      ...customer,
      total_pending: formatCurrency(customer.total_pending),
      total_paid: formatCurrency(customer.total_paid),
    }));

    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch customer table.');
  }
}