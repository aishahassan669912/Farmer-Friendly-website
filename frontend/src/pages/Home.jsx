import React from "react";

const AgriSupport = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-green-800 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold">AgriSupport</div>
          <div className="hidden md:flex space-x-6">
            <a href="#" className="hover:text-green-200">Home</a>
            <a href="#" className="hover:text-green-200">About</a>
            <a href="#" className="hover:text-green-200">Drought Awareness</a>
            <a href="#" className="hover:text-green-200">Farming Tips</a>
            <a href="#" className="hover:text-green-200">Contact</a>
          </div>
          <button className="md:hidden">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-green-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">AgriSupport Platform</h1>
          <p className="text-xl md:text-2xl mb-8">Support Your Soil, Secure Your Future</p>
          <p className="max-w-2xl mx-auto text-lg mb-10">
            Empowering farmers with essential knowledge, drought-resistant techniques, and sustainable practices to build resilient agricultural communities for generations to come.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-white text-green-800 hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold">
              Get Farming Tips →
            </button>
            <button className="bg-transparent border-2 border-white hover:bg-green-600 px-6 py-3 rounded-lg font-semibold">
              Learn About Drought
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <h3 className="text-4xl font-bold text-green-700 mb-2">1000+</h3>
              <p className="text-gray-600">Farmers Supported</p>
            </div>
            <div className="p-6">
              <h3 className="text-4xl font-bold text-green-700 mb-2">50+</h3>
              <p className="text-gray-600">Water Conservation Tips</p>
            </div>
            <div className="p-6">
              <h3 className="text-4xl font-bold text-green-700 mb-2">25+</h3>
              <p className="text-gray-600">Sustainable Practices</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>© 2023 AgriSupport Platform. All rights reserved.</p>
          <p className="mt-2 text-gray-400 text-sm">
            Go to Settings to educate Wyrcons
          </p>
        </div>
      </footer>
    </div>
  );
};

export default AgriSupport;