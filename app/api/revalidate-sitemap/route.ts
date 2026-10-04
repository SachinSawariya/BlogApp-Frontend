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

    // Revalidate sitemap & rss
    revalidatePath('/sitemap.xml');
    revalidatePath('/rss.xml');
    revalidatePath('/');
    revalidatePath('/articles');
    revalidatePath('/categories');

    if (body.slug) {
      revalidatePath(`/articles/${body.slug}`);
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Sitemap and content revalidation triggered successfully' 
    });
  } catch (error) {
    console.error('Error revalidating sitemap:', error);
    return NextResponse.json(
      { error: 'Failed to revalidate sitemap' },
      { status: 500 }
    );
  }
}
