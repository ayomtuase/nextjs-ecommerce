"use client";

import useWindowSize from "@/hooks/use-window-size";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import { type Swiper as SwiperType } from "swiper/types";
import { Button } from "./ui/button";

interface Props {
  gallery: string[];
  productName: string;
}

const ThumbnailCarousel = ({ gallery, productName }: Props) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const galleryRef = useRef<SwiperRef>(null);

  const prevId = "prev-swiper-btn";
  const nextId = "next-swiper-btn";

  const prevThumbnailId = "prev-thumbnail-id";
  const nextThumbnailId = "next-thumbnail-id";

  const { width } = useWindowSize();

  return (
    <div className="w-full xl:flex xl:flex-row-reverse">
      <div
        className={cn(
          "w-full xl:ms-5 mb-2.5 md:mb-3 border border-skin-base overflow-hidden rounded-md relative"
        )}
      >
        <Swiper
          id="productGallery"
          ref={galleryRef}
          thumbs={{
            swiper:
              thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
          }}
          modules={[FreeMode, Navigation, Thumbs]}
          navigation={{
            prevEl: `#${prevId}`,
            nextEl: `#${nextId}`,
          }}
          slidesPerView={1}
          spaceBetween={0}
          className="flex"
        >
          {gallery?.map((item, id: number) => (
            <SwiperSlide
              key={`product-gallery-${id}`}
              className="flex items-center justify-center"
            >
              <div className="w-full h-[500px] sm:h-[680px] rounded-lg relative">
                <Image src={item} fill alt={`${productName} Image`} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="flex items-center justify-between w-full absolute top-2/4 z-10 px-2.5">
          <Button
            className={cn(
              "rounded-full absolute top-1/2 opacity-80 translate-y-[-50%] z-10 bg-primary text-white w-12 h-12 flex items-center justify-center p-0"
            )}
            id={prevId}
            title="Previous"
          >
            <ChevronLeft size={30} />
          </Button>
          <Button
            title="Next"
            id={nextId}
            className={cn(
              "rounded-full absolute top-1/2 opacity-80 right-2.5 translate-y-[-50%] z-10 bg-primary text-white w-12 h-12 flex items-center justify-center p-0"
            )}
          >
            <ChevronRight size={30} />
          </Button>
        </div>
      </div>
      {/* End of product main slider */}
      <div className="mr-2 max-h-[680px] flex-shrink-0 relative">
        <Swiper
          id="productGalleryThumbs"
          onSwiper={setThumbsSwiper}
          direction={
            width ? (width >= 1280 ? "vertical" : "horizontal") : "vertical"
          }
          className="h-auto lg:h-full"
          spaceBetween={10}
          navigation={{
            prevEl: `#${prevThumbnailId}`,
            nextEl: `#${nextThumbnailId}`,
          }}
          modules={[FreeMode, Navigation, Thumbs]}
          watchSlidesProgress={true}
          freeMode={true}
          breakpoints={{
            "0": {
              slidesPerView: 3,
            },
            "1024": {
              slidesPerView: 5,
            },
          }}
        >
          {gallery?.map((item, id) => (
            <SwiperSlide
              key={`product-thumb-gallery-${id}`}
              className="flex items-center justify-center cursor-pointer rounded overflow-hidden border  transition hover:opacity-75"
            >
              <div className="w-full xl:w-[120px] h-[90px] sm:h-[120px]">
                <Image src={item} fill alt={`Product thumb gallery ${id}`} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <>
          <Button
            aria-label="Previous"
            id={prevThumbnailId}
            className="w-7 -translate-y-1/2 xl:translate-y-0 xl:left-1/2 xl:-translate-x-1/2 xl:rotate-90 absolute top-1/2 xl:top-[10px] z-10 h-7 md:w-8 md:h-8 lg:w-9 lg:h-9 xl:w-10 xl:h-10 text-base lg:text-lg xl:text-xl flex items-center cursor-pointer justify-center rounded-full transition duration-300 focus:outline-none p-0"
          >
            <ChevronLeft size={24} />
          </Button>
          <Button
            aria-label="Next"
            id={nextThumbnailId}
            className="w-7 z-10 absolute translate-y-1/2 xl:translate-y-0 xl:-translate-x-1/2 xl:left-1/2 xl:rotate-90 right-2.5 bottom-1/2 xl:bottom-2.5 h-7 md:w-8 md:h-8 lg:w-9 lg:h-9 xl:w-10 xl:h-10 text-base lg:text-lg xl:text-xl flex items-center justify-center cursor-pointer rounded-full transition duration-300 hover:bg-skin-primary hover:text-skin-inverted focus:outline-none p-0"
          >
            <ChevronRight size={24} />
          </Button>
        </>
      </div>
    </div>
  );
};

export default ThumbnailCarousel;
