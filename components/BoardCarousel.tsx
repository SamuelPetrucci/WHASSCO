"use client";

import Link from "next/link";
import { useState, useRef, useCallback } from "react";

export interface BoardSlide {
  title: string;
  description: string;
  icon?: "users" | "heart" | "handshake" | "mail";
  ctaText?: string;
  ctaHref?: string;
  /** If set, CTA is a button that calls this instead of linking */
  ctaOnClick?: () => void;
}

interface BoardCarouselProps {
  slides: BoardSlide[];
  className?: string;
}

const icons = {
  users: (
    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  ),
  heart: (
    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  ),
  handshake: (
    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0m-3 6a1.5 1.5 0 013 0" />
    </svg>
  ),
  mail: (
    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
};

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
      {/* Slides container - swipeable via touch */}
      <div
        className="flex transition-transform duration-300 ease-out touch-pan-y"
        style={{ transform: `translateX(-${current * 100}%)` }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className="w-full flex-shrink-0 px-2 md:px-4"
            style={{ minWidth: "100%", maxWidth: "100%" }}
          >
            <div className="bg-white rounded-xl shadow-lg border-t-4 border-african-gold-500 p-8 md:p-10 text-center max-w-2xl mx-auto min-h-[280px] md:min-h-[320px] flex flex-col justify-center">
              <div className="text-primary-600 mb-6 flex justify-center">
                {slide.icon ? icons[slide.icon] : icons.users}
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                {slide.title}
              </h3>
              <p className="text-gray-700 mb-6 leading-relaxed">
                {slide.description}
              </p>
              {slide.ctaText && (slide.ctaHref || slide.ctaOnClick) && (
                slide.ctaOnClick ? (
                  <button
                    type="button"
                    onClick={slide.ctaOnClick}
                    className="inline-block bg-african-gradient text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-all shadow-md"
                  >
                    {slide.ctaText}
                  </button>
                ) : (
                  <Link
                    href={slide.ctaHref!}
                    className="inline-block bg-african-gradient text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-all shadow-md"
                  >
                    {slide.ctaText}
                  </Link>
                )
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Arrows */}
      {slides.length > 1 && (
        <>
          <button
            type="button"
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/90 shadow-lg flex items-center justify-center text-african-black-800 hover:bg-african-gold-500 hover:text-white transition-colors -translate-x-2 md:translate-x-2"
            aria-label="Previous slide"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            type="button"
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/90 shadow-lg flex items-center justify-center text-african-black-800 hover:bg-african-gold-500 hover:text-white transition-colors translate-x-2 md:-translate-x-2"
            aria-label="Next slide"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      {/* Dots */}
      {slides.length > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          {slides.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => goTo(index)}
              className={`w-2.5 h-2.5 rounded-full transition-colors ${
                index === current ? "bg-african-gold-500 w-8" : "bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
