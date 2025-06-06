// This file contains placeholder data that you'll be replacing with real data in the Data Fetching chapter:
// https://nextjs.org/learn/dashboard-app/fetching-data
const users = [
  {
    id: '410544b2-4001-4271-9855-fec4b6a6442a',
    name: 'User',
    email: 'user@nextmail.com',
    password: '123456',
  },
];

const customers = [
  {
    id: 'd6e15727-9fe1-4961-8c5b-ea44a9bd81aa',
    name: 'Evil Rabbit',
    email: 'evil@rabbit.com',
    image_url: '/customers/evil-rabbit.png',
  },
  {
    id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
    name: 'Delba de Oliveira',
    email: 'delba@oliveira.com',
    image_url: '/customers/delba-de-oliveira.png',
  },
  {
    id: '3958dc9e-742f-4377-85e9-fec4b6a6442a',
    name: 'Lee Robinson',
    email: 'lee@robinson.com',
    image_url: '/customers/lee-robinson.png',
  },
  {
    id: '76d65c26-f784-44a2-ac19-586678f7c2f2',
    name: 'Michael Novotny',
    email: 'michael@novotny.com',
    image_url: '/customers/michael-novotny.png',
  },
  {
    id: 'CC27C14A-0ACF-4F4A-A6C9-D45682C144B9',
    name: 'Amy Burns',
    email: 'amy@burns.com',
    image_url: '/customers/amy-burns.png',
  },
  {
    id: '13D07535-C59E-4157-A011-F8D2EF4E0CBB',
    name: 'Balazs Orban',
    email: 'balazs@orban.com',
    image_url: '/customers/balazs-orban.png',
  },
];

const invoices = [
  {
    customer_id: customers[0].id,
    amount: 15795,
    status: 'pending',
    date: '2022-12-06',
  },
  {
    customer_id: customers[1].id,
    amount: 20348,
    status: 'pending',
    date: '2022-11-14',
  },
  {
    customer_id: customers[4].id,
    amount: 3040,
    status: 'paid',
    date: '2022-10-29',
  },
  {
    customer_id: customers[3].id,
    amount: 44800,
    status: 'paid',
    date: '2023-09-10',
  },
  {
    customer_id: customers[5].id,
    amount: 34577,
    status: 'pending',
    date: '2023-08-05',
  },
  {
    customer_id: customers[2].id,
    amount: 54246,
    status: 'pending',
    date: '2023-07-16',
  },
  {
    customer_id: customers[0].id,
    amount: 666,
    status: 'pending',
    date: '2023-06-27',
  },
  {
    customer_id: customers[3].id,
    amount: 32545,
    status: 'paid',
    date: '2023-06-09',
  },
  {
    customer_id: customers[4].id,
    amount: 1250,
    status: 'paid',
    date: '2023-06-17',
  },
  {
    customer_id: customers[5].id,
    amount: 8546,
    status: 'paid',
    date: '2023-06-07',
  },
  {
    customer_id: customers[1].id,
    amount: 500,
    status: 'paid',
    date: '2023-08-19',
  },
  {
    customer_id: customers[5].id,
    amount: 8945,
    status: 'paid',
    date: '2023-06-03',
  },
  {
    customer_id: customers[2].id,
    amount: 1000,
    status: 'paid',
    date: '2022-06-05',
  },
];

