import roleRequire from '@/configs/middleware';
import { updateUserProfile } from '@/services/user.service';
import { NextRequest, NextResponse } from 'next/server';

export const PATCH = roleRequire(
  async (req: NextRequest): Promise<NextResponse> => {
    const userId = req.headers.get('x-user-id');
    if (!userId) {
      return NextResponse.json(
        { status: 400, message: 'User ID is required' },
        { status: 400 },
      );
    }

    try {
      const { username, image, photos } = await req.json();
      const updatedUser = await updateUserProfile(userId, {
        username,
        image: image,
        photos: photos,
      });

      if (!updatedUser) {
        return NextResponse.json(
          { status: 404, message: 'User not found' },
          { status: 404 },
        );
      }

      return NextResponse.json(
        {
          status: 200,
          // clothes: updatedUser,
        },
        {
          status: 200,
        },
      );
    } catch (error) {
      console.error('Error updating user profile:', error);
      return NextResponse.json(
        { error: 'Error updating user profile' },
        { status: 500 },
      );
    }
  },
);
