import roleRequire from '@/configs/middleware';
import { addCloth, getClothes } from '@/services/clothes.service';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest): Promise<NextResponse> => {
  const clothes = await getClothes();
  return NextResponse.json(
    {
      status: 200,
      clothes: clothes,
    },
    {
      status: 200,
    },
  );
};

export const POST = roleRequire(
  async (req: NextRequest): Promise<NextResponse> => {
    const userId = req.headers.get('x-user-id');
    if (userId === null) {
      throw new Error('User ID is required');
    }
    const { title, brand, tags, description } = await req.json();
    const clothes = await addCloth({ title, brand, tags, description }, userId);
    return NextResponse.json({
      status: 200,
      userId: userId,
      clothes: clothes,
    });
  },
  'user',
);
