"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { carouselItems } from "@/data/carouselItems";

export default function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === carouselItems.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? carouselItems.length - 1 : prevIndex - 1
    );
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
    <div className="relative w-full overflow-hidden rounded-lg aspect-[4/1] max-w-7xl mx-auto">
      <div
        className="overflow-hidden relative"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="flex transition-transform duration-500"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
            width: "100%",
          }}
        >
          {carouselItems.map((item) => (
            <div
              key={item.id}
              className="relative w-full aspect-[4/1] flex-shrink-0"
            >
              {item.link ? (
                <Link href={item.link}>
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-contain"
                    unoptimized
                    priority
                  />
                </Link>
              ) : (
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-contain"
                  unoptimized
                  priority
                />
              )}
              {item.type === "pick_up" && item.title && (
                <div className="absolute bottom-7 sm:bottom-12 left-1/2 transform -translate-x-1/2 bg-black/70 text-white p-1 pb-0 rounded max-w-[90%] whitespace-pre-line text-sm sm:text-lg lg:text-2xl text-center">
                  {item.title}
                </div>
              )}
              {item.type === "pick_up" && item.description && (
                <div className="hidden sm:block absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 text-white p-1 pt-0 rounded max-w-[90%] whitespace-pre-line text-sm sm:text-lg lg:text-2xl text-center">
                  {item.description}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 좌우 버튼 */}
      <button
        onClick={handlePrev}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black/50 text-white rounded-full p-2 z-10"
      >
        ◀
      </button>
      <button
        onClick={handleNext}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black/50 text-white rounded-full p-2 z-10"
      >
        ▶
      </button>

      {/* 인디케이터 */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
        {carouselItems.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full ${
              index === currentIndex ? "bg-white" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
