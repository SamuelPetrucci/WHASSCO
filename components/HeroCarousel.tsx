"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

interface Slide {
  id: number;
  title: string;
  description: string;
  image: string;
  primaryButtonText: string;
  primaryButtonLink: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
}

const slides: Slide[] = [
  {
    id: 1,
    title: "Empowering Families, Supporting Youth, Celebrating Culture",
    description: "WHAASCO empowers families, supports youth, and celebrates African American culture through education, connection, and community engagement.",
    image: "/hero image.png",
    primaryButtonText: "Donate Now",
    primaryButtonLink: "/donate",
    secondaryButtonText: "Learn More",
    secondaryButtonLink: "/about",
  },
  {
    id: 2,
    title: "Building Strong Communities Together",
    description: "Since 1979, we've been dedicated to strengthening families, supporting children, and fostering pride in African American heritage and history.",
    image: "/heroimg3.png",
    primaryButtonText: "Get Involved",
    primaryButtonLink: "/contact",
    secondaryButtonText: "Our Programs",
    secondaryButtonLink: "/programs",
  },
  {
    id: 3,
    title: "Celebrating Heritage, Creating Impact",
    description: "Join us in promoting unity, cultural awareness, and community involvement through programs that make a lasting difference.",
    image: "/hero image.png", // Reusing first image for third slide
    primaryButtonText: "View History",
    primaryButtonLink: "/history",
    secondaryButtonText: "See Events",
    secondaryButtonLink: "/gallery",
  },
];

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    // Resume auto-play after 10 seconds
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  return (
    <section className="relative h-[600px] md:h-[700px] overflow-hidden">
      {/* Decorative Pan-African stripe pattern */}
      <div className="absolute top-0 left-0 right-0 h-2 flex z-30">
        <div className="flex-1 bg-african-green-500"></div>
        <div className="flex-1 bg-african-red-500"></div>
        <div className="flex-1 bg-african-black-900"></div>
        <div className="flex-1 bg-african-gold-500"></div>
      </div>

      {/* Carousel Slides */}
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            {/* Background Image with Overlay */}
            <div className="absolute inset-0">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                className="object-cover"
                priority={index === 0}
                quality={90}
                sizes="100vw"
              />
              {/* Overlay for better text readability */}
              <div className="absolute inset-0 bg-african-gradient-vertical opacity-70"></div>
            </div>

            {/* Content */}
            <div className="relative z-20 h-full flex items-center">
              <div className="container mx-auto px-4">
                <div
                  className={`max-w-3xl mx-auto text-center text-white transition-all duration-700 ${
                    index === currentSlide
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-10"
                  }`}
                >
                  <h1 className="text-4xl md:text-6xl font-bold mb-6 drop-shadow-lg">
                    {slide.title}
                  </h1>
                  <p className="text-xl md:text-2xl mb-8 text-white/90 drop-shadow-md">
                    {slide.description}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                      href={slide.primaryButtonLink}
                      className="bg-african-gold-500 text-african-black-900 px-8 py-4 rounded-lg font-semibold hover:bg-african-gold-400 transition-all duration-300 shadow-lg transform hover:scale-105 active:scale-95"
                    >
                      {slide.primaryButtonText}
                    </Link>
                    {slide.secondaryButtonText && slide.secondaryButtonLink && (
                      <Link
                        href={slide.secondaryButtonLink}
                        className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-all duration-300 transform hover:scale-105 active:scale-95"
                      >
                        {slide.secondaryButtonText}
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm"
        aria-label="Previous slide"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm"
        aria-label="Next slide"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 rounded-full ${
              index === currentSlide
                ? "w-10 h-3 bg-white"
                : "w-3 h-3 bg-white/50 hover:bg-white/75"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Bottom Wave SVG */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        <svg
          className="w-full h-12 fill-white"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" />
        </svg>
      </div>
    </section>
  );
}
