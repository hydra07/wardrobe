import { NextRequest, NextResponse } from 'next/server';

export const GET = (req: NextRequest) => {
  return NextResponse.json(
    {
      status: 200,
      message: 'hello',
    },
    {
      status: 200,
    },
  );
};
