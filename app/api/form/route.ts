import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json(); // Parse the request body

        if (!body.firstName || !body.email || !body.message) {
            return NextResponse.json(
                { data: "first name, email, and message fields are required!" }, 
                { status: 400 }
            );
        }

        return NextResponse.json({ data: "form submitted successfully" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ data: "Invalid request body" }, { status: 500 });
    }
}
