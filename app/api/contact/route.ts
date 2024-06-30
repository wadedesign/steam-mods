import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { email, message } = await req.json();

  if (!email || !message) {
    return NextResponse.json({ message: 'Email and message are required' }, { status: 400 });
  }

  try {
    const webhookURL = 'https://discord.com/api/webhooks/1256848824727634061/vR906lvVqAwDnsRTbicBCeachfE-uWhEUT4or4rybqge9PupewJ8htpk23Ded0Q_cKEM';
    const payload = {
      content: `New contact form submission:\n\n**Email:** ${email}\n**Message:** ${message}`,
    };

    await fetch(webhookURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    return NextResponse.json({ message: 'Message sent successfully' });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to send message' }, { status: 500 });
  }
}
