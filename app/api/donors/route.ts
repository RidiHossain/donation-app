import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function GET() {
  try {
    const donors = await sql`
      SELECT id, name FROM donors ORDER BY name;
    `;
    return Response.json(donors);
  } catch (error) {
    console.error('Error fetching donors:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch donors' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
