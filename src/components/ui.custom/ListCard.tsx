'use client';

import Wardrobe from '@/app/wardrobe/components/Wardrobe';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { wardrobeItems, wardrobeTags } from '@/demo/api';
import { HeartIcon } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
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
  const [items, setItems] = useState<any[]>(wardrobeItems);
  const [tags, setTags] = useState<string[]>(wardrobeTags);

  useEffect(() => {
    const fetchItems = async () => {
      // const items = await getClothes();
      setItems(items);
    };
    fetchItems();
  }, []);
  return (
    <>
      <Wardrobe
        listItem={
          // <ListItem
          //   button={{ name: 'Wardrobe', href: '/wardrobe' }}
          //   name="Wardrobe"
          // />
          <WardrobeItems
            button={{ name: 'Wardrobe', href: '/wardrobe' }}
            name="Wardrobe"
          />
        }
      />
      {/* <ListItem
        button={{ name: 'Wardrobe', href: '/wardrobe' }}
        name="Wardrobe"
      /> */}
    </>
  );
}

export function WardrobeItems({ button, name, card, clothes }: any) {
  const [listItems, setListItems] = useState<ItemProps[]>(wardrobeItems);
  const [listTags, setListTags] = useState<string[]>(wardrobeTags);
  const [activeTab, setActiveTab] = useState(listTags[0]);
  // return (
  //   <>
  //     {Array.isArray(clothes) &&
  //       clothes.map((cloth, index) => (
  //         <Item key={index} name="aaa" description="aaaaa" />
  //       ))}
  //   </>
  // );
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
      <Carousel className="w-full">
        <CarouselContent>
          {listItems.map(
            (_, idx) =>
              idx % 4 === 0 && (
                <CarouselItem key={idx}>
                  <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {/* {listItems
                      .slice(idx, idx + 4)
                      .map((item, itemIndex) =>
                        card ? card : <Item key={itemIndex} {...item} />,
                      )} */}
                    {Array.isArray(clothes) &&
                      clothes.map((cloth, index) => (
                        <Item
                          key={index}
                          name={cloth.title}
                          description={cloth.description}
                          images={cloth.images}
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
      <Carousel className="w-full">
        <CarouselContent>
          {
            listItems.map((_, idx) => (
              // idx % 4 === 0 && (
              <CarouselItem key={idx}>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {listItems
                    // .slice(idx, idx + 4)
                    .map((item, itemIndex) =>
                      card ? card : <Item key={itemIndex} {...item} />,
                    )}
                </div>
              </CarouselItem>
            ))
            // )
          }
        </CarouselContent>
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
    <Card className="relative group transition-all duration-300 ease-in-out transform hover:-translate-y-2 hover:shadow-lg">
      <Link href="#" className="absolute inset-0 z-10" prefetch={false}>
        <span className="sr-only">View</span>
      </Link>
      <div onClick={(e) => e.stopPropagation()}>
        <MultipleImage images={images} />
      </div>
      {/* <img
        src="/ao.webp"
        alt="Product Image"
        width={300}
        height={300}
        className="rounded-lg object-cover w-full aspect-square group-hover:opacity-50 transition-opacity"
      /> */}
      <CardContent className="py-4">
        <h3 className="font-semibold tracking-tight">{name}</h3>
        <small className="text-sm leading-none text-muted-foreground">
          {description}
        </small>
        <div className="flex items-center justify-between mt-2">
          <Button size="sm" className="mt-4">
            {button?.name}
          </Button>
          <Button variant="ghost" size="icon">
            <HeartIcon className="w-5 h-5" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
