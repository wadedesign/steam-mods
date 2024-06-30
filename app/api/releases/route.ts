import { NextResponse } from 'next/server';

export async function GET() {
  const response = await fetch('https://api.github.com/repos/yourusername/steam-mod-fetcher/releases');
  if (!response.ok) {
    return NextResponse.json({ error: 'Failed to fetch release notes' }, { status: response.status });
  }

  const data = await response.json();
  return NextResponse.json(data);
}
