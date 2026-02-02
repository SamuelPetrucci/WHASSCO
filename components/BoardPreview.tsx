"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import ScrollAnimation from "./ScrollAnimation";
import type { BoardSlide } from "./BoardCarousel";
import BoardCarousel from "./BoardCarousel";
import ContactModal from "./ContactModal";

export default function BoardPreview() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  const previewSlides: BoardSlide[] = useMemo(
    () => [
      {
        title: "Our Board",
        description:
          "WHAASCO's board is made up of dedicated community leaders who guide our mission. Board member profiles and photos will be shared here soon.",
        icon: "users",
      },
      {
        title: "Community Leadership",
        description:
          "Our board brings together experience in education, culture, and community advocacy to serve West Hartford and create an inclusive environment.",
        icon: "heart",
      },
      {
        title: "Get Involved",
        description:
          "Interested in joining the board or learning more? We welcome community members who share our vision. Reach out to find out how you can contribute.",
        icon: "handshake",
        ctaText: "Contact Us",
        ctaOnClick: () => setIsContactOpen(true),
      },
    ],
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
                The leaders who guide WHAASCO's mission. Swipe or use the arrows to explore.
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
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </section>
  );
}
