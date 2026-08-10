import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { secret } = body;

    // Verify secret to prevent unauthorized revalidation
    if (secret !== process.env.REVALIDATION_SECRET) {
      return NextResponse.json({ error: 'Invalid secret' }, { status: 401 });
    }

    // Revalidate sitemap
    revalidatePath('/sitemap.xml');

    return NextResponse.json({ 
      success: true, 
      message: 'Sitemap revalidation triggered' 
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to revalidate sitemap' },
      { status: 500 }
    );
  }
}
