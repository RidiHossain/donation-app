import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { email, name, status, totalPledged, totalPaid } = await req.json();

    const subject = `Donation Reminder`;
    const text = `Dear ${name},\n\nThis is a friendly reminder regarding your donation. You have pledged $${totalPledged} and paid $${totalPaid} so far.\n\nThank you!`;

    const data = await resend.emails.send({
      from: 'Donation Admin<no-reply@ridihossain.com>', // You can use Resend's default domain for now
      to: email,
      subject,
      text,
    });

    return NextResponse.json({ status: 'OK', data });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Email send failed' }, { status: 500 });
  }
}
