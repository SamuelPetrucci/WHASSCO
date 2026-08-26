"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef, useCallback } from "react";
import type { HeroSlide } from "@/lib/content-types";

const SWIPE_THRESHOLD = 50;

function isExternalHref(href: string): boolean {
  return /^https?:\/\//i.test(href.trim());
}

function HeroCtaLink({
  href,
  className,
  children,
}: {
  href: string;
  className: string;
  children: React.ReactNode;
}) {
  if (isExternalHref(href)) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

const defaultSlides: HeroSlide[] = [
  {
    id: 5,
    title: "Beyond the Ballot",
    description:
      "A community conversation on civic engagement. Monday, Sept 21, 2026 · 6:00–7:30 PM at Noah Webster Library.",
    image: "/images/events/event2.jpeg",
    primaryButtonText: "Register today!",
    primaryButtonLink: "https://shorturl.at/D6dDC",
    secondaryButtonText: "Event details",
    secondaryButtonLink: "/gallery",
  },
  {
    id: 1,
    title: "Empowering Families, Supporting Youth, Celebrating Culture",
    description: "Empowering families, supporting youth, and celebrating African American culture through education and community.",
    image: "/images/hero/heroimage.webp",
    primaryButtonText: "Donate Now",
    primaryButtonLink: "/donate",
    secondaryButtonText: "Learn More",
    secondaryButtonLink: "/about",
  },
  {
    id: 2,
    title: "Building Strong Communities Together",
    description: "Since 1979, we've been dedicated to strengthening families, supporting children, and fostering pride in African American heritage and history.",
    image: "/images/hero/communitygardenimage.webp",
    primaryButtonText: "Get Involved",
    primaryButtonLink: "/contact",
    secondaryButtonText: "Our Programs",
    secondaryButtonLink: "/programs",
  },
  {
    id: 3,
    title: "Celebrating Heritage, Creating Impact",
    description: "Join us in promoting unity, cultural awareness, and community involvement through programs that make a lasting difference.",
    image: "/images/hero/hero%20image.avif",
    primaryButtonText: "View History",
    primaryButtonLink: "/history",
    secondaryButtonText: "See Events",
    secondaryButtonLink: "/gallery",
  },
  {
    id: 4,
    title: "Rooted in West Hartford",
    description: "From the flagpoles to the stone wall, WHAASCO’s work is grounded in the West Hartford community we call home.",
    image: "/westhartfordlogosign.png",
    primaryButtonText: "About WHAASCO",
    primaryButtonLink: "/about",
    secondaryButtonText: "Gallery & Events",
    secondaryButtonLink: "/gallery",
  },
];

interface HeroCarouselProps {
  slides?: HeroSlide[] | null;
}

export default function HeroCarousel({ slides: slidesProp }: HeroCarouselProps) {
  const slides = slidesProp?.length ? slidesProp : defaultSlides;
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  useEffect(() => {
    setCurrentSlide(0);
  }, [slides.length]);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, slides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    // Resume auto-play after 10 seconds
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  }, [slides.length]);
  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  }, [slides.length]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };
  const onTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };
  const onTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > SWIPE_THRESHOLD) {
      if (diff > 0) nextSlide();
      else prevSlide();
    }
  };

  return (
    <section
      className="relative w-full overflow-hidden touch-pan-y min-h-[58vh] sm:min-h-[52vh] md:h-[620px] lg:h-[680px]"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Decorative Pan-African stripe pattern */}
      <div className="absolute top-0 left-0 right-0 h-2 flex z-30">
        <div className="flex-1 bg-african-green-500" />
        <div className="flex-1 bg-african-red-500" />
        <div className="flex-1 bg-african-black-900" />
        <div className="flex-1 bg-african-gold-500" />
      </div>

      {/* Carousel slides — full bleed, object-cover + object-center = no stretch */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <div className="absolute inset-0">
              {slide.image?.trim() ? (
                <Image
                  src={slide.image}
                  alt={slide.title || "Hero slide"}
                  fill
                  className="object-cover object-center"
                  priority={index === 0}
                  quality={90}
                  sizes="100vw"
                />
              ) : (
                <div className="absolute inset-0 bg-african-black-900" aria-hidden />
              )}
              <div className="absolute inset-0 bg-african-gradient-vertical opacity-70" />
            </div>
          </div>
        ))}
      </div>

      {/* Content — single block for current slide, responsive type and padding for mobile */}
      {(() => {
        const slide = slides[currentSlide];
        return (
          <div className="relative z-20 h-full min-h-[58vh] sm:min-h-[52vh] md:min-h-0 md:h-full flex items-center">
            <div className="container mx-auto px-4 py-12 sm:py-16 md:py-0 md:flex md:items-center w-full">
              <div className="max-w-3xl mx-auto text-center text-white">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 md:mb-6 drop-shadow-lg leading-tight">
                  {slide.title}
                </h1>
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-5 sm:mb-6 md:mb-8 text-white/90 drop-shadow-md line-clamp-3 sm:line-clamp-none">
                  {slide.description}
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                  <HeroCtaLink
                    href={slide.primaryButtonLink}
                    className="bg-african-gold-500 text-african-black-900 px-6 py-3 sm:px-8 sm:py-4 rounded-lg font-semibold hover:bg-african-gold-400 transition-all duration-300 shadow-lg active:scale-95 text-sm sm:text-base"
                  >
                    {slide.primaryButtonText}
                  </HeroCtaLink>
                  {slide.secondaryButtonText && slide.secondaryButtonLink && (
                    <HeroCtaLink
                      href={slide.secondaryButtonLink}
                      className="bg-transparent border-2 border-white text-white px-6 py-3 sm:px-8 sm:py-4 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-all duration-300 active:scale-95 text-sm sm:text-base"
                    >
                      {slide.secondaryButtonText}
                    </HeroCtaLink>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* Bottom bar */}
      <div className="absolute bottom-4 sm:bottom-6 left-0 right-0 z-30 flex items-center justify-between px-3 sm:px-6 md:px-8">
        <button
          onClick={prevSlide}
          className="bg-white/25 hover:bg-white/40 text-white p-2 sm:p-2.5 rounded-full transition-all duration-300 backdrop-blur-sm shrink-0"
          aria-label="Previous slide"
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div className="flex flex-col items-center gap-1">
          <span className="text-white/90 text-xs sm:text-sm font-medium">
            {currentSlide + 1} of {slides.length}
          </span>
          <div className="flex gap-1.5 sm:gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => goToSlide(i)}
                className={`transition-all duration-300 rounded-full ${
                  currentSlide === i ? "w-6 sm:w-8 h-2 sm:h-2.5 bg-white" : "w-2 h-2 sm:w-2.5 sm:h-2.5 bg-white/50 hover:bg-white/75"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
        <button
          onClick={nextSlide}
          className="bg-white/25 hover:bg-white/40 text-white p-2 sm:p-2.5 rounded-full transition-all duration-300 backdrop-blur-sm shrink-0"
          aria-label="Next slide"
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        <svg className="w-full h-8 sm:h-10 md:h-12 fill-white" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" />
        </svg>
      </div>
    </section>
  );
}
