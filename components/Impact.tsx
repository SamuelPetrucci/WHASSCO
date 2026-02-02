export default function Impact() {
  const stats = [
    { number: "500+", label: "People Helped" },
    { number: "50+", label: "Programs Launched" },
    { number: "100+", label: "Volunteers" },
    { number: "10+", label: "Years of Service" },
  ];

  return (
    <section className="py-20 bg-african-gradient text-white relative overflow-hidden">
      {/* Decorative Pan-African stripe pattern */}
      <div className="absolute top-0 left-0 right-0 h-1 flex opacity-50">
        <div className="flex-1 bg-african-green-500"></div>
        <div className="flex-1 bg-african-red-500"></div>
        <div className="flex-1 bg-african-black-900"></div>
        <div className="flex-1 bg-african-gold-500"></div>
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Impact</h2>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            Together, we're making a real difference in the lives of those we serve
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2 text-african-gold-300">
                {stat.number}
              </div>
              <div className="text-white/90">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
