'use client';

import MultipleSelector from '@/components/ui/multiple-selector';
import { axiosWithAuth } from '@/libs/axios';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export function Tags({ handleChange }: any) {
  const { data: session } = useSession();
  const [tags, setTags] = useState<
    { label: string; value: string; disable?: boolean }[]
  >([]);
  // const [selectedTags, setSelectedTags] = useState<any[]>([]);
  const fetchTags = async () => {
    try {
      const token = session?.user.accessToken;
      if (!token) {
        throw new Error(
          'Người dùng chưa đăng nhập hoặc không có thông tin phiên',
        );
      }
      const response = await axiosWithAuth(token).get('/tags');
      setTags(
        response.data.tags.map((tag: { name: string }) => ({
          label: tag.name,
          value: tag.name,
        })),
      );
    } catch (error) {
      console.error('Lỗi khi lấy thẻ:', error);
    }
  };
  useEffect(() => {
    fetchTags();
  }, [session]);
  return (
    <div className="w-full">
      <MultipleSelector
        // defaultOptions={tags}
        options={tags}
        placeholder="Add tag for your cloth..."
        onChange={(selected) => {
          console.log(selected);
          handleChange(selected);
        }}
        creatable
        emptyIndicator={
          <p className="text-center text-lg leading-10 text-gray-400">
            no results found.
          </p>
        }
      />
    </div>
  );
}

export function ListTags({ tags }: { tags: { _id?: string; name: string }[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {Array.isArray(tags) &&
        // tags.slice(0, 3).map((tag, index) => (
        tags.map((tag, index) => (
          <div key={tag.name}>
            <Link
              href={`/wardrobe?tag=${tag.name}`}
              className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700 transition-colors duration-300 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
              prefetch={false}
            >
              {tag.name}
            </Link>
          </div>
        ))}
    </div>
  );
}
