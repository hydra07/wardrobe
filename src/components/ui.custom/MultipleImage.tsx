import {
  Carousel,
  CarouselIndicator,
  CarouselMainContainer,
  CarouselThumbsContainer,
  SliderMainItem,
} from '../ui/carousel.extras';

export default function MultipleImage({ images }: any) {
  return (
    <>
      <Carousel>
        <div className="relative">
          <CarouselMainContainer className="">
            {Array.isArray(images) &&
              images.map((image, index) => (
                <SliderMainItem
                  key={index}
                  className="bg-transparent items-center flex"
                >
                  <img
                    src={image.url as string}
                    className="rounded-lg object-cover w-full aspect-square group-hover:opacity-50 transition-opacity"
                  />
                </SliderMainItem>
              ))}
          </CarouselMainContainer>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 h-3">
            <CarouselThumbsContainer className="gap-x-1 ">
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
