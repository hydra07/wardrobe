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

export const listItems = [
  {
    name: 'Casual Shirt',
    description: 'A comfortable and stylish casual shirt for everyday wear.',
    image: '/ao.webp',
  },
  {
    name: 'Skinny Jeans',
    description: 'A sleek and modern pair of skinny jeans for a stylish look.',
    image: '/quan.avif',
  },
  {
    name: 'Leather Jacket',
    description: 'A classic leather jacket that will never go out of style.',
    image: '/ao.webp',
  },
  {
    name: 'Leather Jacket',
    description: 'A classic leather jacket that will never go out of style.',
    image: '/ao.webp',
  },
  {
    name: 'Leather Jacket',
    description: 'A classic leather jacket that will never go out of style.',
    image: '/ao.webp',
  },
  {
    name: 'Leather Jacket',
    description: 'A classic leather jacket that will never go out of style.',
    image: '/ao.webp',
  },
  {
    name: 'Leather Jacket',
    description: 'A classic leather jacket that will never go out of style.',
    image: '/ao.webp',
  },
  {
    name: 'Leather Jacket',
    description: 'A classic leather jacket that will never go out of style.',
    image: '/ao.webp',
  },
  {
    name: 'Leather Jacket',
    description: 'A classic leather jacket that will never go out of style.',
    image: '/ao.webp',
  },
  {
    name: 'Leather Jacket',
    description: 'A classic leather jacket that will never go out of style.',
    image: '/ao.webp',
  },
  {
    name: 'Leather Jacket',
    description: 'A classic leather jacket that will never go out of style.',
    image: '/ao.webp',
  },
];

export function Item({ name, description, image, action }: any) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <button onClick={action} className="w-full text-left">
          <img
            src={image}
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

export function MainImage({ item }: any) {
  return (
    <div className="aspect-[4/3] bg-muted rounded-lg overflow-hidden">
      {item ? (
        <img
          src={item.image}
          alt="Main product image"
          width={800}
          height={600}
          className="object-cover w-full h-full"
        />
      ) : (
        <p>No item selected</p>
      )}
    </div>
  );
}

export function TryOnLoading() {
  return (
    <div className="aspect-[4/3] ">
      <div className="flex flex-col space-y-2">
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
  );
}

export default function Room() {
  const [loading, setLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState<{
    name: string;
    description: string;
    image: string;
  } | null>(null);

  const handleAddItem = (item: any) => {
    setSelectedItem(item);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="grid md:grid-cols-[1fr_450px] gap-8 w-full max-w-7xl mx-auto p-6 md:p-8">
      <div className="flex flex-col gap-4">
        {loading ? <TryOnLoading /> : <MainImage item={selectedItem} />}
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
                              action={() => handleAddItem(item)}
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
