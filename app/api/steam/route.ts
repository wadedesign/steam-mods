import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import cheerio from 'cheerio';

interface Mod {
  id: string;
  name: string;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');

  if (!url) {
    return NextResponse.json({ error: 'URL parameter is required' }, { status: 400 });
  }

  try {
    const mods = await fetchSteamWorkshopMods(url);
    console.log('Fetched mods:', mods); // Log the fetched mods
    return NextResponse.json({ mods }, { status: 200 });
  } catch (error) {
    console.error('Error fetching mod details:', error);
    return NextResponse.json({ error: 'Failed to fetch mod details' }, { status: 500 });
  }
}

async function fetchSteamWorkshopMods(url: string): Promise<Mod[]> {
  const response = await axios.get(url);
  const html = response.data;
  const $ = cheerio.load(html);

  const mods: Mod[] = [];
  $('.workshopItemTitle').each((_, element) => {
    const id = $(element).closest('a').attr('href')?.split('id=')[1] || '';
    const name = $(element).text().trim();
    if (id && name) {
      mods.push({ id, name });
    }
  });

  return mods;
}
