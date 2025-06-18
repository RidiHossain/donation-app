import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

async function createTableIfNotExists() {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await sql`
    CREATE TABLE IF NOT EXISTS campaigns (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      amount_to_raise NUMERIC NOT NULL,
      status VARCHAR(50) NOT NULL CHECK (status IN ('running', 'completed', 'paused', 'in_future'))
    );
  `;
}

function validateCampaign(data: {
  name: unknown;
  amount_to_raise: unknown;
  status: unknown;
}) {
  const { name, amount_to_raise, status } = data;

  const validStatuses = ['running', 'completed', 'paused', 'in_future'];

  if (
    typeof name !== 'string' || name.trim() === '' ||
    typeof amount_to_raise !== 'number' || isNaN(amount_to_raise) || amount_to_raise <= 0 ||
    typeof status !== 'string' || !validStatuses.includes(status.trim())
  ) {
    return false;
  }

  return true;
}

export async function POST(request: Request) {
  try {
    const data = await request.json();

    if (!validateCampaign(data)) {
      return new Response(JSON.stringify({ error: 'Invalid input data' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    await createTableIfNotExists();

    await sql`
      INSERT INTO campaigns (name, amount_to_raise, status)
      VALUES (${data.name.trim()}, ${data.amount_to_raise}, ${data.status.trim()})
    `;

    return new Response(JSON.stringify({ message: 'Campaign created successfully' }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Server Error:', error);
    return new Response(JSON.stringify({ error: 'Failed to create campaign' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
