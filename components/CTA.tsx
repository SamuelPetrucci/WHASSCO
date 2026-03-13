"use client";

import Link from "next/link";
import { useState } from "react";
import ContactModal from "./ContactModal";
import type { HomeContent } from "@/lib/content-types";

export default function CTA({ home }: { home?: HomeContent }) {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const title = home?.ctaTitle?.trim() || "Join Us in Making a Difference";
  const body =
    home?.ctaBody?.trim() ||
    "Your support helps us continue our mission and expand our impact. Whether you volunteer, donate, or spread the word, every contribution matters.";
  
  return (
    <section className="py-20 bg-african-black-900 text-white relative overflow-hidden">
      {/* Decorative Pan-African stripe pattern at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-2 flex">
        <div className="flex-1 bg-african-green-500"></div>
        <div className="flex-1 bg-african-red-500"></div>
        <div className="flex-1 bg-african-black-900"></div>
        <div className="flex-1 bg-african-gold-500"></div>
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {title}
          </h2>
          <p className="text-lg text-gray-300 mb-8">
            {body}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/donate"
              className="bg-african-gold-500 text-african-black-900 px-8 py-4 rounded-lg font-semibold hover:bg-african-gold-400 transition-colors shadow-lg transform hover:scale-105"
            >
              Make a Donation
            </Link>
            <Link
              href="/contact"
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-african-black-900 transition-colors"
            >
              Get Involved
            </Link>
          </div>
        </div>
      </div>
      
      {/* Contact Modal */}
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </section>
  );
}
