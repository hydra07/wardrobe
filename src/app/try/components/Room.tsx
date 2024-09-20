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
import { axiosWithAuth } from '@/libs/axios';
import useAuth from '@/libs/hooks/useAuth';
import { useSuggestion } from '@/libs/hooks/useSuggestion';
import { useEffect, useState } from 'react';
import ToolBar from './ToolBar';

export const defaultList = [
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

export function Item({ name, description, image, listImage, action }: any) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <button onClick={action} className="w-full text-left">
          {Array.isArray(listImage) ? (
            <img
              src={listImage[0].url}
              alt="Product thumbnail"
              className="w-full aspect-[4/3] object-cover"
            />
          ) : (
            <img
              src={image}
              alt="Product thumbnail"
              className="w-full aspect-[4/3] object-cover"
            />
          )}
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
          className="object-contain w-full h-full"
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
  const [isSuggestion, setIsSuggestion] = useState<boolean>(true);
  const { selectedFeed, setSelectedFeed } = useSuggestion();
  const [feed, setFeed] = useState(selectedFeed);
  const [userProfile, setUserProfile] = useState<any>(null);
  const { user, status } = useAuth();
  const [listCloth, setListCloth] = useState<any>([]);
  const [result, setResult] = useState<any>(null);
  // setSelectedFeed(null);
  const handleSelect = (item: any) => {
    setSelectedItem(item);
    setResult(null);
    // setLoading(true);
    // setTimeout(() => {
    //   setLoading(false);
    // }, 2000);
  };

  useEffect(() => {
    // setFeed(selectedFeed);
    setSelectedFeed(null);
  }, [feed]);

  useEffect(() => {
    // console.log(user, status);
    const fetchUserProfile = async () => {
      if (user) {
        const res = await axiosWithAuth(user.accessToken).get('/user');
        setUserProfile(res.data.user);
        console.log('user', res.data.user);
      }
    };
    fetchUserProfile();
    // console.log('userProfile', userProfile);
  }, [status]);

  useEffect(() => {
    const fetchListCloth = async () => {
      if (user) {
        const res = await axiosWithAuth(user.accessToken).get(`/clothes`);
        setListCloth(res.data.clothes);
      }
    };
    fetchListCloth();
  }, [status]);
  // console.log(selectedItem);
  // console.log('listCloth', listCloth);
  // console.log(userProfile);
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid lg:grid-cols-[1fr_700px] gap-8">
        <div className="space-y-8">
          <div className=" rounded-lg shadow-md overflow-hidden">
            {loading ? (
              <TryOnLoading />
            ) : (
              <MainImage
                item={
                  result
                    ? { image: `data:image/png;base64,${result.image}` }
                    : selectedItem
                }
              />
            )}
          </div>

          <div className=" rounded-lg shadow-md p-4">
            <Carousel className="w-full">
              <CarouselContent>
                {isSuggestion ? (
                  feed ? (
                    <CarouselItem>
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                        {feed.listItem.map((item: any, itemIndex: any) => (
                          <Item
                            key={itemIndex}
                            action={() => handleSelect(item)}
                            {...item}
                          />
                        ))}
                      </div>
                    </CarouselItem>
                  ) : (
                    defaultList.map(
                      (_, idx) =>
                        idx % 4 === 0 && (
                          <CarouselItem key={idx}>
                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                              {defaultList
                                .slice(idx, idx + 4)
                                .map((item, itemIndex) => (
                                  <Item
                                    key={itemIndex}
                                    action={() => handleSelect(item)}
                                    {...item}
                                  />
                                ))}
                            </div>
                          </CarouselItem>
                        ),
                    )
                  )
                ) : (
                  <CarouselItem>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                      {listCloth.map((item: any, itemIndex: any) => (
                        <Item
                          key={itemIndex}
                          action={() => handleSelect(item)}
                          name={item.name}
                          description={item.description}
                          listImage={item.images}
                        />
                      ))}
                    </div>
                  </CarouselItem>
                )}
              </CarouselContent>
              <CarouselPrevious className="hidden sm:flex" />
              <CarouselNext className="hidden sm:flex" />
            </Carousel>
          </div>
        </div>

        <div className="lg:sticky lg:top-4 lg:self-start">
          <ToolBar
            isSuggestion={isSuggestion}
            setIsSuggestion={setIsSuggestion}
            user={userProfile}
            clothImage={selectedItem?.image}
            setLoading={setLoading}
            setResult={setResult}
          />
        </div>
      </div>
    </div>
  );
}
