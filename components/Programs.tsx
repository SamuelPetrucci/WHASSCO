import Image from "next/image";
import Link from "next/link";

const programs = [
  {
    slug: "educational-enrichment",
    title: "Educational Enrichment",
    description:
      "Educational enrichment activities that support academic success and personal growth for children and families.",
    image: "/images/hero/heroimage.webp",
    accent: "text-primary-600",
  },
  {
    slug: "cultural-heritage",
    title: "Cultural & Heritage Events",
    description:
      "Cultural and heritage-based events that celebrate African American history and foster cultural pride.",
    image: "/images/hero/hero%20image.avif",
    accent: "text-african-red-600",
  },
  {
    slug: "family-community",
    title: "Family & Community Programs",
    description:
      "Family-oriented social gatherings, community outreach, and engagement activities that build connections.",
    image: "/images/hero/communitygardenimage.webp",
    accent: "text-african-gold-600",
  },
];

export default function Programs() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Programs
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            WHAASCO offers a variety of programs designed to support families and children, including educational enrichment, cultural events, and community engagement activities.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {programs.map((program) => (
            <article
              key={program.slug}
              className="bg-gray-50 rounded-xl overflow-hidden hover:shadow-lg transition-shadow border border-gray-200 flex flex-col"
            >
              {program.image && (
                <div className="relative w-full aspect-[4/3] bg-gray-200 shrink-0">
                  <Image
                    src={program.image}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
              )}
              <div className="p-6 flex flex-col flex-1">
                <h3 className={`text-xl font-semibold text-african-black-900 mb-3 ${program.accent}`}>
                  {program.title}
                </h3>
                <p className="text-gray-700 mb-5 flex-1">{program.description}</p>
                <Link
                  href={`/programs#${program.slug}`}
                  className="inline-flex items-center justify-center gap-2 bg-primary-600 text-white px-4 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors text-sm"
                >
                  Learn more
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
