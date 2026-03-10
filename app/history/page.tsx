import Link from "next/link";
import Image from "next/image";

// Community meeting / heritage; legacy collaboration
const HISTORY_HERO =
  "https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=1200&q=80";
const HISTORY_LEGACY =
  "https://images.unsplash.com/photo-1582552938357-32c90648845c?w=800&q=80";

export default function HistoryPage() {
  return (
    <div className="bg-gray-50">
      {/* Hero image */}
      <div className="relative w-full h-64 md:h-80 lg:h-96">
        <Image
          src={HISTORY_HERO}
          alt="Community heritage and learning"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
            Our History
          </h1>
          <p className="text-lg md:text-xl text-white/90 mt-2 max-w-2xl">
            Decades of community advocacy, education, and cultural celebration.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 md:py-20">
        <div className="max-w-4xl mx-auto">
          
          {/* Formation Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b-4 border-primary-500 pb-2">
              Formation of WHAASCO
            </h2>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                In 1979, a small group of African American residents organized a protest to bring attention to a racist organization's rally at a local retail center in West Hartford. Also, parents of African American children in town were expressing concerns over common experiences their children were experiencing in school, particularly in the areas of teacher attitude, school receptivity, and parent involvement.
              </p>
              <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                To share their experiences and to discuss the stresses of living in a predominately white upper middle class suburb, African American residents felt the need to meet other African American residents on a continuing basis and to become acquainted with each other. Strategies were developed to cope with those stresses as well as friendships.
              </p>
              <p className="text-lg text-gray-700 font-semibold">
                <span className="text-primary-600">Mrs. Ida McKinney</span> was the first WHAASCO president.
              </p>
            </div>
          </section>

          {/* Community Advocacy Timeline */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b-4 border-african-red-500 pb-2">
              History of Community Advocacy
            </h2>
            <div className="bg-white p-8 rounded-lg shadow-md space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-3 h-3 bg-primary-600 rounded-full mt-2 mr-4"></div>
                <p className="text-gray-700">
                  Assumed a significant role in advocating for hiring qualified African American personnel for town employment including school teachers, fire fighters, police officers, etc.
                </p>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-3 h-3 bg-african-red-600 rounded-full mt-2 mr-4"></div>
                <p className="text-gray-700">
                  Invited and interacted with town officials where members' concerns relative to issues of African Americans were discussed.
                </p>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-3 h-3 bg-african-gold-600 rounded-full mt-2 mr-4"></div>
                <p className="text-gray-700">
                  Discussion of school curricula in regards to racial & cultural sensitivity and awareness.
                </p>
              </div>
            </div>
          </section>

          {/* Bristow Headstone Story */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b-4 border-african-gold-500 pb-2">
              A Significant Achievement: The Bristow Headstone
            </h2>
            <div className="rounded-xl overflow-hidden shadow-lg mb-6 aspect-video max-w-2xl relative">
              <Image
                src="/bristowmiddle.png"
                alt="Bristow Middle School in West Hartford"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 672px"
              />
              <div className="absolute inset-x-0 bottom-0 bg-black/65 text-white text-xs sm:text-sm md:text-base px-3 sm:px-4 py-2 text-center">
                Bristow Middle School &mdash; named in honor of Bristow&apos;s legacy in West Hartford
              </div>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md border-l-4 border-primary-500">
              <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                In 2003-2004, WHAASCO members raised money to replace the significantly eroded headstone of <strong>Bristow</strong>, the only known African American to have a headstone in the oldest cemetery in West Hartford, CT.
              </p>
              <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                Bristow was an enslaved person who purchased his own freedom from Thomas Hart Hooker for 60 pounds in 1776. Bristow was 44 years old.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                The high level of publicity and discussion in town around the headstone replacement efforts made Bristow's name a household word, which laid the foundation for the naming of the newly constructed middle school, <strong className="text-primary-600">Bristow Middle School</strong>.
              </p>
            </div>
          </section>

          {/* Program Topics */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b-4 border-primary-500 pb-2">
              Educational Programs & Topics
            </h2>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <p className="text-lg text-gray-700 mb-6">
                Over the years, WHAASCO has presented numerous educational programs, including:
              </p>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-primary-600 mr-3">•</span>
                  <span>"Public Education: Quality & Diversity - What does it mean for African American children in West Hartford & CT?"</span>
                </li>
                <li className="flex items-start">
                  <span className="text-african-red-600 mr-3">•</span>
                  <span>"Forgotten Souls: African Americans in Hartford's Ancient Burying Ground"</span>
                </li>
                <li className="flex items-start">
                  <span className="text-african-gold-600 mr-3">•</span>
                  <span>"The significance of the Amistad Incident to CT & U.S. History"</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 mr-3">•</span>
                  <span>"Southern Migration & the Transformation of Black Hartford, 1915-1949"</span>
                </li>
                <li className="flex items-start">
                  <span className="text-african-red-600 mr-3">•</span>
                  <span>"An Afternoon with a Tuskegee Airman", interview with Mr. Connie Nappier, Jr., a Tuskegee Airman & 2007 recipient of the Congressional Gold Medal</span>
                </li>
                <li className="flex items-start">
                  <span className="text-african-gold-600 mr-3">•</span>
                  <span>Video on the life of Frederick Douglass followed by a discussion</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 mr-3">•</span>
                  <span>Co-sponsored Candidates Night at West Hartford Town Hall Auditorium</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Social & Cultural Activities */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b-4 border-african-red-500 pb-2">
              Social & Cultural Activities
            </h2>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <p className="text-lg text-gray-700 mb-4">
                WHAASCO organizes various social and cultural activities including:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center">
                  <span className="text-primary-600 mr-3">•</span>
                  <span>Cookouts, holiday parties, restaurant trips</span>
                </li>
                <li className="flex items-center">
                  <span className="text-african-red-600 mr-3">•</span>
                  <span>Acknowledgements of significant life events</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Community Support */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b-4 border-african-gold-500 pb-2">
              Community Support & Outreach
            </h2>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <p className="text-lg text-gray-700 mb-4">
                WHAASCO has provided food and gift donations to:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center">
                  <span className="text-primary-600 mr-3">•</span>
                  <span>The West Hartford Food Pantry</span>
                </li>
                <li className="flex items-center">
                  <span className="text-african-red-600 mr-3">•</span>
                  <span>Hillcrest Area Neighborhood Outreach Center (West Hartford)</span>
                </li>
                <li className="flex items-center">
                  <span className="text-african-gold-600 mr-3">•</span>
                  <span>The Village for Families & Children, Inc. (Hartford)</span>
                </li>
                <li className="flex items-center">
                  <span className="text-primary-600 mr-3">•</span>
                  <span>St. Agnes Home, Inc. (West Hartford)</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Tribute to Earl Exum (summary with link to full tribute) */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b-4 border-primary-500 pb-2">
              A Tribute to Earl Exum
            </h2>
            <div className="bg-white p-8 rounded-lg shadow-md border-l-4 border-african-gold-500">
              <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                WHAASCO honors our past president <strong>Earl Exum</strong>, who served until his passing in October 2023. An Igbo proverb embodied Earl: &ldquo;If a man cooks for his community, his community will finish the food, but if a community cooks for a man, he can never finish the food.&rdquo;
              </p>
              <p className="text-gray-700 mb-4">
                The greater good of the community was always above that of one person. Earl&apos;s leadership at WHAASCO and beyond strengthened relationships, elevated history, and opened doors for future leaders.
              </p>
              <Link
                href="/earl-exum-tribute"
                className="inline-block mt-2 text-primary-600 hover:text-primary-700 font-semibold"
              >
                Read the full tribute to President Earl Exum &rarr;
              </Link>
            </div>
          </section>

          {/* Vision Statement */}
          <section className="mb-12">
            <div className="bg-african-gradient-vertical text-white p-8 rounded-lg shadow-lg">
              <h2 className="text-3xl font-bold mb-4">Our Vision</h2>
              <p className="text-lg leading-relaxed">
                We envision a thriving community where African American families are empowered, children are supported in reaching their full potential, and cultural heritage is celebrated and preserved.
              </p>
            </div>
          </section>

          {/* CTA */}
          <p className="text-sm text-gray-500 mb-6 text-right">Compiled by E.D. / February 2024</p>
          <div className="text-center">
            <Link
              href="/about"
              className="inline-block bg-african-gradient text-white px-8 py-4 rounded-lg font-semibold hover:opacity-90 transition-all shadow-md"
            >
              Learn More About Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
