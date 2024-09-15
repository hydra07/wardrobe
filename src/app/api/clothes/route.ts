import roleRequire from '@/configs/middleware';
import { addCloth, getClothes } from '@/services/clothes.service';
import { NextRequest, NextResponse } from 'next/server';

export const GET = roleRequire(
  async (req: NextRequest): Promise<NextResponse> => {
    const userId = req.headers.get('x-user-id');
    const { searchParams } = new URL(req.url);
    const take = Number(searchParams.get('take')); // Ép kiểu thành số
    const skip = Number(searchParams.get('skip')); // Ép kiểu thành số
    const tag = searchParams.get('tag');
    console.log(tag);
    if (isNaN(take) || isNaN(skip)) {
      return NextResponse.json(
        { status: 400, message: 'Take and Skip must be numbers' },
        { status: 400 },
      );
    }

    if (!userId) {
      return NextResponse.json(
        { status: 400, message: 'User ID is required' },
        { status: 400 },
      );
    }

    const clothes = await getClothes({ userId, tags: tag }, skip, take);
    return NextResponse.json(
      {
        status: 200,
        clothes: clothes,
      },
      {
        status: 200,
      },
    );
  },
);

export const POST = roleRequire(
  async (req: NextRequest): Promise<NextResponse> => {
    const userId = req.headers.get('x-user-id');
    if (userId === null) {
      throw new Error('User ID is required');
    }
    const { title, brand, tags, description, images } = await req.json();
    // console.log(images);
    const clothes = await addCloth(
      { title, brand, tags, description, images },
      userId,
    );
    return NextResponse.json({
      status: 200,
      userId: userId,
      clothes: clothes,
    });
  },
  'user',
);
