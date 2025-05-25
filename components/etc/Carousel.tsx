"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { carouselItems } from "@/data/carouselItems";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const showCarousel = carouselItems.filter((item) => item.open !== false);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === showCarousel.length - 1 ? 0 : prevIndex + 1));
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? showCarousel.length - 1 : prevIndex - 1));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.changedTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (
      touchStartX.current !== null &&
      touchEndX.current !== null &&
      Math.abs(touchStartX.current - touchEndX.current) > 50
    ) {
      if (touchStartX.current > touchEndX.current) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="relative mx-auto aspect-[4/1] w-full max-w-7xl overflow-hidden rounded-lg">
      <div
        className="relative h-full w-full overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="flex h-full transition-transform duration-500"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {showCarousel.map((item) => (
            <div key={item.id} className="relative aspect-[4/1] w-full flex-shrink-0">
              {item.link ? (
                <Link href={item.link} className="relative block h-full w-full">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                    unoptimized
                    priority
                  />
                </Link>
              ) : (
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                  unoptimized
                  priority
                />
              )}
              {item.type === "pick_up" && item.title && (
                <div className="absolute bottom-7 left-1/2 max-w-[90%] -translate-x-1/2 transform whitespace-pre-line rounded bg-black/70 p-1 pb-0 text-center text-sm text-white sm:bottom-12 sm:text-lg lg:text-2xl">
                  {item.title}
                </div>
              )}
              {item.type === "pick_up" && item.description && (
                <div className="absolute bottom-4 left-1/2 hidden max-w-[90%] -translate-x-1/2 transform whitespace-pre-line rounded bg-black/70 p-1 pt-0 text-center text-sm text-white sm:block sm:text-lg lg:text-2xl">
                  {item.description}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* 좌우 버튼 */}
        <Button
          variant="ghost"
          size="icon"
          onClick={handlePrev}
          className="absolute left-2 top-1/2 z-10 h-5 w-5 -translate-y-1/2 transform bg-black/50 text-sm text-white sm:left-4 sm:h-10 sm:w-10 sm:text-base"
        >
          ◀
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleNext}
          className="absolute right-2 top-1/2 z-10 h-5 w-5 -translate-y-1/2 transform bg-black/50 text-sm text-white sm:right-4 sm:h-10 sm:w-10 sm:text-base"
        >
          ▶
        </Button>

        {/* 인디케이터 */}
        <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 transform space-x-2">
          {showCarousel.map((_, index) => (
            <div
              key={index}
              className={`rounded-full ${
                index === currentIndex ? "bg-white" : "bg-gray-400"
              } h-2 w-2 sm:h-3 sm:w-3`}
            />
          ))}
        </div>
      </div>
    </Card>
  );
}
