import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="bg-gray-50">
      {/* Hero - placeholder for your photo */}
      <div className="relative w-full h-64 md:h-80 lg:h-96 bg-gradient-to-br from-primary-600 via-primary-500 to-african-gold-500 flex flex-col items-center justify-center px-6">
        <div className="absolute inset-0 flex items-center justify-center border-2 border-dashed border-white/30 rounded-lg m-4">
          <p className="text-white/70 text-sm md:text-base text-center max-w-md">
            Add your header photo — place image in <code className="bg-white/20 px-1 rounded">public/about-hero.jpg</code> and update this component
          </p>
        </div>
        <div className="relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
            About WHAASCO
          </h1>
          <p className="text-lg md:text-xl text-white/90 mt-2 max-w-2xl mx-auto">
            Empowering families, supporting youth, and celebrating African American culture through education and community.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 md:py-20">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Who We Are</h2>
            <div className="rounded-xl overflow-hidden shadow-lg my-6 aspect-video max-w-2xl relative bg-primary-100 border-2 border-dashed border-primary-300 flex items-center justify-center">
              <p className="text-primary-700/80 text-sm md:text-base text-center p-6">
                Add your photo — place image in <code className="bg-white/80 px-1.5 py-0.5 rounded">public/about-community.jpg</code> and update this component
              </p>
            </div>
            <p className="text-lg text-gray-700 mb-6">
              We, the members of the <strong>West Hartford African American Social and Cultural Organization (WHAASCO)</strong>, are a non-profit organization established to support, encourage, and enhance the social, cultural, and educational well-being of African American families and the broader community.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Our Mission</h2>
            <p className="text-gray-700 mb-6">
              Our mission is to promote unity, cultural awareness, and community involvement by providing programs and activities that strengthen families, support children, and foster pride in African American heritage and history.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Our Purpose</h2>
            <p className="text-gray-700 mb-4">The purpose of WHAASCO is to:</p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
              <li>Provide social, cultural, and educational opportunities for African American families</li>
              <li>Promote positive self-image, self-awareness, and cultural pride</li>
              <li>Encourage parental involvement in education and community life</li>
              <li>Support youth development through enrichment activities</li>
              <li>Serve as a resource and advocate for families within the community</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Our History</h2>
            <p className="text-gray-700 mb-4">
              WHAASCO was formed in 1979 when a small group of African American residents came together to address community concerns and support each other. <Link href="/history" className="text-primary-600 hover:text-primary-700 font-semibold">Learn more about our rich history and achievements →</Link>
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Programs and Activities</h2>
            <p className="text-gray-700 mb-4">
              WHAASCO offers a variety of programs designed to support families and children, including but not limited to:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
              <li>Educational enrichment activities</li>
              <li>Cultural and heritage-based events</li>
              <li>Family-oriented social gatherings</li>
              <li>Community outreach and engagement</li>
              <li>Youth-focused programs that promote academic success and personal growth</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Community Focus</h2>
            <p className="text-gray-700 mb-6">
              Our organization is committed to building strong relationships within the West Hartford community and surrounding areas. We work collaboratively with families, educators, and community partners to create an inclusive environment that values diversity, respect, and mutual support.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Our Vision</h2>
            <p className="text-gray-700 mb-6">
              We envision a thriving community where African American families are empowered, children are supported in reaching their full potential, and cultural heritage is celebrated and preserved.
            </p>

            <div className="mt-12 bg-primary-50 p-6 rounded-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Get Involved</h2>
              <p className="text-gray-700 mb-4">
                Your support helps WHAASCO strengthen families, empower youth, and celebrate African American culture. By giving your time, resources, or financial support, you help us provide educational enrichment, cultural programming, and community connections that make a lasting impact.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="/contact"
                  className="bg-african-gradient text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-all text-center shadow-md"
                >
                  Contact Us
                </a>
                <a
                  href="/donate"
                  className="bg-white text-primary-600 border-2 border-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors text-center"
                >
                  Donate
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
