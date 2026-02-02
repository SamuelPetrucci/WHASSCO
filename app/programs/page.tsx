export default function ProgramsPage() {
  const programs = [
    {
      title: "Community Outreach",
      description:
        "Our community outreach program connects us with local neighborhoods to identify needs and provide targeted support. We work closely with community leaders and residents to ensure our efforts align with actual needs.",
      details: [
        "Regular community meetings and needs assessments",
        "Resource distribution and support services",
        "Partnership with local organizations",
        "Community events and engagement activities",
      ],
    },
    {
      title: "Education & Training",
      description:
        "We believe education is the foundation for lasting change. Our education and training programs provide individuals with the skills and knowledge they need to succeed.",
      details: [
        "Skills development workshops",
        "Educational resources and materials",
        "Mentorship programs",
        "Career development support",
      ],
    },
    {
      title: "Support Services",
      description:
        "Our support services help individuals and families navigate challenges and access the resources they need to thrive.",
      details: [
        "Counseling and guidance services",
        "Resource referrals and connections",
        "Emergency assistance programs",
        "Long-term support and follow-up",
      ],
    },
  ];

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
            {programs.map((program, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-lg shadow-md border border-gray-200"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  {program.title}
                </h2>
                <p className="text-gray-700 mb-6">{program.description}</p>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Program Components:
                </h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  {program.details.map((detail, idx) => (
                    <li key={idx}>{detail}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
