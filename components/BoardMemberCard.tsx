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
  /** When true, card fills its container (for carousel square layout). */
  fillContainer?: boolean;
}

export default function BoardMemberCard({
  name,
  title,
  bio,
  image,
  className = "",
  bioExcerptLength,
  fillContainer = false,
}: BoardMemberCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const hasBio = bio && bio.trim();
  const excerpt = hasBio && bioExcerptLength != null
    ? bio.length <= bioExcerptLength ? bio : `${bio.slice(0, bioExcerptLength).trim()}…`
    : null;
  const showExcerptOnFront = excerpt != null;

  return (
    <div
      className={`${fillContainer ? "w-full h-full min-w-0 min-h-0" : "w-full max-w-md mx-auto"} ${className}`}
      style={{ perspective: "1000px" }}
    >
      <button
        type="button"
        onClick={() => setIsFlipped((f) => !f)}
        className={`relative preserve-3d block w-full ${fillContainer ? "h-full min-h-0" : `h-full ${showExcerptOnFront ? "min-h-[320px] md:min-h-[360px]" : "min-h-[380px] md:min-h-[440px]"}`}`}
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
            className={`absolute inset-0 bg-white rounded-2xl shadow-xl border-t-4 border-african-gold-500 overflow-hidden backface-hidden flex flex-col items-center justify-between text-center ${fillContainer ? "p-4 md:p-5" : "p-8 md:p-10"}`}
            style={{ backfaceVisibility: "hidden" }}
          >
            <div className="flex flex-col items-center flex-1 justify-center min-h-0">
              {image ? (
                <div className={`relative rounded-full overflow-hidden bg-gray-100 flex-shrink-0 ${fillContainer ? "w-16 h-16 md:w-20 md:h-20 mb-2" : "w-28 h-28 md:w-36 md:h-36 mb-5"}`}>
                  <Image
                    src={image}
                    alt=""
                    fill
                    className="object-cover"
                    sizes={fillContainer ? "80px" : "144px"}
                  />
                </div>
              ) : (
                <div className={`rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0 ${fillContainer ? "w-16 h-16 md:w-20 md:h-20 mb-2" : "w-28 h-28 md:w-36 md:h-36 mb-5"}`}>
                  <svg
                    className={fillContainer ? "w-8 h-8 md:w-10 md:h-10 text-primary-600" : "w-14 h-14 md:w-16 md:h-16 text-primary-600"}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              )}
              <h3 className={`font-bold text-gray-900 mb-1 ${fillContainer ? "text-lg md:text-xl" : "text-2xl md:text-3xl mb-2"}`}>
                {name}
              </h3>
              <p className={`text-primary-600 font-semibold ${fillContainer ? "text-sm" : "text-lg"}`}>
                {title}
              </p>
              {showExcerptOnFront && !fillContainer && (
                <p className="text-gray-600 text-sm md:text-base mt-3 line-clamp-3 text-left w-full">
                  {excerpt}
                </p>
              )}
            </div>
            {!fillContainer && (
            <div className="pt-4 border-t border-gray-100 w-full">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-african-gold-500/15 text-african-gold-700 font-medium text-sm">
                <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                {hasBio && !showExcerptOnFront ? "Click to learn more" : (hasBio ? "Click to read full bio" : "Click to flip")}
              </span>
            </div>
            )}
            {fillContainer && (
            <p className="text-xs text-gray-500 mt-1">Tap to flip</p>
            )}
          </div>

          {/* Back */}
          <div
            className={`absolute inset-0 bg-primary-50 rounded-2xl shadow-xl border-t-4 border-african-gold-500 overflow-hidden backface-hidden flex flex-col text-left ${fillContainer ? "p-4 md:p-5" : "p-8 md:p-10"}`}
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            <h3 className={`font-bold text-gray-900 mb-1 text-center ${fillContainer ? "text-base md:text-lg" : "text-xl md:text-2xl"}`}>
              {name}
            </h3>
            <p className={`text-primary-600 font-semibold text-center mb-3 ${fillContainer ? "text-xs" : "mb-5"}`}>
              {title}
            </p>
            <div className="flex-1 overflow-y-auto text-gray-700 leading-relaxed min-h-0">
              {bio && bio.trim() ? (
                <p className={fillContainer ? "text-xs" : "text-base"}>{bio}</p>
              ) : (
                <p className="text-gray-500 text-sm">
                  Bio not yet available.
                </p>
              )}
            </div>
            <div className={`pt-2 mt-2 border-t border-primary-200 text-center ${!fillContainer && "pt-4 mt-4"}`}>
              <span className={`inline-flex items-center gap-1 rounded-full bg-primary-200/50 text-primary-800 font-medium ${fillContainer ? "text-xs px-2 py-1" : "text-sm px-4 py-2"}`}>
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
