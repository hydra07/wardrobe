'use client';
import {
  Carousel,
  CarouselIndicator,
  CarouselMainContainer,
  CarouselNext,
  CarouselPrevious,
  CarouselThumbsContainer,
  SliderMainItem,
} from '@/components/ui/carousel.extras';
import AutoScroll from 'embla-carousel-auto-scroll';
export default function TrendingCarousel() {
  return (
    <>
      <div className="flex flex-col">
        <h2 className="text-3xl font-semibold mb-4">Trending</h2>
        <Carousel
          plugins={[
            AutoScroll({
              speed: 5,
            }),
          ]}
          carouselOptions={{
            loop: true,
          }}
        >
          <CarouselNext />
          <CarouselPrevious />
          <div className="relative ">
            <CarouselMainContainer className="h-60">
              {Array.from({ length: 5 }).map((_, index) => (
                <SliderMainItem key={index} className="bg-transparent items-center flex">
                   <img src="./trending2.jpg"
                   className='object-center mt-14 '
                   />
                  {/*<div className="outline outline-1 outline-border size-full flex items-center justify-center rounded-xl bg-background">*/}
                  {/*  Slide {index + 1}*/}
                  {/*</div>*/}
                </SliderMainItem>
              ))}
            </CarouselMainContainer>
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2">
              <CarouselThumbsContainer className="gap-x-1 ">
                {Array.from({ length: 5 }).map((_, index) => (
                  <CarouselIndicator key={index} index={index} />
                ))}
              </CarouselThumbsContainer>
            </div>
          </div>
        </Carousel>
      </div>
    </>
  );
}
