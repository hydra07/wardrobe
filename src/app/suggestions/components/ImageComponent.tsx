'use client';

import {
  Carousel,
  CarouselIndicator,
  CarouselMainContainer,
  CarouselThumbsContainer,
  SliderMainItem,
} from '@/components/ui/carousel.extras';
export default function ImageComponent({ images }: any) {
  return (
    <div className="relative w-full h-full">
      <Carousel className="w-full h-full">
        <div className="flex flex-col">
          <div className="flex-grow">
            <CarouselMainContainer>
              {Array.isArray(images) &&
                images.map((image, index) => (
                  <SliderMainItem
                    key={index}
                    className="bg-transparent w-full h-full"
                  >
                    <img
                      src={image}
                      alt={`Product image ${index + 1}`}
                      className="w-full h-full object-cover rounded-lg transition-opacity duration-300 ease-in-out group-hover:opacity-90"
                    />
                  </SliderMainItem>
                ))}
            </CarouselMainContainer>
          </div>
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-full max-w-md px-4">
            <CarouselThumbsContainer className="flex justify-center gap-2 overflow-x-auto py-2">
              {Array.isArray(images) &&
                images.map((image, index) => (
                  <CarouselIndicator 
                    key={index} 
                    index={index}
                    className="w-3 h-3 rounded-full bg-white bg-opacity-50 transition-all duration-300 ease-in-out hover:bg-opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-opacity-50"
                  />
                ))}
            </CarouselThumbsContainer>
          </div>
        </div>
      </Carousel>
    </div>
  );
}
