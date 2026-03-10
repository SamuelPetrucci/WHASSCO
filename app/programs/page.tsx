import Image from "next/image";
import Link from "next/link";

const programs = [
  {
    id: "family-community",
    title: "Family & Community Programs",
    description:
      "Family-oriented social gatherings, community outreach, and engagement activities that build connections. Our community outreach connects us with local neighborhoods to identify needs and provide targeted support.",
    image: "/images/hero/communitygardenimage.webp",
    details: [
      "Regular community meetings and needs assessments",
      "Resource distribution and support services",
      "Partnership with local organizations",
      "Community events and engagement activities",
    ],
  },
  {
    id: "educational-enrichment",
    title: "Educational Enrichment",
    description:
      "We believe education is the foundation for lasting change. Our education and training programs provide individuals and families with the skills and knowledge they need to succeed.",
    image: "/images/hero/heroimage.webp",
    details: [
      "Skills development workshops",
      "Educational resources and materials",
      "Mentorship programs",
      "Career development support",
    ],
  },
  {
    id: "cultural-heritage",
    title: "Cultural & Heritage Events",
    description:
      "Cultural and heritage-based events that celebrate African American history and foster cultural pride. We also offer support services to help individuals and families navigate challenges and access resources.",
    image: "/images/hero/hero%20image.avif",
    details: [
      "Cultural celebrations and heritage events",
      "Counseling and guidance services",
      "Resource referrals and connections",
      "Long-term support and follow-up",
    ],
  },
];

export default function ProgramsPage() {
  return (
    <div className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 text-center">
            Our Programs
          </h1>
          <p className="text-lg text-gray-700 mb-12 text-center">
            Learn more about the programs we offer and how they make a difference
          </p>
          <div className="space-y-12">
            {programs.map((program) => (
              <section
                key={program.id}
                id={program.id}
                className="scroll-mt-24 bg-white rounded-xl overflow-hidden shadow-md border border-gray-200"
              >
                {program.image && (
                  <div className="relative w-full aspect-[21/9] bg-gray-200">
                    <Image
                      src={program.image}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 896px"
                    />
                  </div>
                )}
                <div className="p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    {program.title}
                  </h2>
                  <p className="text-gray-700 mb-6">{program.description}</p>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    Program components
                  </h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    {program.details.map((detail, idx) => (
                      <li key={idx}>{detail}</li>
                    ))}
                  </ul>
                </div>
              </section>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link
              href="/contact"
              className="inline-block bg-african-gradient text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-all shadow-md"
            >
              Get involved
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
