export default function Home() {
  return (
    <div className="relative w-full min-h-screen bg-[url('/img/hero-farm.jpg')] bg-cover bg-center bg-fixed">
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-white/50 backdrop-blur-sm"></div>

      {/* Main Content */}
      <div className="relative">
        {/* Features Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                Empowering Farmers with Knowledge
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                AgriSupport provides comprehensive resources and tools to help
                farmers adapt to climate challenges and build sustainable,
                resilient agricultural practices.
              </p>
            </div>

            {/* Cards */}
            {/* Keep your existing card code here unchanged */}
          </div>
        </section>

        {/* Call to Action Section */}
        {/* Keep your existing CTA code here unchanged */}

        {/* Footer */}
        <div className="text-center py-8">
          <p className="text-xs text-gray-500">
            Sustainable farming for a better tomorrow
          </p>
        </div>

        {/* Weather Widget */}
        {/* Keep your weather widget code here unchanged */}
      </div>
    </div>
  );
}
