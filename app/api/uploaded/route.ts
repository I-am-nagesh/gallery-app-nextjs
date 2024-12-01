import { NextResponse } from 'next/server';
import { db } from '@/db';
import { images } from '@/db/schema/images';

export async function GET() {
  try {
    const allImages = await db.select().from(images);
    return NextResponse.json(allImages);
  } catch (error) {
    console.error('Error fetching images:', error);
    return NextResponse.json({ error: 'Failed to fetch images' }, { status: 500 });
  }
}
