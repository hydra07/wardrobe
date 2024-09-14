import roleRequire from '@/configs/middleware';
import { uploadImage } from '@/services/image.service';
import { NextRequest, NextResponse } from 'next/server';

export const POST = roleRequire(async (req: NextRequest) => {
  const userId = req.headers.get('x-user-id');
  if (!userId) {
    return NextResponse.json(
      { status: 400, message: 'User ID is required' },
      { status: 400 },
    );
  }
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    // const userId = formData.get('userId') as string;
    const type = formData.get('type') as 'avatar' | 'clother' | 'other' || 'other';
    const relatedId = formData.get('relatedId') as string;
    const onModel = formData.get('onModel') as 'User' | 'Clothes';

    if (!file || !userId) {
      return NextResponse.json(
        { error: 'File và userId là bắt buộc' },
        { status: 400 },
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const multerFile = {
      buffer,
      originalname: file.name,
      mimetype: file.type,
    } as Express.Multer.File;

    const uploadedImage = await uploadImage(
      multerFile,
      userId,
      type,
      relatedId,
      onModel,
    );

    return NextResponse.json(uploadedImage);
  } catch (error) {
    console.error('Lỗi xử lý tải lên file:', error);
    return NextResponse.json({ error: 'Lỗi tải lên file' }, { status: 500 });
  }
});
