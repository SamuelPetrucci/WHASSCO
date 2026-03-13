import ScrollAnimation from "./ScrollAnimation";
import type { HomeContent } from "@/lib/content-types";

export default function Mission({ home }: { home?: HomeContent }) {
  const heading = home?.missionHeading?.trim() || "Our Mission";
  const statement =
    home?.missionStatement?.trim() ||
    "Our mission is to promote unity, cultural awareness, and community involvement by providing programs and activities that strengthen families, support children, and foster pride in African American heritage and history.";
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-african-red-500 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          <ScrollAnimation direction="fade">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {heading}
              </h2>
              <div className="w-24 h-1 bg-african-gradient mx-auto rounded-full"></div>
            </div>
          </ScrollAnimation>

          {/* Main Mission Card */}
          <ScrollAnimation direction="up" delay={100}>
            <div className="relative">
              {/* Decorative border with Pan-African colors */}
              <div className="absolute -inset-1 bg-african-gradient rounded-2xl blur opacity-75"></div>
              
              <div className="relative bg-white rounded-2xl shadow-2xl p-8 md:p-12 border-4 border-transparent">
                {/* Top accent bar */}
                <div className="absolute top-0 left-0 right-0 h-2 bg-african-gradient rounded-t-2xl"></div>
                
                {/* Mission Statement */}
                <div className="text-center mb-8">
                  <div className="inline-block mb-6">
                    <svg
                      className="w-16 h-16 text-primary-600 mx-auto"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 leading-tight">
                    {statement}
                  </h3>
                  <div className="flex items-center justify-center gap-2 mb-6">
                    <div className="h-px bg-gradient-to-r from-transparent via-primary-500 to-transparent flex-1 max-w-xs"></div>
                    <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                    <div className="h-px bg-gradient-to-r from-transparent via-african-red-500 to-transparent flex-1 max-w-xs"></div>
                  </div>
                </div>
                {/* Purpose Section */}
                <div className="border-t-2 border-gray-100 pt-8">
                  <h4 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 text-center">
                    Our Purpose
                  </h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <ScrollAnimation direction="up" delay={200}>
                      <div className="bg-gradient-to-br from-primary-50 to-white p-5 rounded-xl border-l-4 border-primary-500 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                        <div className="flex items-start">
                          <div className="flex-shrink-0 bg-primary-100 p-2 rounded-lg">
                            <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <p className="ml-4 text-gray-700 font-medium">
                            Provide social, cultural, and educational opportunities for African American families
                          </p>
                        </div>
                      </div>
                    </ScrollAnimation>
                    <ScrollAnimation direction="up" delay={300}>
                      <div className="bg-gradient-to-br from-african-red-50 to-white p-5 rounded-xl border-l-4 border-african-red-500 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                        <div className="flex items-start">
                          <div className="flex-shrink-0 bg-african-red-100 p-2 rounded-lg">
                            <svg className="w-6 h-6 text-african-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <p className="ml-4 text-gray-700 font-medium">
                            Promote positive self-image, self-awareness, and cultural pride
                          </p>
                        </div>
                      </div>
                    </ScrollAnimation>
                    <ScrollAnimation direction="up" delay={400}>
                      <div className="bg-gradient-to-br from-african-gold-50 to-white p-5 rounded-xl border-l-4 border-african-gold-500 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                        <div className="flex items-start">
                          <div className="flex-shrink-0 bg-african-gold-100 p-2 rounded-lg">
                            <svg className="w-6 h-6 text-african-gold-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <p className="ml-4 text-gray-700 font-medium">
                            Encourage parental involvement in education and community life
                          </p>
                        </div>
                      </div>
                    </ScrollAnimation>
                    <ScrollAnimation direction="up" delay={500}>
                      <div className="bg-gradient-to-br from-primary-50 to-white p-5 rounded-xl border-l-4 border-primary-500 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                        <div className="flex items-start">
                          <div className="flex-shrink-0 bg-primary-100 p-2 rounded-lg">
                            <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <p className="ml-4 text-gray-700 font-medium">
                            Support youth development through enrichment activities
                          </p>
                        </div>
                      </div>
                    </ScrollAnimation>
                    <ScrollAnimation direction="up" delay={600}>
                      <div className="bg-gradient-to-br from-african-red-50 to-white p-5 rounded-xl border-l-4 border-african-red-500 md:col-span-2 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                        <div className="flex items-start">
                          <div className="flex-shrink-0 bg-african-red-100 p-2 rounded-lg">
                            <svg className="w-6 h-6 text-african-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <p className="ml-4 text-gray-700 font-medium">
                            Serve as a resource and advocate for families within the community
                          </p>
                        </div>
                      </div>
                    </ScrollAnimation>
                  </div>
                </div>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  );
}
