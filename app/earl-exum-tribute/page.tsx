import Link from "next/link";

export default function EarlExumTributePage() {
  return (
    <div className="bg-gray-50">
      <div className="relative w-full h-64 md:h-80 lg:h-96 bg-gradient-to-br from-primary-700 via-primary-600 to-african-gold-500 flex items-center justify-center px-6">
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 text-center max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
            A Tribute to President Earl Exum
          </h1>
          <p className="text-lg md:text-xl text-white/90 mt-3">
            Honoring a leader whose vision, service, and hope for better communities continue to guide WHAASCO.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 md:py-20">
        <div className="max-w-4xl mx-auto space-y-10">
          <section className="bg-white p-8 rounded-lg shadow-md border-l-4 border-african-gold-500">
            <p className="text-lg text-gray-700 mb-4 leading-relaxed">
              WHAASCO honors our past president <strong>Earl Exum</strong>, who served until his passing in October 2023. An Igbo proverb embodied Earl:
            </p>
            <p className="text-lg text-gray-900 font-semibold italic mb-4">
              “If a man cooks for his community, his community will finish the food, but if a community cooks for a man, he can never finish the food.”
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              For Earl, the greater good of the community was always above that of one person. His leadership at WHAASCO and beyond reflected a deep belief
              in shared responsibility, service, and legacy.
            </p>
          </section>

          <section className="bg-white p-8 rounded-lg shadow-md space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Connecting Communities
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Below are just a few examples of the community reach of one man as WHAASCO&apos;s commanding leader and beyond:
            </p>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="text-primary-600 mr-2">•</span>
                <span>
                  Growing WHAASCO membership and broadening community engagement; instrumental in bringing{" "}
                  <strong>United with Jazz</strong> to fruition with the West Hartford Police Department, the Town of West Hartford, and Bridge—building
                  relationships between community and police in a social setting rather than a crisis.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-primary-600 mr-2">•</span>
                <span>
                  Recognizing the importance of history and place by supporting the installation of a memorial honoring{" "}
                  <strong>Lemuel Haynes</strong> on the grounds of First Church on the town green—lifting up the accomplishments of an African American man
                  born in West Hartford in 1755 and fostering inclusive community engagement.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-primary-600 mr-2">•</span>
                <span>
                  Championing the legacy of the <strong>Tuskegee Airmen</strong> through the exhibit at the New England Air Museum, connecting aviation
                  enthusiasts, the historic contributions of Black airmen, and the aviation company where he served as an executive.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-primary-600 mr-2">•</span>
                <span>
                  Investing in future Black leaders by serving on the board of advisors for the <strong>Howard University School of Business</strong>, mentoring
                  students and strengthening a pipeline of talent to continue his DE&amp;I initiatives in leadership.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-primary-600 mr-2">•</span>
                <span>
                  Preparing to broaden his civic reach through service on the Board of the <strong>Hartford Foundation for Public Giving</strong> in 2023—a role
                  that reflected his commitment to philanthropy and community investment.
                </span>
              </li>
            </ul>
          </section>

          <section className="bg-primary-50 p-8 rounded-lg shadow-md">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Looking Toward Tomorrow
            </h2>
            <p className="text-lg text-gray-700 mb-4 leading-relaxed">
              Earl often embodied the spirit of another African proverb:
            </p>
            <p className="text-lg text-gray-900 font-semibold italic mb-4">
              “Let us be the people of tomorrow.”
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Yesterday was yesterday, today is today, but tomorrow is inexhaustible. Earl had endless hope for better communities—for families, for youth, and
              for a more just and connected West Hartford. WHAASCO carries that hope forward in his honor.
            </p>
          </section>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-8">
            <Link
              href="/history"
              className="inline-block bg-white text-primary-600 border-2 border-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors shadow-sm"
            >
              Back to Our History
            </Link>
            <Link
              href="/about"
              className="inline-block bg-african-gradient text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-all shadow-md"
            >
              About WHAASCO
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

