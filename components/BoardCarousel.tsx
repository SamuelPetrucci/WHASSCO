"use client";

import { useState, useRef, useCallback } from "react";
import BoardMemberCard from "./BoardMemberCard";

export interface BoardSlide {
  name: string;
  title: string;
  image?: string | null;
  bio?: string | null;
}

interface BoardCarouselProps {
  slides: BoardSlide[];
  className?: string;
}

const SWIPE_THRESHOLD = 50;

export default function BoardCarousel({ slides, className = "" }: BoardCarouselProps) {
  const [current, setCurrent] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const goTo = useCallback(
    (index: number) => {
      setCurrent(Math.max(0, Math.min(index, slides.length - 1)));
    },
    [slides.length]
  );

  const next = useCallback(() => {
    goTo(current + 1);
  }, [current, goTo]);

  const prev = useCallback(() => {
    goTo(current - 1);
  }, [current, goTo]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const onTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > SWIPE_THRESHOLD) {
      if (diff > 0) next();
      else prev();
    }
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div
        className="flex transition-transform duration-300 ease-out touch-pan-y"
        style={{ transform: `translateX(-${current * 100}%)` }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {slides.map((slide) => (
          <div
            key={slide.name}
            className="w-full flex-shrink-0 px-2 md:px-4"
            style={{ minWidth: "100%", maxWidth: "100%" }}
          >
            <BoardMemberCard
              name={slide.name}
              title={slide.title}
              image={slide.image}
              bio={slide.bio}
              className="max-w-sm mx-auto"
            />
          </div>
        ))}
      </div>

      {slides.length > 1 && (
        <>
          <button
            type="button"
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/90 shadow-lg flex items-center justify-center text-african-black-800 hover:bg-african-gold-500 hover:text-white transition-colors -translate-x-2 md:translate-x-2"
            aria-label="Previous member"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            type="button"
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/90 shadow-lg flex items-center justify-center text-african-black-800 hover:bg-african-gold-500 hover:text-white transition-colors translate-x-2 md:-translate-x-2"
            aria-label="Next member"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      {slides.length > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          {slides.map((slide, index) => (
            <button
              key={slide.name}
              type="button"
              onClick={() => goTo(index)}
              className={`w-2.5 h-2.5 rounded-full transition-colors ${
                index === current ? "bg-african-gold-500 w-8" : "bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to ${slide.name}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
