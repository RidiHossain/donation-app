// app/seed/createPayment/route.ts
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { mkdirSync, existsSync } from 'fs';
import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

async function createTableIfNotExists() {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await sql`
    CREATE TABLE IF NOT EXISTS payments (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      donor_id UUID NOT NULL,
      campaign_id UUID NOT NULL,
      amount NUMERIC(10,2) NOT NULL,
      date DATE NOT NULL,
      receipt_url TEXT
    );
  `;
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const donorId = formData.get('donor_id')?.toString();
    const campaignId = formData.get('campaign_id')?.toString();
    const amount = parseFloat(formData.get('amount')?.toString() || '');
    const date = formData.get('date')?.toString();
    const file = formData.get('receipt') as File;

    if (!donorId || !campaignId || !amount || !date || !file) {
      return new Response(JSON.stringify({ message: 'Missing fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Ensure uploads directory exists
    const uploadDir = join(process.cwd(), 'public', 'uploads');
    if (!existsSync(uploadDir)) mkdirSync(uploadDir, { recursive: true });

    const fileBytes = await file.arrayBuffer();
    const buffer = Buffer.from(fileBytes);
    const fileName = `${Date.now()}-${file.name}`;
    const filePath = join(uploadDir, fileName);

    await writeFile(filePath, buffer);

    const receiptUrl = `/uploads/${fileName}`;

    await createTableIfNotExists();

    await sql`
  INSERT INTO payments (donor_id, campaign_id, amount, date, receipt_url)
  VALUES (${donorId}, ${campaignId}, ${amount}, ${date}, ${receiptUrl})
`;


    return new Response(JSON.stringify({ message: 'Payment created' }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Error in /createPayment:', err);
    return new Response(JSON.stringify({ message: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
