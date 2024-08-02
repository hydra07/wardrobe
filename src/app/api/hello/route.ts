import { NextRequest, NextResponse } from 'next/server';
import { res } from '../handle';

export async function GET(request: NextRequest) {
  return res.json({ message: 'Hello from Next.js!' }, { status: 202 });
}

export async function POST(res: NextResponse) {
  // const {} = await res.json();
  return new NextResponse(`${await res.json()}`, { status: 202 });
}
