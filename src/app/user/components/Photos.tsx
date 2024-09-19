'use client';

import formSchema from '@/app/wardrobe/components/schema';
import FileUploadDropzone from '@/components/ui.custom/FileUpload';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { axiosWithAuth } from '@/libs/axios';
import useImageUpload, {
  ImageUploadOptions,
} from '@/libs/hooks/useImageUpload';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { z } from 'zod';
const imageOptions: ImageUploadOptions = {
  type: 'other',
  onModel: 'User',
};
export default function UpdatePhoto() {
  // const { data: session } = useSession();
  // const [image, setImage] = useState<string | undefined>(session?.user.image);
  // const { addFilesToUpload, uploadImages, isUploading } = useImageUpload();

  // const onSubmit = async (values: z.infer<typeof formSchema>) => {
  //   try {
  //     const token = session?.user.accessToken;
  //     if (!token) {
  //       throw new Error(
  //         'Người dùng chưa đăng nhập hoặc không có thông tin phiên',
  //       );
  //     }
  //     const response = await axiosWithAuth(token).patch('/user', values);
  //     if (response.status === 200) {
  //       toast.success('Success!');
  //       console.log('Success:', response.data);
  //     } else {
  //       toast.error('Failed!');
  //     }
  //     console.log('Success:', response.data);
  //   } catch (error) {
  //     console.error('Error:', error);
  //   }
  // };

  // return (
  //   <div className="space-y-4">
  //     <div>
  //       <label htmlFor="avatar">Avatar URL</label>
  //       <Input
  //         id="avatar"
  //         value={image}
  //         onChange={(e) => setImage(e.target.value)}
  //         placeholder="https://example.com/avatar.jpg"
  //       />
  //       {/* <FileUploadDropzone
  //         onImageUpload={handleImageUpload}
  //         imageOptions={imageOptions}
  //       /> */}
  //     </div>
  //     <Button onClick={handleImageUpload} disabled={isUploading}>
  //       {isUploading ? 'Đang tải lên...' : 'Cập nhật ảnh'}
  //     </Button>
  //   </div>
  // );
}
