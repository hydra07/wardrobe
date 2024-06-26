'use client';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Skeleton } from '@/components/ui/skeleton';
import { useState } from 'react';
import ToolBar from './ToolBar';

export function Item({ name, description, action }: any) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <button onClick={action} className="w-full text-left">
          <img
            src="/ao.webp"
            alt="Product thumbnail"
            className="w-full aspect-[4/3] object-cover"
          />
          <div className="p-3 bg-muted">
            <h3 className="font-medium text-sm truncate">{name}</h3>
            {description && (
              <p className="text-xs text-muted-foreground mt-1 truncate">
                {description}
              </p>
            )}
          </div>
        </button>
      </CardContent>
    </Card>
  );
}

export const listItems = [
  {
    name: 'Casual Shirt',
    description: 'A comfortable and stylish casual shirt for everyday wear.',
  },
  {
    name: 'Skinny Jeans',
    description: 'A sleek and modern pair of skinny jeans for a stylish look.',
  },
  {
    name: 'Leather Jacket',
    description: 'A classic leather jacket that will never go out of style.',
  },
  {
    name: 'Leather Jacket',
    description: 'A classic leather jacket that will never go out of style.',
  },
  {
    name: 'Leather Jacket',
    description: 'A classic leather jacket that will never go out of style.',
  },
  {
    name: 'Leather Jacket',
    description: 'A classic leather jacket that will never go out of style.',
  },
  {
    name: 'Leather Jacket',
    description: 'A classic leather jacket that will never go out of style.',
  },
  {
    name: 'Leather Jacket',
    description: 'A classic leather jacket that will never go out of style.',
  },
  {
    name: 'Leather Jacket',
    description: 'A classic leather jacket that will never go out of style.',
  },
  {
    name: 'Leather Jacket',
    description: 'A classic leather jacket that will never go out of style.',
  },
  {
    name: 'Leather Jacket',
    description: 'A classic leather jacket that will never go out of style.',
  },
];
export function MainImage() {
  return (
    <div className="aspect-[4/3] bg-muted rounded-lg overflow-hidden">
      <img
        src="/ao.webp"
        alt="Main product image"
        width={800}
        height={600}
        className="object-cover w-full h-full"
      />
    </div>
  );
}

export default function Room() {
  const [loading, setLoading] = useState(false);
  const handleAddItem = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="grid md:grid-cols-[1fr_300px] gap-6 w-full max-w-6xl mx-auto p-4 md:p-6">
      <div className="flex flex-col gap-4">
        {loading ? (
          <div className="aspect-[4/3] ">
            <div className="flex flex-col">
              <div className="flex flex-col h-full space-y-3">
                <Skeleton className="h-[125px] w-full rounded-xl" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-4/5" />
                </div>
              </div>
              <div className="flex flex-col h-full space-y-3">
                <Skeleton className="h-[125px] w-full rounded-xl" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-4/5" />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <MainImage />
        )}
        <div className="w-full">
          <Carousel>
            <CarouselContent>
              {listItems.map(
                (_, idx) =>
                  idx % 4 === 0 && (
                    <CarouselItem key={idx}>
                      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {listItems
                          .slice(idx, idx + 4)
                          .map((item, itemIndex) => (
                            <Item
                              key={itemIndex}
                              action={handleAddItem}
                              {...item}
                            />
                          ))}
                      </div>
                    </CarouselItem>
                  ),
              )}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
      <div className="grid gap-4">
        <ToolBar />
      </div>
    </div>
  );
}
