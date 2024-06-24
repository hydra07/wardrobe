import MultipleSelector from '@/components/ui/multiple-selector';
import { clothing_options } from '@/demo/api';
import Link from 'next/link';
import { useState } from 'react';

export function Tags() {
  const [tags, setTags] =
    useState<{ label: string; value: string; disable?: boolean }[]>(
      clothing_options,
    );
  const [selectedTags, setSelectedTags] = useState<any[]>([]);
  return (
    <div className="w-full">
      <MultipleSelector
        defaultOptions={tags}
        placeholder="Add tag for your cloth..."
        onChange={(selected) => {
          setSelectedTags(selected);
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

export function ListTags({ tags }: { tags: { name: string }[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags &&
        tags.slice(0, 3).map((tag, index) => (
          <div key={tag.name}>
            <Link
              href={`/post?tag=${tag.name}`}
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
