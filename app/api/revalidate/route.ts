import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get('slug');
    const type = searchParams.get('type');
    const secret = searchParams.get('secret');
    
    // Check for missing or invalid query parameters
    if (!slug && !type) {
        return NextResponse.json({ message: 'Invalid query parameters' }, { status: 400 });
    }

    let path = '';

    // Determine the path based on the 'type' parameter
    switch (type) {
        case 'post':
            // path = `/blog/${slug}`; // Dynamic path for posts
            path = '/blog/[postSlug]';
            break;
        case 'page':
            // path = `/${slug}`; // Dynamic path for pages
            path = '/[pageSlug]';
            break;
        case 'product':
            // path = `/products/${slug}`; // Dynamic path for products
            path = '/products/[productSlug]';
            break;
        case 'home':
            path = '/blog'; // Static path for home
            break;
        case 'products':
            path = '/products'; // Static path for products overview
            break;
        default:
            return NextResponse.json({ message: 'Invalid type parameter' }, { status: 400 });
    }

    // Verify the secret token
    if (secret !== process.env.REVALIDATION_SECRET) {
        return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
    }

    try {
        // Revalidate the path using revalidatePath
        revalidatePath(path);
        return NextResponse.json({ revalidated: true, path: path, time: Date.now(), status: 200 });
    } catch (err) {
        return NextResponse.json(
            { message: err instanceof Error ? err.message : 'Unknown error' },
            { status: 500 }
        );
    }
}
