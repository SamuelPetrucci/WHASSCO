"use client";

import { useState, useMemo } from "react";
import BoardCarousel, { type BoardSlide } from "@/components/BoardCarousel";
import ContactModal from "@/components/ContactModal";

export default function BoardPage() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  const boardSlides: BoardSlide[] = useMemo(
    () => [
      {
        title: "Our Board",
        description:
          "WHAASCO's board is made up of dedicated community leaders who guide our mission to empower families, support youth, and celebrate African American culture. Board member profiles and photos will be shared here soon.",
        icon: "users",
      },
      {
        title: "Community Leadership",
        description:
          "Our board brings together experience in education, culture, and community advocacy to serve West Hartford. They work collaboratively with families, educators, and partners to create an inclusive environment.",
        icon: "heart",
      },
      {
        title: "Get Involved",
        description:
          "Interested in joining the board or learning more about leadership opportunities? We welcome community members who share our vision and values. Reach out to find out how you can contribute.",
        icon: "handshake",
        ctaText: "Contact Us",
        ctaOnClick: () => setIsContactOpen(true),
      },
    ],
    []
  );

  return (
    <div className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 text-center">
            Board Members
          </h1>
          <p className="text-lg text-gray-700 mb-12 text-center max-w-2xl mx-auto">
            The dedicated leaders who guide WHAASCO's mission and vision. Swipe or use the arrows to explore.
          </p>
          <BoardCarousel slides={boardSlides} />
        </div>
      </div>
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </div>
  );
}
