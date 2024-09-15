'use client';

import {
  FileInput,
  FileUploader,
  FileUploaderContent,
  FileUploaderItem,
} from '@/components/ui/file-upload';
import useImageUpload, {
  ImageUploadOptions,
} from '@/libs/hooks/useImageUpload';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { DropzoneOptions } from 'react-dropzone';
import { toast } from 'react-toastify';
import { Button } from '../ui/button';

interface FileUploadDropzoneProps {
  onImageUpload: (urls: string[]) => void;
  onClear?: () => void;
  imageOptions?: ImageUploadOptions;
}

const FileUploadDropzone = ({
  onImageUpload,
  onClear,
  imageOptions,
}: FileUploadDropzoneProps) => {
  const [files, setFiles] = useState<File[] | null>([]);

  const {
    uploadedImages,
    filesToUpload,
    isUploading,
    addFilesToUpload,
    removeFileToUpload,
    uploadImages,
    clearUploadedImages,
  } = useImageUpload(imageOptions);

  const dropzone = {
    accept: {
      'image/*': ['.jpg', '.jpeg', '.png'],
    },
    multiple: true,
    // multiple: false,
    maxFiles: 4,
    maxSize: 1 * 1024 * 1024,
  } satisfies DropzoneOptions;

  const handleValueChange = (files: File[] | null) => {
    if (files) {
      const currentFileNames = new Set(
        filesToUpload.map((item) => item.file.name),
      );
      const newFiles = files.filter((file) => !currentFileNames.has(file.name));
      const removedFiles = filesToUpload.filter(
        (item) => !files.some((file) => file.name === item.file.name),
      );

      if (newFiles.length > 0) {
        addFilesToUpload(newFiles);
      }

      removedFiles.forEach((item) => removeFileToUpload(item.file));
    } else {
      clearUploadedImages();
    }
  };

  const handleUpload = async () => {
    try {
      const uploadedImages = await uploadImages();
      if (uploadedImages && uploadedImages.length > 0) {
        const imageUrls = uploadedImages.map((image) => image.url);
        console.log('URLs ảnh:', imageUrls);
        onImageUpload(imageUrls);
        toast.success('Upload image success!');
        return imageUrls;
      }
      return [];
    } catch (error) {
      toast.error('Upload image failed!');
      console.error('Lỗi khi tải lên ảnh:', error);
      throw error;
    }
  };
  useEffect(() => {
    return () => {
      // Clear khi component unmount
      clearUploadedImages();
    };
  }, [clearUploadedImages]);

  return (
    <>
      <FileUploader
        value={filesToUpload.map((item) => item.file)}
        onValueChange={handleValueChange}
        dropzoneOptions={dropzone}
      >
        <FileInput>
          <div className="flex items-center justify-center h-32 w-full border bg-background rounded-md">
            <p className="text-gray-400">Kéo thả hoặc click để chọn ảnh</p>
          </div>
        </FileInput>
        <FileUploaderContent className="flex items-center flex-row gap-2">
          {filesToUpload.map((item, i) => (
            <FileUploaderItem
              key={i}
              index={i}
              className="size-20 p-0 rounded-md overflow-hidden"
              aria-roledescription={`file ${i + 1} containing ${
                item.file.name
              }`}
            >
              <Image
                src={URL.createObjectURL(item.file)}
                alt={item.file.name}
                height={80}
                width={80}
                className="size-20 p-0"
              />
            </FileUploaderItem>
          ))}
        </FileUploaderContent>
      </FileUploader>
      <Button
        onClick={handleUpload}
        disabled={isUploading || filesToUpload.length === 0}
      >
        {isUploading ? 'Đang tải lên...' : 'Tải lên'}
      </Button>
    </>
  );
};

export default FileUploadDropzone;
