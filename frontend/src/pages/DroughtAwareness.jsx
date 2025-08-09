import React from "react";

// Use the uploaded image file path here
const droughtImage = "/src/assets/images (4).png";

const DroughtAwareness = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-6">
      {/* Hero */}
      <section className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Understanding Drought:{" "}
            <span className="text-red-600">A Growing Challenge</span>
          </h1>
          <p className="text-lg text-gray-700 mb-6">
            Drought is a prolonged period of abnormally low rainfall that threatens
            agriculture, water supplies, and ecosystems. Learning about drought
            helps communities prepare and respond effectively.
          </p>
          <div className="bg-yellow-100 border border-yellow-400 rounded p-4 flex items-start space-x-3">
            <svg
              className="w-6 h-6 text-yellow-600 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12" y2="17" />
            </svg>
            <p className="text-yellow-800 font-semibold">
              Important: Early detection helps prevent major damage to crops.
            </p>
          </div>
        </div>
        <div>
          <img
            src={droughtImage}
            alt="Before and after drought affected land"
            className="w-full max-w-5xl mx-auto rounded-lg shadow-lg object-cover"
          />
        </div>
      </section>

      {/* What is drought? */}
    <section className="max-w-4xl mx-auto mt-16">
  <h2 className="text-3xl font-semibold text-center mb-8">What is Drought?</h2>
  <p className="text-gray-700 text-lg leading-relaxed mb-8">
    Drought is a prolonged period of abnormally low precipitation that leads to
    water shortages, affecting agricultural production, water supply, and
    ecosystem health. Unlike other natural disasters, drought develops slowly
    and can persist for months or even years.
  </p>

  {/* Key Characteristics */}
  <div className="bg-green-50 border border-green-300 rounded-lg p-6">
    <h3 className="text-2xl font-semibold text-green-700 mb-4">Key Characteristics:</h3>
    <ul className="list-disc list-inside text-gray-700 space-y-2">
      <li>Extended periods with below-normal rainfall</li>
      <li>Progressive depletion of soil moisture</li>
      <li>Reduced water availability in rivers, lakes, and groundwater</li>
      <li>Increased temperature and evaporation rates</li>
      <li>Cumulative effects that worsen over time</li>
    </ul>
  </div>
</section>


      {/* Causes */}
      <section className="max-w-6xl mx-auto mt-20">
        <h2 className="text-3xl font-semibold text-center mb-12">Primary Causes of Drought</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="bg-white p-6 rounded shadow">
            <h3 className="font-semibold text-xl mb-2">Low Rainfall</h3>
            <p className="text-gray-600">Extended periods without adequate precipitation.</p>
          </div>
          <div className="bg-white p-6 rounded shadow">
            <h3 className="font-semibold text-xl mb-2">Climate Change</h3>
            <p className="text-gray-600">
              Global warming changes weather patterns causing irregular rainfalls.
            </p>
          </div>
          <div className="bg-white p-6 rounded shadow">
            <h3 className="font-semibold text-xl mb-2">Environmental Damage</h3>
            <p className="text-gray-600">
              Deforestation and poor land use worsen soil moisture retention.
            </p>
          </div>
        </div>
      </section>

     {/* Stages */}
<section className="max-w-6xl mx-auto mt-20">
  <h2 className="text-3xl font-semibold text-center mb-12">
    The Four Stages of Drought
  </h2>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {/* Meteorological Drought */}
    <div className="bg-white shadow rounded-lg p-6 border">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-semibold text-gray-900">Meteorological Drought</h3>
        <span className="bg-yellow-100 text-yellow-700 text-sm px-3 py-1 rounded-full">
          Early Warning
        </span>
      </div>
      <p className="text-gray-600">
        Begins with below-normal precipitation over weeks to months.
      </p>
    </div>

    {/* Agricultural Drought */}
    <div className="bg-white shadow rounded-lg p-6 border">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-semibold text-gray-900">Agricultural Drought</h3>
        <span className="bg-green-100 text-green-700 text-sm px-3 py-1 rounded-full">
          Moderate Impact
        </span>
      </div>
      <p className="text-gray-600">
        Soil moisture deficits start affecting crop growth and yields.
      </p>
    </div>

    {/* Hydrological Drought */}
    <div className="bg-white shadow rounded-lg p-6 border">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-semibold text-gray-900">Hydrological Drought</h3>
        <span className="bg-red-100 text-red-700 text-sm px-3 py-1 rounded-full">
          Severe Impact
        </span>
      </div>
      <p className="text-gray-600">
        Surface water and groundwater supplies become critically low.
      </p>
    </div>

    {/* Socioeconomic Drought */}
    <div className="bg-white shadow rounded-lg p-6 border">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-semibold text-gray-900">Socialeconomic Drought</h3>
        <span className="bg-gray-200 text-gray-800 text-sm px-3 py-1 rounded-full">
          Critical Impact
        </span>
      </div>
      <p className="text-gray-600">
        Water shortage begins to affect human activities and livelihoods.
      </p>
    </div>
  </div>
</section>

    </div>
  );
};

export default DroughtAwareness;
