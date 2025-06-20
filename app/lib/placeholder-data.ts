// This file contains placeholder data that you'll be replacing with real data in the Data Fetching chapter:
// https://nextjs.org/learn/dashboard-app/fetching-data
const users = [
  {
    id: '410544b2-4001-4271-9855-fec4b6a6442a',
    name: 'User',
    email: 'user@nextmail.com',
    password: '123456',
  },
];// app/lib/placeholder-data.ts

const pledges = [
  {
    donor_id: '00000000-0000-0000-0000-000000000000',
    campaign_id: '0115dac1-ae68-4766-841d-31deec3730f4',
    amount: 100,
    payment_type: 'one_time',
    start_date: '2024-01-01',
    end_date: '2024-01-01',
  },
  {
    donor_id: '11111111-1111-1111-1111-111111111111',
    campaign_id: '11111111-1111-1111-1111-111111111111',
    amount: 200,
    payment_type: 'monthly',
    start_date: '2024-03-01',
    end_date: '2024-08-01',
  },
  {
    donor_id: '22222222-2222-2222-2222-222222222222',
    campaign_id: '22222222-2222-2222-2222-222222222222',
    amount: 150,
    payment_type: 'monthly',
    start_date: '2024-02-01',
    end_date: '2024-07-01',
  },
  {
    donor_id: '33333333-3333-3333-3333-333333333333',
    campaign_id: '33333333-3333-3333-3333-333333333333',
    amount: 300,
    payment_type: 'one_time',
    start_date: '2024-05-10',
    end_date: '2024-05-10',
  },
  {
    donor_id: '44444444-4444-4444-4444-444444444444',
    campaign_id: 'a2a7cc4c-68a2-4537-b417-53e24cb4192f',
    amount: 50,
    payment_type: 'monthly',
    start_date: '2024-04-15',
    end_date: '2024-10-15',
  },
  {
    donor_id: '55555555-5555-5555-5555-555555555555',
    campaign_id: '0115dac1-ae68-4766-841d-31deec3730f4',
    amount: 500,
    payment_type: 'one_time',
    start_date: '2024-06-01',
    end_date: '2024-06-01',
  },
  {
    donor_id: '66666666-6666-6666-6666-666666666666',
    campaign_id: '11111111-1111-1111-1111-111111111111',
    amount: 250,
    payment_type: 'monthly',
    start_date: '2024-03-15',
    end_date: '2024-09-15',
  },
  {
    donor_id: '77777777-7777-7777-7777-777777777777',
    campaign_id: '22222222-2222-2222-2222-222222222222',
    amount: 400,
    payment_type: 'one_time',
    start_date: '2024-07-01',
    end_date: '2024-07-01',
  },
  {
    donor_id: '88888888-8888-8888-8888-888888888888',
    campaign_id: '33333333-3333-3333-3333-333333333333',
    amount: 100,
    payment_type: 'monthly',
    start_date: '2024-08-01',
    end_date: '2025-01-01',
  },
  {
    donor_id: '99999999-9999-9999-9999-999999999999',
    campaign_id: 'a2a7cc4c-68a2-4537-b417-53e24cb4192f',
    amount: 350,
    payment_type: 'one_time',
    start_date: '2024-09-15',
    end_date: '2024-09-15',
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
    id: '11111111-1111-1111-1111-111111111111',
    name: 'Mock User One',
    phone: '6041111111',
    email: 'mock1@example.com',
    address: '101 Mockingbird Lane, Vancouver, BC',
  },
  {
    id: '22222222-2222-2222-2222-222222222222',
    name: 'Mock User Two',
    phone: '6042222222',
    email: 'mock2@example.com',
    address: '202 Mock Street, Burnaby, BC',
  },
  {
    id: '33333333-3333-3333-3333-333333333333',
    name: 'Mock User Three',
    phone: '6043333333',
    email: 'mock3@example.com',
    address: '303 Fake Road, Richmond, BC',
  },
  {
    id: '44444444-4444-4444-4444-444444444444',
    name: 'Mock User Four',
    phone: '6044444444',
    email: 'mock4@example.com',
    address: '404 Placeholder Ave, Surrey, BC',
  },
  {
    id: '55555555-5555-5555-5555-555555555555',
    name: 'Mock User Five',
    phone: '6045555555',
    email: 'mock5@example.com',
    address: '505 Demo Drive, Coquitlam, BC',
  },
  {
    id: '66666666-6666-6666-6666-666666666666',
    name: 'Mock User Six',
    phone: '6046666666',
    email: 'mock6@example.com',
    address: '606 Test Terrace, Delta, BC',
  },
  {
    id: '77777777-7777-7777-7777-777777777777',
    name: 'Mock User Seven',
    phone: '6047777777',
    email: 'mock7@example.com',
    address: '707 Example Blvd, Langley, BC',
  },
  {
    id: '88888888-8888-8888-8888-888888888888',
    name: 'Mock User Eight',
    phone: '6048888888',
    email: 'mock8@example.com',
    address: '808 Simulated St, North Vancouver, BC',
  },
  {
    id: '99999999-9999-9999-9999-999999999999',
    name: 'Mock User Nine',
    phone: '6049999999',
    email: 'mock9@example.com',
    address: '909 Virtual Way, West Vancouver, BC',
  },
  {
    id: '00000000-0000-0000-0000-000000000000',
    name: 'Mock User Ten',
    phone: '6040000000',
    email: 'mock10@example.com',
    address: '010 Simulation Circle, New Westminster, BC',
  },
];
const campaigns = [
  {
    id: '11111111-1111-1111-1111-111111111111',
    name: 'Zakat',
    amount_to_raise: 5000,
    status: 'in_future',
  },
  {
    id: '22222222-2222-2222-2222-222222222222',
    name: 'Community Service',
    amount_to_raise: 8000,
    status: 'running',
  },
  {
    id: '33333333-3333-3333-3333-333333333333',
    name: 'Mosque Expansion',
    amount_to_raise: 10000,
    status: 'completed',
  },
];

export { users, customers, invoices, revenue, donors, donorPayments, campaigns, pledges };
