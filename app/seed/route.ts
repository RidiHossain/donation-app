import postgres from 'postgres';
import { campaigns } from '../lib/placeholder-data';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

async function seedCampaigns() {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  // Create campaigns table
  await sql`
    CREATE TABLE IF NOT EXISTS campaigns (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      amount_to_raise NUMERIC NOT NULL,
      status TEXT NOT NULL CHECK (status IN ('running', 'completed', 'paused', 'in_future'))
    );
  `;

  // Insert mock campaigns
  const insertedCampaigns = await Promise.all(
    campaigns.map((campaign) => sql`
      INSERT INTO campaigns (id, name, amount_to_raise, status)
      VALUES (${campaign.id}, ${campaign.name}, ${campaign.amount_to_raise}, ${campaign.status})
      ON CONFLICT (id) DO NOTHING;
    `)
  );

  return insertedCampaigns;
}

export async function GET() {
  try {
    await seedCampaigns();
    return Response.json({ message: 'Campaigns seeded successfully' });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
