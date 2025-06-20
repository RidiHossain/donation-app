import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

async function createTableIfNotExists() {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await sql`
    CREATE TABLE IF NOT EXISTS pledges (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      donor_id UUID NOT NULL REFERENCES donors(id) ON DELETE CASCADE,
      campaign_id UUID NOT NULL REFERENCES campaigns(id) ON DELETE CASCADE,
      amount NUMERIC NOT NULL,
      payment_type VARCHAR(20) NOT NULL CHECK (payment_type IN ('one_time', 'monthly')),
      start_date DATE NOT NULL,
      end_date DATE NOT NULL
    );
  `;
}

function validatePledge(data: {
  donor_id: unknown;
  campaign_id: unknown;
  amount: unknown;
  payment_type: unknown;
  start_date: unknown;
  end_date: unknown;
}) {
  const { donor_id, campaign_id, amount, payment_type, start_date, end_date } = data;
  const validTypes = ['one_time', 'monthly'];

  if (
    typeof donor_id !== 'string' || donor_id.trim() === '' ||
    typeof campaign_id !== 'string' || campaign_id.trim() === '' ||
    typeof amount !== 'number' || isNaN(amount) || amount <= 0 ||
    typeof payment_type !== 'string' || !validTypes.includes(payment_type.trim()) ||
    typeof start_date !== 'string' || isNaN(Date.parse(start_date)) ||
    typeof end_date !== 'string' || isNaN(Date.parse(end_date))
  ) {
    return false;
  }

  return true;
}

export async function POST(request: Request) {
  try {
    const data = await request.json();

    if (!validatePledge(data)) {
      return new Response(JSON.stringify({ error: 'Invalid input data' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    await createTableIfNotExists();

    await sql`
      INSERT INTO pledges (donor_id, campaign_id, amount, payment_type, start_date, end_date)
      VALUES (
        ${data.donor_id.trim()},
        ${data.campaign_id.trim()},
        ${data.amount},
        ${data.payment_type.trim()},
        ${data.start_date},
        ${data.end_date}
      )
    `;

    return new Response(JSON.stringify({ message: 'Pledge created successfully' }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Server Error:', error);
    return new Response(JSON.stringify({ error: 'Failed to create pledge' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
