"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="relative bg-african-gradient-vertical text-white py-20 md:py-32 overflow-hidden min-h-[600px] flex items-center">
      {/* Decorative Pan-African stripe pattern */}
      <div className="absolute top-0 left-0 right-0 h-2 flex z-20">
        <div className="flex-1 bg-african-green-500"></div>
        <div className="flex-1 bg-african-red-500"></div>
        <div className="flex-1 bg-african-black-900"></div>
        <div className="flex-1 bg-african-gold-500"></div>
      </div>

      {/* Background decorative images/patterns */}
      <div className="absolute inset-0 opacity-10">
        {/* Geometric patterns */}
        <div className="absolute top-20 left-10 w-32 h-32 border-4 border-white rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 border-4 border-white rotate-45"></div>
        <div className="absolute bottom-32 left-1/4 w-20 h-20 border-4 border-white rounded-full"></div>
        <div className="absolute bottom-20 right-1/3 w-28 h-28 border-4 border-white rotate-12"></div>
        
        {/* Pan-African color accents */}
        <div className="absolute top-1/4 left-1/4 w-16 h-16 bg-african-gold-500 rounded-full blur-xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-20 h-20 bg-primary-500 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 right-10 w-12 h-12 bg-african-red-500 rounded-full blur-lg"></div>
      </div>

      {/* Decorative lines */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="none">
          <path
            d="M0,400 Q300,200 600,400 T1200,400"
            stroke="white"
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M0,500 Q400,300 800,500 T1200,500"
            stroke="white"
            strokeWidth="2"
            fill="none"
          />
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className={`max-w-3xl mx-auto text-center transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h1 className={`text-4xl md:text-6xl font-bold mb-6 drop-shadow-lg fade-in`}>
            Empowering Families, Supporting Youth, Celebrating Culture
          </h1>
          <p className={`text-xl md:text-2xl mb-8 text-white/90 fade-in-delay-1`}>
            WHAASCO empowers families, supports youth, and celebrates African American culture through education, connection, and community engagement.
          </p>
          <div className={`flex flex-col sm:flex-row gap-4 justify-center fade-in-delay-2`}>
            <Link
              href="/donate"
              className="bg-african-gold-500 text-african-black-900 px-8 py-4 rounded-lg font-semibold hover:bg-african-gold-400 transition-all duration-300 shadow-lg transform hover:scale-105 active:scale-95"
            >
              Donate Now
            </Link>
            <Link
              href="/about"
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-all duration-300 transform hover:scale-105 active:scale-95"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0">
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
