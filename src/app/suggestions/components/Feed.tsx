'use client';
import { Button } from '@/components/ui/button';
import { Heart, MessageCircle, Share2 } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import ImageComponent from './ImageComponent';
const feedItems = [
  {
    id: 1,
    username: 'user1',
    content: 'This is the first feed item',
    imageUrl: '/placeholder.svg?height=1920&width=1080',
  },
  {
    id: 2,
    username: 'user2',
    content: 'Second feed item here',
    imageUrl: '/placeholder.svg?height=1920&width=1080',
  },
  {
    id: 3,
    username: 'user3',
    content: 'Third feed item content',
    imageUrl: '/placeholder.svg?height=1920&width=1080',
  },
  {
    id: 4,
    username: 'user4',
    content: 'Fourth feed item',
    imageUrl: '/placeholder.svg?height=1920&width=1080',
  },
  {
    id: 5,
    username: 'user5',
    content: 'Fifth and final feed item',
    imageUrl: '/placeholder.svg?height=1920&width=1080',
  },
];

const listImages = [
  { url: '/ao.webp' },
  { url: '/ao.webp' },
  { url: '/ao.webp' },
  { url: '/ao.webp' },
  { url: '/ao.webp' },
];
export default function Feed() {
  const [feef, setFeed] = useState();
  const [currentFeed, setCurrentFeed] = useState(0);
  const feedRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setCurrentFeed(Number(entry.target.id));
          }
        });
      },
      { threshold: 0.5 },
    );

    feedRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      feedRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);
  const handleBackgroundClick = (item: any) => {
    console.log('Background clicked for item:', item);
    // Implement the desired action when the background is clicked
  };
  return (
    <div className="h-full overflow-y-scroll snap-y snap-mandatory space-y-1">
      {feedItems.map((item, index) => (
        <div
          key={item.id}
          id={index.toString()}
          ref={(el) => {
            if (el) feedRefs.current[index] = el;
          }}
          className="h-full w-full snap-start relative"
        >
          <div className="absolute inset-0 w-full h-full p-0 m-0 overflow-hidden">
            <ImageComponent images={listImages} />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-60 pointer-events-none" />
          <div className="absolute bottom-20 left-4 right-4 text-white p-4 pointer-events-none">
            {/* <div className="flex items-center space-x-4 mb-4">
              <Avatar className="h-12 w-12">
                <AvatarImage
                  src={`https://api.dicebear.com/6.x/initials/svg?seed=${item.username}`}
                />
                <AvatarFallback>
                  {item.username[0].toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <span className="text-2xl font-bold">{item.username}</span>
            </div> */}
            <p className="text-xl mb-4">{item.content}</p>
          </div>
          <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
            <div>
              <Link href="#" className="font-medium" prefetch={false}>
                Spring Breeze Outfit
              </Link>
              <p className="text-sm">
                Welcome the season of renewal with our Fresh Spring Breeze Look,
                a perfect ensemble that captures the essence of spring with its
                vibrant colors and lightweight fabrics. This outfit is designed
                to keep you comfortable and stylish as you enjoy the blossoming
                flowers and mild weather.
              </p>
            </div>
            <Button
              variant="ghost"
              className="flex flex-col items-center text-white"
              // onClick={(e) => {
              //   e.stopPropagation();
              //   handleAction('Like', item);
              // }}
            >
              <Heart className="h-8 w-8 mb-1" />
              <span className="text-sm">Like</span>
            </Button>
            <Button
              variant="ghost"
              className="flex flex-col items-center text-white"
              // onClick={(e) => {
              //   e.stopPropagation();
              //   handleAction('Comment', item);
              // }}
            >
              <MessageCircle className="h-8 w-8 mb-1" />
              <span className="text-sm">Comment</span>
            </Button>
            <Button
              variant="ghost"
              className="flex flex-col items-center text-white"
              // onClick={(e) => {
              //   e.stopPropagation();
              //   handleAction('Share', item);
              // }}
            >
              <Share2 className="h-8 w-8 mb-1" />
              <span className="text-sm">Share</span>
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
