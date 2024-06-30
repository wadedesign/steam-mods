import { NextResponse } from 'next/server';

export async function GET() {
  const response = await fetch('https://api.github.com/repos/wadedesign/steam-mods/releases', {
    headers: {
      'Authorization': `token ${process.env.GITHUB_TOKEN}`
    }
  });

  if (!response.ok) {
    console.error('Error fetching release notes:', response.status, response.statusText);
    return NextResponse.json({ error: 'Failed to fetch release notes' }, { status: response.status });
  }

  const data = await response.json();
  console.log('Fetched release notes:', data);

  if (data.length === 0) {
    console.log('No releases found.');
  }

  return NextResponse.json(data);
}
