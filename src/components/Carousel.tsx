"use client";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useCallback, useEffect, useState } from "react";

interface CarouselProps {
  photos: string[];
}

export default function Carousel({ photos }: CarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { 
      loop: true,
      dragFree: false,
      containScroll: 'trimSnaps',
      skipSnaps: false,
    }, 
    [
      Autoplay({ delay: 4000, stopOnInteraction: true }),
    ]
  );
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  return (
    <div className="relative w-full max-w-5xl mx-auto">
      {/* Carousel */}
      <div className="overflow-hidden rounded-2xl md:rounded-3xl shadow-lg md:shadow-xl cursor-grab active:cursor-grabbing" ref={emblaRef}>
        <div className="flex select-none" style={{ touchAction: 'pan-y pinch-zoom' }}>
          {photos.map((photo, index) => (
            <div
              key={index}
              className="flex-[0_0_100%] min-w-0 relative aspect-[16/9] md:aspect-[21/9]"
            >
              <img
                src={photo}
                alt={`Party photo ${index + 1}`}
                className="w-full h-full object-cover"
                loading={index === 0 ? "eager" : "lazy"}
              />
              {/* Soft overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-lavender/20 to-transparent pointer-events-none" />
            </div>
          ))}
        </div>
      </div>

      {/* Dot indicators */}
      <div className="flex justify-center gap-2 mt-3 md:mt-4">
        {photos.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={`w-2 h-2 md:w-2.5 md:h-2.5 rounded-full transition-all duration-300 touch-manipulation ${
              index === selectedIndex
                ? "bg-lavender scale-125"
                : "bg-lavender/30 hover:bg-lavender/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
