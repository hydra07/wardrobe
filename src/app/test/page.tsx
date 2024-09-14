'use client';

import { useState } from 'react';

function ImageUploader() {
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('userId', '66a4cab501cb0817c6db6262'); // Thay bằng ID người dùng thực tế

    try {
      const response = await fetch('/api/image', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      console.log('Ảnh đã được tải lên:', data);
    } catch (error) {
      console.error('Lỗi khi tải ảnh lên:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="file"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />
      <button type="submit">Tải lên</button>
    </form>
  );
}
export default ImageUploader;