const revenue = [
  { month: 'Jan', revenue: 2000 },
  { month: 'Feb', revenue: 1800 },
  { month: 'Mar', revenue: 2200 },
  { month: 'Apr', revenue: 2500 },
  { month: 'May', revenue: 2300 },
  { month: 'Jun', revenue: 3200 },
  { month: 'Jul', revenue: 3500 },
  { month: 'Aug', revenue: 3700 },
  { month: 'Sep', revenue: 2500 },
  { month: 'Oct', revenue: 2800 },
  { month: 'Nov', revenue: 3000 },
  { month: 'Dec', revenue: 4800 },
];
const donorPayments = [
  // Alice Johnson
  { donor_id: 'c1a1a1a1-0001-0001-0001-000000000001', payment_date: '2025-01-10', payment_amount: 100, status: 'Due' },
  { donor_id: 'c1a1a1a1-0001-0001-0001-000000000001', payment_date: '2025-02-10', payment_amount: 100, status: 'Due' },
  { donor_id: 'c1a1a1a1-0001-0001-0001-000000000001', payment_date: '2025-03-10', payment_amount: 100, status: 'Due' },

  // Bob Smith
  { donor_id: 'c1a1a1a1-0001-0001-0001-000000000002', payment_date: '2025-01-15', payment_amount: 150, status: 'Due' },
  { donor_id: 'c1a1a1a1-0001-0001-0001-000000000002', payment_date: '2025-02-15', payment_amount: 150, status: 'Due' },
  { donor_id: 'c1a1a1a1-0001-0001-0001-000000000002', payment_date: '2025-03-15', payment_amount: 150, status: 'Due' },

  // Catherine Lee
  { donor_id: 'c1a1a1a1-0001-0001-0001-000000000003', payment_date: '2025-01-20', payment_amount: 200, status: 'Due' },
  { donor_id: 'c1a1a1a1-0001-0001-0001-000000000003', payment_date: '2025-02-20', payment_amount: 200, status: 'Due' },
  { donor_id: 'c1a1a1a1-0001-0001-0001-000000000003', payment_date: '2025-03-20', payment_amount: 200, status: 'Due' },

  // David Miller
  { donor_id: 'c1a1a1a1-0001-0001-0001-000000000004', payment_date: '2025-01-12', payment_amount: 120, status: 'Due' },
  { donor_id: 'c1a1a1a1-0001-0001-0001-000000000004', payment_date: '2025-02-12', payment_amount: 120, status: 'Due' },
  { donor_id: 'c1a1a1a1-0001-0001-0001-000000000004', payment_date: '2025-03-12', payment_amount: 120, status: 'Due' },

  // Eva Brown
  { donor_id: 'c1a1a1a1-0001-0001-0001-000000000005', payment_date: '2025-01-25', payment_amount: 130, status: 'Due' },
  { donor_id: 'c1a1a1a1-0001-0001-0001-000000000005', payment_date: '2025-02-25', payment_amount: 130, status: 'Due' },
  { donor_id: 'c1a1a1a1-0001-0001-0001-000000000005', payment_date: '2025-03-25', payment_amount: 130, status: 'Due' },

  // Frank Wilson
  { donor_id: 'c1a1a1a1-0001-0001-0001-000000000006', payment_date: '2025-01-08', payment_amount: 80, status: 'Due' },
  { donor_id: 'c1a1a1a1-0001-0001-0001-000000000006', payment_date: '2025-02-08', payment_amount: 80, status: 'Due' },
  { donor_id: 'c1a1a1a1-0001-0001-0001-000000000006', payment_date: '2025-03-08', payment_amount: 80, status: 'Due' },

  // Grace Kim
  { donor_id: 'c1a1a1a1-0001-0001-0001-000000000007', payment_date: '2025-01-05', payment_amount: 90, status: 'Due' },
  { donor_id: 'c1a1a1a1-0001-0001-0001-000000000007', payment_date: '2025-02-05', payment_amount: 90, status: 'Due' },
  { donor_id: 'c1a1a1a1-0001-0001-0001-000000000007', payment_date: '2025-03-05', payment_amount: 90, status: 'Due' },

  // Henry Davis
  { donor_id: 'c1a1a1a1-0001-0001-0001-000000000008', payment_date: '2025-01-30', payment_amount: 140, status: 'Due' },
  { donor_id: 'c1a1a1a1-0001-0001-0001-000000000008', payment_date: '2025-02-28', payment_amount: 140, status: 'Due' },
  { donor_id: 'c1a1a1a1-0001-0001-0001-000000000008', payment_date: '2025-03-30', payment_amount: 140, status: 'Due' },

  // Isabel Martinez
  { donor_id: 'c1a1a1a1-0001-0001-0001-000000000009', payment_date: '2025-01-18', payment_amount: 95, status: 'Due' },
  { donor_id: 'c1a1a1a1-0001-0001-0001-000000000009', payment_date: '2025-02-18', payment_amount: 95, status: 'Due' },
  { donor_id: 'c1a1a1a1-0001-0001-0001-000000000009', payment_date: '2025-03-18', payment_amount: 95, status: 'Due' },

  // Jack Thompson
  { donor_id: 'c1a1a1a1-0001-0001-0001-000000000010', payment_date: '2025-01-22', payment_amount: 110, status: 'Due' },
  { donor_id: 'c1a1a1a1-0001-0001-0001-000000000010', payment_date: '2025-02-22', payment_amount: 110, status: 'Due' },
  { donor_id: 'c1a1a1a1-0001-0001-0001-000000000010', payment_date: '2025-03-22', payment_amount: 110, status: 'Due' },
];
const donors = [
  {
    id: 'c1a1a1a1-0001-0001-0001-000000000001',
    name: 'Alice Johnson',
    phone: '123-456-7890',
    address: '123 Maple Street, Toronto, ON',
    payment_plan: 1,
  },
  {
    id: 'c1a1a1a1-0001-0001-0001-000000000002',
    name: 'Bob Smith',
    phone: '234-567-8901',
    address: '456 Oak Avenue, Vancouver, BC',
    payment_plan: 2,
  },
  {
    id: 'c1a1a1a1-0001-0001-0001-000000000003',
    name: 'Catherine Lee',
    phone: '345-678-9012',
    address: '789 Pine Lane, Montreal, QC',
    payment_plan: 3,
  },
  {
    id: 'c1a1a1a1-0001-0001-0001-000000000004',
    name: 'David Miller',
    phone: '456-789-0123',
    address: '101 Cedar Road, Calgary, AB',
    payment_plan: 1,
  },
  {
    id: 'c1a1a1a1-0001-0001-0001-000000000005',
    name: 'Eva Brown',
    phone: '567-890-1234',
    address: '202 Birch Blvd, Edmonton, AB',
    payment_plan: 2,
  },
  {
    id: 'c1a1a1a1-0001-0001-0001-000000000006',
    name: 'Frank Wilson',
    phone: '678-901-2345',
    address: '303 Elm Street, Halifax, NS',
    payment_plan: 3,
  },
  {
    id: 'c1a1a1a1-0001-0001-0001-000000000007',
    name: 'Grace Kim',
    phone: '789-012-3456',
    address: '404 Spruce Way, Regina, SK',
    payment_plan: 1,
  },
  {
    id: 'c1a1a1a1-0001-0001-0001-000000000008',
    name: 'Henry Davis',
    phone: '890-123-4567',
    address: '505 Fir Circle, Winnipeg, MB',
    payment_plan: 2,
  },
  {
    id: 'c1a1a1a1-0001-0001-0001-000000000009',
    name: 'Isabel Martinez',
    phone: '901-234-5678',
    address: '606 Redwood Court, Quebec City, QC',
    payment_plan: 3,
  },
  {
    id: 'c1a1a1a1-0001-0001-0001-000000000010',
    name: 'Jack Thompson',
    phone: '012-345-6789',
    address: '707 Willow Grove, Ottawa, ON',
    payment_plan: 1,
  },
];



export { users, customers, invoices, revenue, donors, donorPayments };
