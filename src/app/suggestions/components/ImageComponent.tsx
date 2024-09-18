'use client';

import { BreadcrumbCustom } from '@/components/ui.custom/Breadcrumb';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselIndicator,
  CarouselMainContainer,
  CarouselThumbsContainer,
  SliderMainItem,
} from '@/components/ui/carousel.extras';
import { Heart, MessageCircle, Share2 } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
export default function ImageComponent({ images }: any) {
  return (
    <>
      <Carousel className="w-full h-full">
        <div className="flex">
          <div className="">
            <CarouselMainContainer>
              {Array.isArray(images) &&
                images.map((image, index) => (
                  <SliderMainItem
                    key={index}
                    className="bg-transparent items-center w-full flex justify-center  "
                  >
                    <div className="aspect-square ">
                      <img
                        src={image.url as string}
                        className="rounded-lg object-contain  group-hover:opacity-50 transition-opacity"
                      />
                    </div>
                  </SliderMainItem>
                ))}
            </CarouselMainContainer>
          </div>
          <div className="absolute bottom-20 left-1/2 -translate-x-1/2 ">
            <CarouselThumbsContainer className="gap-x-1">
              {Array.isArray(images) &&
                images.map((image, index) => (
                  <CarouselIndicator key={index} index={index} />
                ))}
            </CarouselThumbsContainer>
          </div>
        </div>
      </Carousel>
    </>
  );
}
