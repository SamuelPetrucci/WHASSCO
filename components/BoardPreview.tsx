"use client";

import { useMemo } from "react";
import Link from "next/link";
import ScrollAnimation from "./ScrollAnimation";
import type { BoardSlide } from "./BoardCarousel";
import BoardCarousel from "./BoardCarousel";

const BOARD_MEMBERS: { name: string; title: string; bio?: string }[] = [
  { name: "Kaleea Alston-Griffin", title: "President", bio: "Kaleea leads WHAASCO with a focus on family engagement and community partnerships. She is committed to creating inclusive spaces where youth and families can thrive and connect with African American heritage and culture." },
  { name: "Portia Wise Bachman", title: "Vice President", bio: "Portia brings experience in education and community organizing to her role. She works to strengthen WHAASCO's programs and support the next generation of leaders in West Hartford and beyond." },
  { name: "Bjorn Burke", title: "Treasurer", bio: "Bjorn oversees the organization's finances and helps ensure resources go directly to programs that support families and youth. He is dedicated to transparency and sustainable growth for WHAASCO." },
  { name: "Gayle Hooker", title: "Recording Secretary", bio: "Gayle keeps our meetings and records organized and helps the board communicate clearly with members and the community. Her attention to detail supports WHAASCO's day-to-day operations." },
  { name: "Karen Anderson", title: "Corresponding Secretary", bio: "Karen manages outreach and correspondence, connecting WHAASCO with families, partners, and the wider community. She helps share our mission and keep everyone informed and engaged." },
];

export default function BoardPreview() {
  const previewSlides: BoardSlide[] = useMemo(
    () => BOARD_MEMBERS.map((m) => ({ name: m.name, title: m.title, bio: m.bio ?? null })),
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
