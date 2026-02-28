"use client";

import { useMemo } from "react";
import Link from "next/link";
import ScrollAnimation from "./ScrollAnimation";
import type { BoardSlide } from "./BoardCarousel";
import BoardCarousel from "./BoardCarousel";

const BOARD_MEMBERS: { name: string; title: string }[] = [
  { name: "Kaleea Alston-Griffin", title: "President" },
  { name: "Portia Wise Bachman", title: "Vice President" },
  { name: "Bjorn Burke", title: "Treasurer" },
  { name: "Gayle Hooker", title: "Recording Secretary" },
  { name: "Karen Anderson", title: "Corresponding Secretary" },
];

export default function BoardPreview() {
  const previewSlides: BoardSlide[] = useMemo(
    () => BOARD_MEMBERS.map((m) => ({ name: m.name, title: m.title })),
    []
  );

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <ScrollAnimation direction="fade">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Our Board
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Meet the leaders who guide WHAASCO. Swipe to explore, or visit our full board page to see everyone.
              </p>
            </div>
          </ScrollAnimation>

          <BoardCarousel slides={previewSlides} className="mb-12" />

          <ScrollAnimation direction="fade" delay={200}>
            <div className="text-center">
              <Link
                href="/board"
                className="inline-block bg-african-gradient text-white px-8 py-4 rounded-lg font-semibold hover:opacity-90 transition-all shadow-md"
              >
                Learn More About Our Board
              </Link>
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  );
}
