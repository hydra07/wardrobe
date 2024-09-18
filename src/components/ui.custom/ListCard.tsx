'use client';
import Wardrobe from '@/app/wardrobe/components/Wardrobe';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselMainContainer,
  // CarouselContent,
  // CarouselItem,
  CarouselNext,
  CarouselPrevious,
  SliderMainItem,
} from '@/components/ui/carousel.extras';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { wardrobeItems, wardrobeTags } from '@/demo/api';
import { HeartIcon } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
// import { CarouselContent, CarouselItem } from '../ui/carousel';
import { axiosWithAuth } from '@/libs/axios';
import { Skeleton } from '../ui/skeleton';
import MultipleImage from './MultipleImage';

interface ListItemProps {
  name: string;
  button: {
    name: string;
    href: string;
  };
  card?: React.ReactNode;
}

export function ListWardrobe() {
  const { data: session } = useSession();
  const [listTags, setListTags] = useState<string[]>(wardrobeTags);
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // Thêm state loading

  const fetchTags = async () => {
    try {
      const token = session?.user.accessToken;
      if (!token) {
        throw new Error(
          'Người dùng chưa đăng nhập hoặc không có thông tin phiên',
        );
      }
      const response = await axiosWithAuth(token).get('/tags');
      setListTags(response.data.tags.map((tag: any) => tag.name));
    } catch (error) {
      console.error('Lỗi khi lấy thẻ:', error);
    } finally {
      setLoading(false); // Đặt loading thành false sau khi fetching xong
    }
  };

  useEffect(() => {
    fetchTags();
  }, [session]);

  return (
    <>
      {loading ? ( // Hiển thị skeleton khi loading
        <Skeleton className="h-10 w-full" />
      ) : (
        <Wardrobe
          listItem={
            <WardrobeItems
              button={{ name: 'Wardrobe', href: '/wardrobe' }}
              name="Wardrobe"
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              listTags={listTags}
            />
          }
          tag={activeTab}
        />
      )}
    </>
  );
}

export function WardrobeItems({
  button,
  name,
  card,
  activeTab,
  setActiveTab,
  listTags,
  clothes,
}: any) {
  // const [listItems, setListItems] = useState<ItemProps[]>(wardrobeItems);
  return (
    <div className="w-full mx-auto py-12 px-4 md:px-6 bg-secondary rounded-md">
      <h2 className="text-3xl font-semibold mb-4">{name}</h2>
      <div className="flex items-center justify-between mb-6">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="flex gap-4 "
        >
          <TabsList className="bg-mainbackground">
            {listTags.map((tag: string) => (
              <TabsTrigger
                className="text-mainforeground"
                key={tag}
                value={tag}
              >
                {tag}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        <Link href={button.href}>
          <Button variant="outline" size="sm">
            {button.name}
          </Button>
        </Link>
      </div>
      <div className="flex flex-wrap justify-between">
        {Array.isArray(clothes) &&
          clothes.slice(0, 5).map((cloth, index) => (
            <div key={index} className="flex-1 m-2">
              <Item
                // key={index}
                name={cloth.title}
                description={cloth.description}
                images={cloth.images}
              />
            </div>
          ))}
      </div>
    </div>
  );
}

export default function ListItem({ button, name, card }: ListItemProps) {
  const [listItems, setListItems] = useState<ItemProps[]>(wardrobeItems);
  const [listTags, setListTags] = useState<string[]>(wardrobeTags);
  const [activeTab, setActiveTab] = useState(listTags[0]);
  return (
    <div className="w-full mx-auto py-12 px-4 md:px-6 bg-secondary rounded-md">
      <h2 className="text-3xl font-semibold mb-4">{name}</h2>
      <div className="flex items-center justify-between mb-6">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="flex gap-4 "
        >
          <TabsList className="bg-mainbackground">
            {listTags.map((tag: string) => (
              <TabsTrigger
                className="text-mainforeground"
                key={tag}
                value={tag}
              >
                {tag}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        <Link href={button.href}>
          <Button variant="outline" size="sm">
            {button.name}
          </Button>
        </Link>
      </div>
      <Carousel
        carouselOptions={{
          loop: true,
        }}
        className="w-full"
      >
        <CarouselMainContainer>
          {/* <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"> */}
          {listItems
            // .slice(idx, idx + 4)
            .map((item, itemIndex) => (
              <div key={itemIndex}>
                <SliderMainItem>
                  {card ? card : <Item key={itemIndex} {...item} />}
                </SliderMainItem>
              </div>
            ))}
          {/* </div> */}
        </CarouselMainContainer>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}

export interface ItemProps {
  name: string;
  description: string;
  images: any;
  button?: {
    name?: string;
    href?: string;
  };
}

export const Item = ({ name, description, button, images }: ItemProps) => {
  return (
    <Card className="flex flex-col h-full relative group transition-all duration-300 ease-in-out transform hover:-translate-y-2 hover:shadow-lg">
      <div onClick={(e) => e.stopPropagation()} className="flex-shrink-0">
        <MultipleImage images={images} />
      </div>
      <CardContent className="flex flex-col flex-grow py-4">
        <h3 className="font-semibold tracking-tight">{name}</h3>
        <small className="text-sm leading-none text-muted-foreground flex-grow">
          {description}
        </small>
        <div className="flex items-center justify-between mt-2">
          <Button size="sm" className="mt-4">
            {button?.name || 'View'}
          </Button>
          <Button variant="ghost" size="icon">
            <HeartIcon className="w-5 h-5" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
