// app/seed/createDonor/route.ts

import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

async function createTableIfNotExists() {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await sql`
    CREATE TABLE IF NOT EXISTS donors (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      phone TEXT NOT NULL,
      email TEXT NOT NULL,
      address TEXT NOT NULL
    );
  `;
}

function validateDonor(data: { name: unknown; phone: unknown; email: unknown; address: unknown }) {
  const { name, phone, email, address } = data;

  if (
    typeof name !== 'string' || name.trim() === '' ||
    typeof phone !== 'string' || phone.trim() === '' ||
    typeof email !== 'string' || email.trim() === '' ||
    typeof address !== 'string' || address.trim() === ''
  ) {
    return false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return false;

  return true;
}

export async function POST(request: Request) {
  try {
    const data = await request.json();

    if (!validateDonor(data)) {
      return new Response(JSON.stringify({ error: 'Invalid input data' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    await createTableIfNotExists();

    await sql`
      INSERT INTO donors (name, phone, email, address)
      VALUES (${data.name.trim()}, ${data.phone.trim()}, ${data.email.trim()}, ${data.address.trim()})
    `;

    return new Response(JSON.stringify({ message: 'Donor added successfully' }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Server Error:', error);
    return new Response(JSON.stringify({ error: 'Failed to add donor' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
