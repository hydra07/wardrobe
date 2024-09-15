import roleRequire from '@/configs/middleware';
import { addTag, getTags } from '@/services/tag.service';
import { NextRequest, NextResponse } from 'next/server';

// export async function GET() {
//   const tagService = new TagService();
//   const tags = await tagService.getAllTags();
//   return res.json({ tags }, { status: 200 });
// }

// export async function POST(req: NextRequest) {
//   const { name } = await req.json();
//   const tagService = new TagService();
//   const tag = await tagService.createTag(name);
//   return res.json({ tag }, { status: 201 });
// }

export const POST = roleRequire(
  async (req: NextRequest): Promise<NextResponse> => {
    const userId = req.headers.get('x-user-id');
    if (userId === null) {
      throw new Error('User ID is required');
    }
    const { name } = await req.json();
    const tag = await addTag(name, userId);
    return NextResponse.json(
      {
        status: 200,
        tag: tag,
      },
      {
        status: 200,
      },
    );
  },
);

export const GET = roleRequire(
  async (req: NextRequest): Promise<NextResponse> => {
    const userId = req.headers.get('x-user-id');
    const options = {
      userId: userId,
      sortBy: 'name',
      sortOrder: 'asc',
    };
    console.log(options);
    const tags = await getTags(options);
    return NextResponse.json({
      status: 200,
      tags: tags,
    });
  },
);
