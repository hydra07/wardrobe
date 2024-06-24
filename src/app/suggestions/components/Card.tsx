'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import {
  BookmarkIcon,
  EllipsisVerticalIcon,
  FileWarningIcon,
  HeartIcon,
  MaximizeIcon,
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
const listImages = [
  '/ao.webp',
  '/ao.webp',
  '/ao.webp',
  '/ao.webp',
  '/ao.webp',
  '/ao.webp',
  '/ao.webp',
];

export default function SuggestionCard({ item }: any) {
  const [bookMark, setBookMark] = useState<boolean>(false);
  const [like, setLike] = useState<boolean>(false);

  return (
    <Card className="w-full h-full max-w-lg overflow-hidden">
      <CardContent className="p-0">
        <div className="grid grid-cols-3 grid-rows-3 gap-1 h-[400px]">
          <div className="relative group col-span-2 row-span-2">
            <img
              src={listImages[0]}
              alt="Main Outfit"
              className="w-full h-full object-cover rounded-tl-lg"
            />
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Button variant="ghost" size="icon" className="text-white">
                <MaximizeIcon className="w-6 h-6" />
              </Button>
            </div>
          </div>
          {listImages.slice(1, 6).map((image, index) => (
            <div key={index} className="relative group">
              <img
                src={image}
                alt={`Thumbnail ${index + 2}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                {index === 4 && listImages.length > 6 ? (
                  <Button variant="ghost" size="icon" className="text-white">
                    +{listImages.length - 6}
                  </Button>
                ) : (
                  <Button variant="ghost" size="icon" className="text-white">
                    <MaximizeIcon className="w-6 h-6" />
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="bg-muted py-6 px-8">
        <div className="flex items-center gap-4">
          {/* <Avatar className="w-8 h-8">
            <AvatarImage src="/placeholder-user.jpg" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar> */}
          <div>
            <Link href="#" className="font-medium" prefetch={false}>
              Spring Breeze Outfit
            </Link>
            <p className="text-sm text-muted-foreground">
              Welcome the season of renewal with our Fresh Spring Breeze Look, a
              perfect ensemble that captures the essence of spring with its
              vibrant colors and lightweight fabrics. This outfit is designed to
              keep you comfortable and stylish as you enjoy the blossoming
              flowers and mild weather.
            </p>
          </div>
          <div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                setBookMark(!bookMark);
              }}
            >
              <BookmarkIcon
                className={cn('w-6 h-6', bookMark ? 'text-yellow-400' : '')}
              />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                setLike(!like);
              }}
            >
              <HeartIcon
                className={cn('w-6 h-6', like ? 'text-rose-500' : '')}
              />
            </Button>
            {/* <Link
              href="#"
              className="font-medium flex flex-row flex-nowrap"
              prefetch={false}
            >
              <span className="flex-nowrap">Try On</span>
              <Shirt className="w-6 h-6 ml-1" />
            </Link> */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="ml-auto">
                  {/* <MoveHorizontalIcon className="w-4 h-4" /> */}
                  <EllipsisVerticalIcon className="w-6 h-6" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <FileWarningIcon className="w-4 h-4" />
                  Report
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
