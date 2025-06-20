import postgres from 'postgres';
import { pledges } from '../lib/placeholder-data';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

async function seedPledges() {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await sql`
    CREATE TABLE IF NOT EXISTS pledges (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      donor_id UUID NOT NULL,
      campaign_id UUID NOT NULL,
      amount NUMERIC NOT NULL CHECK (amount > 0),
      payment_type TEXT NOT NULL CHECK (payment_type IN ('one_time', 'monthly')),
      start_date DATE NOT NULL,
      end_date DATE
    );
  `;

  const insertedPledges = await Promise.all(
    pledges.map((pledge) => sql`
      INSERT INTO pledges (donor_id, campaign_id, amount, payment_type, start_date, end_date)
      VALUES (
        ${pledge.donor_id},
        ${pledge.campaign_id},
        ${pledge.amount},
        ${pledge.payment_type},
        ${pledge.start_date},
        ${pledge.end_date}
      );
    `)
  );

  return insertedPledges;
}

export async function GET() {
  try {
    await seedPledges();
    return Response.json({ message: 'Pledges seeded successfully' });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
