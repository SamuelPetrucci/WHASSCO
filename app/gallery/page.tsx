"use client";

import Image from "next/image";

const BLACK_BUSINESS_EXPO = {
  title: "Black Business Expo",
  date: "Saturday, February 28, 2026",
  time: "1:00 PM – 4:00 PM",
  location: "West Hartford Conference Center in Town Hall",
  address: "50 South Main Street, West Hartford, CT",
  infoUrl: "https://bit.ly/whbbe26",
  flyerImage: "/images/events/black-business-expo-flyer.png",
  sponsorLabel: "Champion Sponsor: PeoplesBank · Community Advocate Sponsors: NBT Bank, BUDR Cannabis, West Hartford, Westfield Bank",
};

export default function GalleryPage() {
  return (
    <div className="py-12 md:py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 text-center">
            Gallery & Events
          </h1>
          <p className="text-lg text-gray-700 mb-12 text-center">
            Explore WHAASCO events and community moments.
          </p>

          {/* Featured event: Black Business Expo */}
          <section className="mb-16">
            <article className="bg-white rounded-2xl shadow-lg border-t-4 border-african-gold-500 overflow-hidden">
              <div className="relative aspect-[3/4] sm:aspect-[4/3] max-h-[520px] w-full bg-gray-100">
                <Image
                  src={BLACK_BUSINESS_EXPO.flyerImage}
                  alt="Black Business Expo flyer – Saturday, February 28, 2026, West Hartford Conference Center"
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 896px"
                  priority
                />
              </div>
              <div className="p-6 md:p-8">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  {BLACK_BUSINESS_EXPO.title}
                </h2>
                <dl className="space-y-2 text-gray-700">
                  <div className="flex flex-wrap gap-x-2">
                    <dt className="font-semibold text-gray-900 shrink-0">Date:</dt>
                    <dd>{BLACK_BUSINESS_EXPO.date}</dd>
                  </div>
                  <div className="flex flex-wrap gap-x-2">
                    <dt className="font-semibold text-gray-900 shrink-0">Time:</dt>
                    <dd>{BLACK_BUSINESS_EXPO.time}</dd>
                  </div>
                  <div className="flex flex-wrap gap-x-2">
                    <dt className="font-semibold text-gray-900 shrink-0">Location:</dt>
                    <dd>{BLACK_BUSINESS_EXPO.location}</dd>
                  </div>
                  <div className="flex flex-wrap gap-x-2">
                    <dt className="font-semibold text-gray-900 shrink-0">Address:</dt>
                    <dd>{BLACK_BUSINESS_EXPO.address}</dd>
                  </div>
                </dl>
                <p className="text-sm text-gray-500 mt-4">
                  {BLACK_BUSINESS_EXPO.sponsorLabel}
                </p>
                <a
                  href={BLACK_BUSINESS_EXPO.infoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-6 bg-african-gradient text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-all shadow-md"
                >
                  More information →
                </a>
              </div>
            </article>
          </section>

          {/* Coming soon: more events & gallery */}
          <section className="bg-white rounded-2xl shadow-md border-t-4 border-primary-500 p-8 md:p-10 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary-100 flex items-center justify-center">
              <svg
                className="w-8 h-8 text-primary-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
              More events and gallery coming soon
            </h2>
            <p className="text-gray-600 max-w-lg mx-auto">
              Future events and photo galleries will appear here. Check back for highlights from the Black Business Expo and other WHAASCO programs.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
