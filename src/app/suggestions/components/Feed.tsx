'use client';
import { feedItems } from '@/demo/api';
import { useSuggestion } from '@/libs/hooks/useSuggestion';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import ImageComponent from './ImageComponent';
// const feedItems = [
//   {
//     id: 1,
//     username: 'user1',
//     content: 'This is the first feed item',
//     imageUrl: '/placeholder.svg?height=1920&width=1080',
//   },
//   {
//     id: 2,
//     username: 'user2',
//     content: 'Second feed item here',
//     imageUrl: '/placeholder.svg?height=1920&width=1080',
//   },
//   {
//     id: 3,
//     username: 'user3',
//     content: 'Third feed item content',
//     imageUrl: '/placeholder.svg?height=1920&width=1080',
//   },
//   {
//     id: 4,
//     username: 'user4',
//     content: 'Fourth feed item',
//     imageUrl: '/placeholder.svg?height=1920&width=1080',
//   },
//   {
//     id: 5,
//     username: 'user5',
//     content: 'Fifth and final feed item',
//     imageUrl: '/placeholder.svg?height=1920&width=1080',
//   },
// ];

// const listImages = [
// { url: '/ao.webp' },
// { url: '/ao.webp' },
// { url: '/ao.webp' },
// { url: '/ao.webp' },
// { url: '/ao.webp' },
// ];

export function Feed({ feed }: any) {
  // const [feef, setFeed] = useState();
  const [currentFeed, setCurrentFeed] = useState(0);
  const feedRefs = useRef<(HTMLDivElement | null)[]>([]);
  const { selectedFeed, setSelectedFeed } = useSuggestion();
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

  const handleChangeFeed = (item: any) => {
    setSelectedFeed(item);
    //chuyển hướng đến trang try-on
  };
  return (
    <div className="h-full overflow-y-scroll snap-y snap-mandatory space-y-1">
      {feed.map((item: any, index: any) => (
        <div
          key={item.id}
          id={index.toString()}
          ref={(el) => {
            if (el) feedRefs.current[index] = el;
          }}
          className="h-full w-full snap-start relative"
        >
          <div className="absolute inset-0 w-full h-full p-0 m-0 overflow-hidden">
            <ImageComponent
              images={item.listItem?.map((c: { image: any }) => c.image) || []}
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-60 pointer-events-none" />
          <div className="absolute bottom-20 left-4 right-4 text-white p-4 pointer-events-none">

            <p className="text-xl mb-4">{item.content}</p>
          </div>
          <div className="absolute inset-x-4 bottom-4 flex items-end justify-between">
            <div className="flex-grow pr-4">
              <Link 
                href="#" 
                className="font-medium text-white hover:underline transition-all duration-300 ease-in-out" 
                prefetch={false}
              >
                {item.title}
              </Link>
              <p className="text-sm text-gray-300 mt-1 line-clamp-1">{item.description}</p>
            </div>
            <Link
              href="/try"
              onClick={() => handleChangeFeed(item)}
              className="px-4 py-2 bg-white text-black rounded-full font-medium hover:bg-opacity-90 transition-all duration-300 ease-in-out"
            >
              Try
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
export default function ListFeed() {
  const [feed, setFeed] = useState(feedItems);
  return <Feed feed={feed} />;
}
