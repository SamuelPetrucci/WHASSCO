import Link from "next/link";

export default function HistoryPreview() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our History
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Since 1979, WHAASCO has been a cornerstone of the West Hartford community, advocating for families and celebrating African American heritage.
            </p>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-1 h-full bg-primary-200"></div>

            {/* Timeline items */}
            <div className="space-y-12">
              {/* 1979 - Formation */}
              <div className="relative flex items-center">
                <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-8 h-8 bg-primary-600 rounded-full border-4 border-white shadow-lg z-10"></div>
                <div className="ml-12 md:ml-0 md:w-1/2 md:pr-8">
                  <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-primary-500">
                    <div className="text-primary-600 font-bold text-lg mb-2">1979</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Formation of WHAASCO</h3>
                    <p className="text-gray-700">
                      A small group of African American residents came together to address community concerns and support each other. Mrs. Ida McKinney served as the first president.
                    </p>
                  </div>
                </div>
              </div>

              {/* 2003-2004 - Bristow Headstone */}
              <div className="relative flex items-center md:flex-row-reverse">
                <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-8 h-8 bg-african-red-600 rounded-full border-4 border-white shadow-lg z-10"></div>
                <div className="ml-12 md:ml-0 md:w-1/2 md:pl-8">
                  <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-african-red-500">
                    <div className="text-african-red-600 font-bold text-lg mb-2">2003-2004</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">The Bristow Headstone Project</h3>
                    <p className="text-gray-700">
                      WHAASCO members raised funds to replace the eroded headstone of Bristow, an enslaved person who purchased his freedom in 1776. This effort led to the naming of Bristow Middle School.
                    </p>
                  </div>
                </div>
              </div>

              {/* Today */}
              <div className="relative flex items-center">
                <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-8 h-8 bg-african-gold-500 rounded-full border-4 border-white shadow-lg z-10"></div>
                <div className="ml-12 md:ml-0 md:w-1/2 md:pr-8">
                  <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-african-gold-500">
                    <div className="text-african-gold-600 font-bold text-lg mb-2">Today</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Continuing Our Legacy</h3>
                    <p className="text-gray-700">
                      WHAASCO continues to empower families, support youth, and celebrate African American culture through educational programs, cultural events, and community advocacy.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-12">
            <Link
              href="/history"
              className="inline-block bg-african-gradient text-white px-8 py-4 rounded-lg font-semibold hover:opacity-90 transition-all shadow-md"
            >
              Explore Our Full History
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
