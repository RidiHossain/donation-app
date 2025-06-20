import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function GET() {
  try {
    const campaigns = await sql`
      SELECT id, name FROM campaigns ORDER BY name;
    `;
    return Response.json(campaigns);
  } catch (error) {
    console.error('Error fetching campaigns:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch campaigns' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
