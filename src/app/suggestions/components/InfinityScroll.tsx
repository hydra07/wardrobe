'use client';
import InfiniteScroll from '@/components/ui/infinity-scroll';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import SuggestionCard from './Card';

interface Item {
  id: number;
  title: string;
  description: string;
}

const mockData: Item[] = Array.from({ length: 100 }, (_, index) => ({
  id: index + 1,
  title: `Spring Breeze Outfit ${index + 1}`,
  description:
    'Welcome the season of renewal with our Fresh Spring Breeze Look, a perfect ensemble that captures the essence of spring with its vibrant colors and lightweight fabrics. This outfit is designed to keep you comfortable and stylish as you enjoy the blossoming flowers and mild weather.',
}));

interface MockResponse {
  items: Item[];
  total: number;
  skip: number;
  limit: number;
}

const fetchMockData = (limit = 3, skip = 0): Promise<MockResponse> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const items = mockData.slice(skip, skip + limit);
      resolve({
        items,
        total: mockData.length,
        skip,
        limit,
      });
    }, 800);
  });
};

const InfiniteScrollSuggestion = () => {
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [items, setItems] = useState<Item[]>([]);

  const next = async () => {
    setLoading(true);
    try {
      const data = await fetchMockData(3, 3 * page);
      setItems((prev) => [...prev, ...data.items]);
      setPage((prev) => prev + 1);

      if (data.items.length < 3) {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    // <div className="h-screen w-full overflow-y-auto px-10">
    //   <div className="flex w-full flex-col items-center gap-3">
    // <ScrollArea>
    <div className="w-full justify-center">
      <div className="flex flex-col space-y-3 items-center">
        {items.map((item) => (
          <SuggestionCard key={item.id} item={item} />
        ))}
      </div>
      <InfiniteScroll
        hasMore={hasMore}
        isLoading={loading}
        next={next}
        threshold={1}
      >
        <div className="justify-center">
          {hasMore && (
            <Loader2 className="my-4 h-8 w-8 animate-spin items-center" />
          )}
        </div>
      </InfiniteScroll>
    </div>
    // </ScrollArea>
    //   </div>
    // </div>
  );
};

export default InfiniteScrollSuggestion;
