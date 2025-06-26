import postgres from 'postgres';
import { payments } from '../lib/placeholder-data';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

async function seedPayments() {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await sql`
    CREATE TABLE IF NOT EXISTS payments (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      donor_id UUID NOT NULL,
      campaign_id UUID NOT NULL,
      amount NUMERIC NOT NULL CHECK (amount > 0),
      date DATE NOT NULL
    );
  `;

  const insertedPayments = await Promise.all(
    payments.map((payment) => sql`
      INSERT INTO payments (donor_id, campaign_id, amount, date)
      VALUES (
        ${payment.donor_id},
        ${payment.campaign_id},
        ${payment.amount},
        ${payment.date}
      );
    `)
  );

  return insertedPayments;
}

export async function GET() {
  try {
    await seedPayments();
    return Response.json({ message: 'Payments seeded successfully' });
  } catch (error) {
    console.error('Seeding error:', error);
    return Response.json({ error: 'Seeding failed' }, { status: 500 });
  }
}
