import { NextRequest, NextResponse } from 'next/server';
import { createComment } from '@/lib/comments';

// POST method for handling the comment submission
export async function POST(req: NextRequest) {
    try {
        const body = await req.json(); // Parses the request body

        const resJson = await createComment(body);

        if (resJson.errors) {
            return NextResponse.json(
                { message: resJson.errors[0].message, body: body }, 
                { status: 500 }
            );
        } else if (resJson.data.createComment !== null && resJson.data.createComment.success === true) {
            return NextResponse.json(
                { message: "Your comment is awaiting approval" }, 
                { status: 200 }
            );
        }

        return NextResponse.json({ message: "Some error occurred" }, { status: 500 });
    } catch (error) {
        return NextResponse.json({ message: "Invalid request body" }, { status: 500 });
    }
}
