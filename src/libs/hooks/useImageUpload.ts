import { axiosWithAuth } from '@/libs/axios';
import { useSession } from 'next-auth/react';
import { useCallback, useState } from 'react';

interface UploadedImage {
  id: number;
  imageUrl: string;
  publicId: string;
}

interface FileUploadProgress {
  file: File;
  progress: number;
}

export interface ImageUploadOptions {
  type?: 'avatar' | 'clother' | 'other';
  relatedId?: string;
  onModel?: 'User' | 'Clothes';
}

function useImageUpload(options: ImageUploadOptions = {}) {
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  const [filesToUpload, setFilesToUpload] = useState<FileUploadProgress[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const { data: session } = useSession();

  const addFilesToUpload = useCallback((files: File[]) => {
    setFilesToUpload((prev) => {
      const newFiles = files
        .filter(
          (file) =>
            !prev.some(
              (item) =>
                item.file.name === file.name && item.file.size === file.size,
            ),
        )
        .map((file) => ({ file, progress: 0 }));
      return [...prev, ...newFiles];
    });
  }, []);

  const removeFileToUpload = useCallback((file: File) => {
    setFilesToUpload((prev) => prev.filter((item) => item.file !== file));
  }, []);

  const uploadImages = useCallback(async () => {
    if (!session?.user?.accessToken || !session) {
      throw new Error(
        'Người dùng chưa đăng nhập hoặc không có thông tin phiên',
      );
    }

    setIsUploading(true);
    const axiosInstance = axiosWithAuth(session.user.accessToken);

    try {
      const uploadPromises = filesToUpload.map(async ({ file }) => {
        const formData = new FormData();
        formData.append('file', file);
        if (options.type) formData.append('type', options.type);
        if (options.relatedId) formData.append('relatedId', options.relatedId);
        if (options.onModel) formData.append('onModel', options.onModel);
        // formData.append('userId', session.user.id);

        const response = await axiosInstance.post('/image', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress: (progressEvent) => {
            const progress = Math.round(
              (progressEvent.loaded * 100) / (progressEvent.total || 1),
            );
            setFilesToUpload((prev) =>
              prev.map((item) =>
                item.file === file ? { ...item, progress } : item,
              ),
            );
          },
        });
        // console.log(response.data);
        return response.data; //has url
      });

      const results = await Promise.all(uploadPromises);
      console.log('tai anh thanh cong');
      setUploadedImages((prev) => [...prev, ...results]);
      // setFilesToUpload([]);
      console.log(results);
      return results;
    } catch (error) {
      console.error('Lỗi khi tải lên ảnh:', error);
      throw error;
    } finally {
      setIsUploading(false);
    }
  }, [filesToUpload, session]);

  const clearUploadedImages = useCallback(() => {
    setUploadedImages([]);
    setFilesToUpload([]);
  }, []);

  return {
    uploadedImages,
    filesToUpload,
    isUploading,
    addFilesToUpload,
    removeFileToUpload,
    uploadImages,
    clearUploadedImages,
  };
}

export default useImageUpload;
