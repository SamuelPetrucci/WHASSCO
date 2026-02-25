"use client";

import Image from "next/image";
import { useState } from "react";

export interface BoardMemberCardProps {
  name: string;
  title: string;
  bio?: string | null;
  image?: string | null;
  className?: string;
  /** When set, show this many characters of bio on the front (for grid layout). */
  bioExcerptLength?: number;
}

export default function BoardMemberCard({
  name,
  title,
  bio,
  image,
  className = "",
  bioExcerptLength,
}: BoardMemberCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const hasBio = bio && bio.trim();
  const excerpt = hasBio && bioExcerptLength != null
    ? bio.length <= bioExcerptLength ? bio : `${bio.slice(0, bioExcerptLength).trim()}…`
    : null;
  const showExcerptOnFront = excerpt != null;

  return (
    <div
      className={`w-full max-w-md mx-auto ${className}`}
      style={{ perspective: "1000px" }}
    >
      <button
        type="button"
        onClick={() => setIsFlipped((f) => !f)}
        className={`w-full h-full relative preserve-3d block ${showExcerptOnFront ? "min-h-[320px] md:min-h-[360px]" : "min-h-[380px] md:min-h-[440px]"}`}
        style={{ transformStyle: "preserve-3d" }}
        aria-label={isFlipped ? `Flip card back to see ${name}` : `Flip card to learn more about ${name}`}
      >
        <div
          className="relative w-full h-full transition-transform duration-500 ease-in-out"
          style={{
            transformStyle: "preserve-3d",
            transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
          }}
        >
          {/* Front */}
          <div
            className="absolute inset-0 bg-white rounded-2xl shadow-xl border-t-4 border-african-gold-500 overflow-hidden backface-hidden flex flex-col items-center justify-between p-8 md:p-10 text-center"
            style={{ backfaceVisibility: "hidden" }}
          >
            <div className="flex flex-col items-center flex-1 justify-center">
              {image ? (
                <div className="relative w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden mb-5 bg-gray-100 flex-shrink-0">
                  <Image
                    src={image}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="144px"
                  />
                </div>
              ) : (
                <div className="w-28 h-28 md:w-36 md:h-36 rounded-full bg-primary-100 flex items-center justify-center mb-5 flex-shrink-0">
                  <svg
                    className="w-14 h-14 md:w-16 md:h-16 text-primary-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
              )}
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                {name}
              </h3>
              <p className="text-primary-600 font-semibold text-lg">
                {title}
              </p>
              {showExcerptOnFront && (
                <p className="text-gray-600 text-sm md:text-base mt-3 line-clamp-3 text-left w-full">
                  {excerpt}
                </p>
              )}
            </div>
            <div className="pt-4 border-t border-gray-100 w-full">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-african-gold-500/15 text-african-gold-700 font-medium text-sm">
                <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                {hasBio && !showExcerptOnFront ? "Click to learn more" : (hasBio ? "Click to read full bio" : "Click to flip")}
              </span>
            </div>
          </div>

          {/* Back */}
          <div
            className="absolute inset-0 bg-primary-50 rounded-2xl shadow-xl border-t-4 border-african-gold-500 overflow-hidden backface-hidden flex flex-col p-8 md:p-10 text-left"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-1 text-center">
              {name}
            </h3>
            <p className="text-primary-600 font-semibold text-center mb-5">
              {title}
            </p>
            <div className="flex-1 overflow-y-auto text-gray-700 leading-relaxed text-base min-h-0">
              {bio && bio.trim() ? (
                <p>{bio}</p>
              ) : (
                <p className="text-gray-500 italic">
                  More about {name.split(" ")[0]} coming soon.
                </p>
              )}
            </div>
            <div className="pt-4 mt-4 border-t border-primary-200 text-center">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-200/50 text-primary-800 font-medium text-sm">
                <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Click to flip back
              </span>
            </div>
          </div>
        </div>
      </button>
    </div>
  );
}
