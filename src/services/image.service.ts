import cloudinary from '@/configs/cloudinary';
import Image from '@/models/image.model';

import { UploadApiResponse } from 'cloudinary';
export async function uploadImage(
  file: Express.Multer.File,
  userId: string,
  type: 'avatar' | 'clother' | 'other' = 'other',
  relatedId?: string,
  onModel?: 'User' | 'Clothes',
): Promise<InstanceType<typeof Image>> {
  try {
    const result: UploadApiResponse = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            resource_type: 'auto',
            folder: process.env.CLOUD_IMG_FOLDER,
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result as UploadApiResponse);
          },
        )
        .end(file.buffer);
    });

    const image = new Image({
      userId,
      publicId: result.public_id,
      url: result.secure_url,
      type,
      ...(relatedId && { relatedId }),
      ...(onModel && { onModel }),
    });

    return await image.save();
  } catch (error) {
    console.error('Lỗi khi tải lên ảnh:', error);
    throw error;
  }
}

export async function getImageIds(urls: string | string[]): Promise<string[]> {
  try {
    const urlArray = Array.isArray(urls) ? urls : [urls];
    const images = await Image.find({ url: { $in: urlArray } }).select('_id');
    return images.map((image) => image._id.toString());
  } catch (error) {
    console.error('Lỗi khi lấy ID ảnh:', error);
    throw error;
  }
}
