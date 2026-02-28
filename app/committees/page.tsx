import Link from "next/link";

export default function CommitteesPage() {
  return (
    <div className="bg-gray-50">
      {/* Hero */}
      <div className="relative w-full h-64 md:h-80 lg:h-96 bg-gradient-to-br from-primary-600 via-primary-500 to-african-gold-500 flex flex-col items-center justify-center px-6">
        <div className="relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
            WHAASCO Committees
          </h1>
          <p className="text-lg md:text-xl text-white/90 mt-2 max-w-2xl mx-auto">
            Our committees drive programs, events, and community impact across West Hartford.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 md:py-20">
        <div className="max-w-4xl mx-auto">
          <p className="text-lg text-gray-700 mb-12 text-center">
            WHAASCO's work is carried out through dedicated committees that focus on education, cultural events, youth development, and community outreach. Each committee welcomes volunteers who share our mission.
          </p>

          <div className="space-y-8">
            {/* Education Committee */}
            <div className="bg-white rounded-xl shadow-md p-6 md:p-8 border-l-4 border-primary-600">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Education Committee</h2>
              <p className="text-gray-700">
                Supports academic enrichment, tutoring programs, and parental involvement in education. Works with local schools to promote student success and cultural awareness.
              </p>
            </div>

            {/* Cultural & Heritage Committee */}
            <div className="bg-white rounded-xl shadow-md p-6 md:p-8 border-l-4 border-african-gold-500">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Cultural & Heritage Committee</h2>
              <p className="text-gray-700">
                Plans and hosts events that celebrate African American culture, history, and heritage. Organizes Juneteenth, Black History Month programs, and cultural workshops.
              </p>
            </div>

            {/* Youth Development Committee */}
            <div className="bg-white rounded-xl shadow-md p-6 md:p-8 border-l-4 border-african-red-600">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Youth Development Committee</h2>
              <p className="text-gray-700">
                Creates programs and activities that build leadership, self-esteem, and positive identity in young people. Supports youth enrichment, mentorship, and social events.
              </p>
            </div>

            {/* Community Outreach Committee */}
            <div className="bg-white rounded-xl shadow-md p-6 md:p-8 border-l-4 border-primary-600">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Community Outreach Committee</h2>
              <p className="text-gray-700">
                Connects WHAASCO with the broader West Hartford community. Fosters partnerships, coordinates volunteer efforts, and engages in advocacy and support initiatives.
              </p>
            </div>

            {/* Events Committee */}
            <div className="bg-white rounded-xl shadow-md p-6 md:p-8 border-l-4 border-african-gold-500">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Events Committee</h2>
              <p className="text-gray-700">
                Plans family-oriented social gatherings, fundraisers, and community celebrations. Coordinates logistics, venues, and volunteer support for WHAASCO events.
              </p>
            </div>
          </div>

          <div className="mt-12 bg-primary-50 p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Get Involved</h2>
            <p className="text-gray-700 mb-4">
              Interested in joining a committee? We welcome community members who want to contribute their time and skills. Share your interests and we'll help you find the right fit.
            </p>
            <Link
              href="/committees?join=1"
              className="inline-block bg-african-gradient text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-all shadow-md"
            >
              Interested in WHAASCO
            </Link>
            <p className="text-sm text-gray-600 mt-3">
              Click above to open our interest form, or <Link href="/contact" className="text-primary-600 hover:text-primary-700 font-semibold">contact us</Link> directly.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
