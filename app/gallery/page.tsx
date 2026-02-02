"use client";

import { useState } from "react";

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = ["all", "events", "community", "programs"];

  const events = [
    {
      id: 1,
      title: "Community Celebration",
      date: "2024-12-15",
      location: "West Hartford Community Center",
      description:
        "Join us for our annual community celebration featuring food, music, and activities for all ages.",
      image: "/images/gallery/event1.jpg",
      category: "events",
    },
    {
      id: 2,
      title: "Educational Workshop",
      date: "2024-11-20",
      location: "Virtual Event",
      description:
        "Free educational workshop on financial literacy and career development.",
      image: "/images/gallery/event2.jpg",
      category: "events",
    },
    {
      id: 3,
      title: "Youth Program Launch",
      date: "2024-10-10",
      location: "West Hartford Library",
      description:
        "Launch of our new youth mentorship program with community partners.",
      image: "/images/gallery/event3.jpg",
      category: "programs",
    },
  ];

  const galleryImages = [
    {
      id: 1,
      src: "/images/gallery/gallery1.jpg",
      alt: "Community event photo",
      category: "community",
    },
    {
      id: 2,
      src: "/images/gallery/gallery2.jpg",
      alt: "Program activity",
      category: "programs",
    },
    {
      id: 3,
      src: "/images/gallery/gallery3.jpg",
      alt: "Community gathering",
      category: "community",
    },
    {
      id: 4,
      src: "/images/gallery/gallery4.jpg",
      alt: "Event photo",
      category: "events",
    },
    {
      id: 5,
      src: "/images/gallery/gallery5.jpg",
      alt: "Program workshop",
      category: "programs",
    },
    {
      id: 6,
      src: "/images/gallery/gallery6.jpg",
      alt: "Community celebration",
      category: "community",
    },
  ];

  const filteredImages =
    selectedCategory === "all"
      ? galleryImages
      : galleryImages.filter((img) => img.category === selectedCategory);

  const filteredEvents =
    selectedCategory === "all" || selectedCategory === "events"
      ? events
      : events.filter((event) => event.category === selectedCategory);

  return (
    <div className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 text-center">
            Gallery & Events
          </h1>
          <p className="text-lg text-gray-700 mb-12 text-center max-w-3xl mx-auto">
            Explore our community events, programs, and moments that showcase the
            impact of WHAASCO's work.
          </p>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-lg font-semibold transition-colors capitalize ${
                  selectedCategory === category
                    ? "bg-primary-600 text-white shadow-md"
                    : "bg-white text-gray-700 hover:bg-primary-50 border border-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Upcoming Events Section */}
          {(selectedCategory === "all" || selectedCategory === "events") && (
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                Upcoming Events
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredEvents.map((event) => (
                  <div
                    key={event.id}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <div className="aspect-video bg-gray-200 relative overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                        <svg
                          className="w-16 h-16"
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
                      {/* Uncomment when images are available */}
                      {/* <Image
                        src={event.image}
                        alt={event.title}
                        fill
                        className="object-cover"
                      /> */}
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {event.title}
                      </h3>
                      <div className="flex items-center text-gray-600 text-sm mb-2">
                        <svg
                          className="w-4 h-4 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        {new Date(event.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </div>
                      <div className="flex items-center text-gray-600 text-sm mb-4">
                        <svg
                          className="w-4 h-4 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        {event.location}
                      </div>
                      <p className="text-gray-700 text-sm">{event.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Photo Gallery Section */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Photo Gallery
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredImages.map((image) => (
                <div
                  key={image.id}
                  className="aspect-square bg-gray-200 rounded-lg overflow-hidden relative group cursor-pointer hover:opacity-90 transition-opacity"
                >
                  <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                    <svg
                      className="w-12 h-12"
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
                  {/* Uncomment when images are available */}
                  {/* <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  /> */}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
