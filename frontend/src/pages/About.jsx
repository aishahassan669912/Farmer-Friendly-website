import React from "react";

const About = () => {
  // Smooth scroll with offset fix
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // adjust this if your navbar is taller
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      {/* About Section */}
      <section
        id="about"
        className="flex flex-col items-center justify-center max-md:px-4 py-16 bg-gradient relative"
        style={{ fontFamily: "'Poppins', sans-serif" }}
      >
        {/* Text Content */}
        <div className="text-sm text-slate-800 max-w-lg text-center md:text-left">
          <h1 className="text-4xl uppercase font-semibold text-green-800">
            About AgriSupport
          </h1>
          <div className="text-xl lg:text-2xl font-bold text-gray-900 mb-6">
          <p>
            Born from a passion for sustainable agriculture and driven by the
            urgent need to address climate challenges, AgriSupport is dedicated
            to empowering farmers with the knowledge and tools they need to
            thrive in a changing environment.
          </p>
          </div>
          <button
            onClick={() => scrollToSection("our-story")}
            className="flex items-center justify-center md:justify-start gap-2 mt-8 hover:-translate-y-0.5 transition bg-gradient-to-r from-green-600 to-green-400 py-3 px-8 rounded-full text-white"
          >
            <span>Read more</span>
            <svg
              width="13"
              height="12"
              viewBox="0 0 13 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.53 6.53a.75.75 0 0 0 0-1.06L7.757.697a.75.75 0 1 0-1.06 1.06L10.939 6l-4.242 4.243a.75.75 0 0 0 1.06 1.06zM0 6v.75h12v-1.5H0z"
                fill="#fff"
              />
            </svg>
          </button>
        </div>
      </section>

      {/* Our Story Section */}
      <section id="our-story" className="py-16 bg-gradient-to-b from-green-50 to-white">
        <div className="max-w-4xl mx-auto px-6">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">
              Our Story
            </h1>
            <div className="w-24 h-1 bg-green-600 mx-auto"></div>
          </div>

          {/* Story Content */}
          <div className="space-y-8 text-gray-700">
            <p className="text-lg leading-relaxed">
              AgriSupport was founded in response to the growing challenges
              farmers face due to climate change, particularly drought
              conditions that threaten crop yields and farming livelihoods
              worldwide.
            </p>

            <p className="text-lg leading-relaxed">
              Our team of agricultural experts, environmental scientists, and
              technology specialists came together with a shared vision: to
              create a comprehensive platform that would democratize access to
              sustainable farming knowledge.
            </p>

            <p className="text-lg leading-relaxed">
              What started as a small initiative to help local farmers has grown
              into a global platform serving thousands of agricultural
              communities, providing practical solutions for drought
              preparedness, soil conservation, and sustainable farming
              practices.
            </p>

            <p className="text-lg leading-relaxed">
              Today, AgriSupport continues to evolve, incorporating the latest
              research in climate-resilient agriculture and feedback from the
              farming communities we serve.
            </p>
          </div>

          {/* Optional Stats or Team Photos */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md border border-green-100">
              <h3 className="text-xl font-semibold text-green-700 mb-3">
                Our Reach
              </h3>
              <p className="text-gray-600">
                Serving farmers in 15+ countries with localized solutions for
                sustainable agriculture.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border border-green-100">
              <h3 className="text-xl font-semibold text-green-700 mb-3">
                Our Approach
              </h3>
              <p className="text-gray-600">
                Combining traditional farming wisdom with cutting-edge
                agricultural research.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Growing Impact Section */}
      <section className="py-16 bg-gradient-to-b from-white to-green-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">
              Our Growing Impact
            </h1>
            <div className="w-24 h-1 bg-green-600 mx-auto mb-8"></div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Through dedicated efforts and community collaboration, we're making a real difference in agricultural communities worldwide.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {/* Farmers Reached */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-green-100 text-center">
              <h2 className="text-5xl font-bold text-green-700 mb-2">1,000+</h2>
              <h3 className="text-xl font-semibold text-green-800 mb-2">Farmers Reached</h3>
              <p className="text-gray-600">
                Active farmers using our resources across multiple regions
              </p>
            </div>

            {/* Educational Resources */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-green-100 text-center">
              <h2 className="text-5xl font-bold text-green-700 mb-2">50+</h2>
              <h3 className="text-xl font-semibold text-green-800 mb-2">Educational Resources</h3>
              <p className="text-gray-600">
                Comprehensive guides, tips, and educational materials
              </p>
            </div>

            {/* Partner Organizations */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-green-100 text-center">
              <h2 className="text-5xl font-bold text-green-700 mb-2">25+</h2>
              <h3 className="text-xl font-semibold text-green-800 mb-2">Partner Organizations</h3>
              <p className="text-gray-600">
                Collaborating with agricultural institutions and NGOs
              </p>
            </div>
          </div>

         
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-green-800 mb-4">AgriSupport</h1>
            <div className="w-20 h-1 bg-green-600 mx-auto mb-8"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Empowering farmers with sustainable solutions for a climate-resilient future
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Mission Card */}
            <div className="bg-green-50 p-8 rounded-xl shadow-sm border border-green-100">
              <div className="flex items-center mb-6">
                <div className="bg-green-100 p-3 rounded-lg mr-4">
                  <svg className="w-6 h-6 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-green-800">Our Mission</h2>
              </div>
              <p className="text-gray-700 text-lg">
                To empower farmers with knowledge, tools, and resources needed to build resilient agricultural practices that withstand climate challenges and ensure food security for future generations.
              </p>
            </div>

            {/* Vision Card */}
            <div className="bg-amber-50 p-8 rounded-xl shadow-sm border border-amber-100">
              <div className="flex items-center mb-6">
                <div className="bg-amber-100 p-3 rounded-lg mr-4">
                  <svg className="w-6 h-6 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-amber-800">Our Vision</h2>
              </div>
              <p className="text-gray-700 text-lg">
                A world where every farmer has access to sustainable farming techniques and drought-resistant practices, creating thriving agricultural communities that prosper despite environmental challenges.
              </p>
            </div>

            {/* Community Focus Card */}
            <div className="bg-blue-50 p-8 rounded-xl shadow-sm border border-blue-100">
              <div className="flex items-center mb-6">
                <div className="bg-blue-100 p-3 rounded-lg mr-4">
                  <svg className="w-6 h-6 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-blue-800">Community Focus</h2>
              </div>
              <p className="text-gray-700 text-lg">
                We believe in the power of community-driven knowledge sharing, connecting farmers with experts and peers to create a supportive network of agricultural innovation and mutual support.
              </p>
            </div>

            {/* Global Impact Card */}
            <div className="bg-purple-50 p-8 rounded-xl shadow-sm border border-purple-100">
              <div className="flex items-center mb-6">
                <div className="bg-purple-100 p-3 rounded-lg mr-4">
                  <svg className="w-6 h-6 text-purple-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-purple-800">Global Impact</h2>
              </div>
              <p className="text-gray-700 text-lg">
                Our resources and techniques are designed to address climate challenges worldwide, with special focus on drought-prone regions and communities most affected by climate change.
              </p>
            </div>
          </div>
        </div>
      </section>

     
    </>
  );
};

export default About;
