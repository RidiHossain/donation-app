import postgres from 'postgres';
import { donors } from '../lib/placeholder-data';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

async function seedDonors() {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await sql`
    CREATE TABLE IF NOT EXISTS donors (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      phone TEXT NOT NULL,
      address TEXT NOT NULL,
      payment_plan INT NOT NULL CHECK (payment_plan IN (1, 2, 3))
    );
  `;

  const insertedDonors = await Promise.all(
    donors.map((donor) => sql`
      INSERT INTO donors (id, name, phone, address, payment_plan)
      VALUES (${donor.id}, ${donor.name}, ${donor.phone}, ${donor.address}, ${donor.payment_plan})
      ON CONFLICT (id) DO NOTHING;
    `),
  );

  return insertedDonors;
}

export async function GET() {
  try {
    await seedDonors();
    return Response.json({ message: 'Donors seeded successfully' });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
