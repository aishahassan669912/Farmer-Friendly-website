import React, { useState } from "react";
import { TrendingUp, Droplets, Leaf, Users } from "lucide-react";

export default function FarmingPage() {
  const categories = [
    {
      icon: "💧",
      title: "Water Management",
      description: "Efficient water use and conservation techniques",
      tips: [
        "Install drip irrigation systems for 30–50% water savings",
        "Use mulching to reduce soil moisture evaporation",
        "Collect rainwater with simple harvesting systems",
        "Schedule irrigation during cooler parts of the day",
      ],
    },
    {
      icon: "🌱",
      title: "Soil Health",
      description: "Building resilient, nutrient-rich soil",
      tips: [
        "Practice crop rotation to maintain soil fertility",
        "Add compost and organic matter regularly",
        "Avoid over-tillage to preserve soil structure",
        "Plant cover crops to prevent erosion",
      ],
    },
    {
      icon: "☀️",
      title: "Climate Adaptation",
      description: "Adapting to changing weather patterns",
      tips: [
        "Choose drought-resistant and early-maturing varieties",
        "Adjust planting dates based on weather forecasts",
        "Use shade nets or windbreaks for crop protection",
        "Diversify crops to spread climate risks",
      ],
    },
    {
      icon: "🍃",
      title: "Sustainable Practices",
      description: "Environmentally friendly farming methods",
      tips: [
        "Integrate agroforestry with crops and trees",
        "Use biological pest control methods",
        "Minimize chemical inputs through IPM",
        "Promote beneficial insects and soil organisms",
      ],
    },
    {
      icon: "⚡",
      title: "Resource Efficiency",
      description: "Maximizing productivity with limited resources",
      tips: [
        "Optimize fertilizer application timing and placement",
        "Use solar-powered equipment where possible",
        "Implement precision agriculture",
      ],
    },
    {
      icon: "🛡️",
      title: "Risk Management",
      description: "Protecting your farm from various threats",
      tips: [
        "Maintain emergency seed and feed reserves",
        "Keep detailed farm records for insurance",
        "Diversify income sources beyond main crops",
      ],
    },
  ];

  const guides = [
    {
      category: "Water Management",
      title: "Setting Up Drip Irrigation",
      content: [
        "Plan your layout according to crop rows.",
        "Install a water filter to prevent clogging.",
        "Lay drip lines close to plant roots.",
        "Test and adjust water flow regularly.",
      ],
    },
    {
      category: "Soil Health",
      title: "Building Soil Organic Matter",
      content: [
        "Add compost to enrich soil nutrients.",
        "Plant cover crops to protect the soil.",
        "Avoid over-tillage to preserve structure.",
        "Use crop rotation for balanced fertility.",
      ],
    },
    {
      category: "Climate Adaptation",
      title: "Drought-Resistant Crop Varieties",
      content: [
        "Select early-maturing seed varieties.",
        "Stagger planting dates for resilience.",
        "Mulch soil to reduce evaporation.",
        "Irrigate during cooler parts of the day.",
      ],
    },
    {
      category: "Sustainable Practices",
      title: "Integrated Pest Management (IPM)",
      content: [
        "Monitor pests regularly.",
        "Use biological control methods first.",
        "Apply chemicals only when necessary.",
        "Encourage beneficial insects.",
      ],
    },
  ];

  const metrics = [
    {
      icon: <TrendingUp className="h-12 w-12 text-primary" />,
      value: "75%",
      label: "Average Yield Increase",
    },
    {
      icon: <Droplets className="h-12 w-12 text-accent" />,
      value: "40%",
      label: "Water Savings",
    },
    {
      icon: <Leaf className="h-12 w-12 text-primary" />,
      value: "60%",
      label: "Reduction in Chemical Inputs",
    },
    {
      icon: <Users className="h-12 w-12 text-accent" />,
      value: "90%",
      label: "Farmer Satisfaction",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);
  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* ===== Practical Farming Tips Section ===== */}
      <div className="py-10 px-5">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-blue-800 mb-4">
            Practical Farming Tips
          </h1>
          <p className="text-gray-700 text-lg">
            Proven strategies and techniques to improve your farm's
            productivity, sustainability, and resilience to environmental
            challenges.
          </p>
        </div>

        <div className="text-center mt-12">
          <h2 className="text-2xl font-bold mb-2">Essential Categories</h2>
          <p className="text-gray-600">
            Explore comprehensive guides organized by farming focus areas
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {categories.map((cat, index) => (
            <div
              key={index}
              className="bg-card border border-border rounded-lg px-6 data-[state=open]:shadow-lg transition-all duration-300"
            >
              <h3 className="text-lg font-bold text-green-700 flex items-center gap-2">
                <span className="text-2xl">{cat.icon}</span> {cat.title}
              </h3>
              <p className="text-gray-600 mt-2 text-sm">{cat.description}</p>
              <ul className="mt-4 list-disc list-inside text-gray-700 text-sm space-y-1">
                {cat.tips.map((tip, i) => (
                  <li key={i}>{tip}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-gray-300 my-12 max-w-4xl mx-auto"></div>

        {/* ===== Step-by-Step Guides Section ===== */}
        <section className="py-20 bg-gray-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Step-by-Step Guides
              </h2>
              <p className="text-xl text-gray-600">
                Detailed instructions for implementing key farming practices
              </p>
            </div>

            <div className="space-y-4">
              {guides.map((guide, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-200 rounded-lg shadow-sm"
                >
                  <button
                    onClick={() => toggleAccordion(index)}
                    className="flex justify-between items-center w-full px-6 py-4 text-left font-semibold text-gray-800 hover:bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center space-x-4">
                      <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm font-medium">
                        {guide.category}
                      </span>
                      <span>{guide.title}</span>
                    </div>
                    <span
                      className={`transform transition-transform duration-300 ${
                        openIndex === index ? "rotate-180" : ""
                      }`}
                    >
                      ▼
                    </span>
                  </button>
                  {openIndex === index && (
                    <div className="px-6 pb-4 pt-2 text-gray-600 text-sm whitespace-pre-wrap">
                      {guide.content.join("\n")}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== Proven Results Section ===== */}
        <section className="py-27 bg-card">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Proven Results
              </h2>
              <p className="text-lg text-gray-600">
                Farmers using these techniques report significant improvements
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
              {metrics.map((metric, index) => (
                <div
                  key={index}
                  className="text-center bg-gray-50 rounded-xl p-6 shadow-sm hover:shadow-md transition duration-200"
                >
                  <div className="flex items-center justify-center mb-4 text-5xl font-bold text-gray-800">
                    {metric.icon}
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">
                    {metric.value}
                  </div>
                  <div className="text-base font-semibold text-gray-800">
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

         {/* Call to Action */}
          <section className="py-20 bg-green-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Heading */}
        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
          Need Personalized Guidance?
        </h2>

        {/* Description */}
        <p className="text-xl text-gray-600 mb-8">
          Connect with our agricultural experts for advice tailored to your
          specific situation and region.
        </p>

        {/* Button */}
        <a
          href="/contact"
          className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors inline-block shadow-md"
        >
          Get Expert Support
        </a>
      </div>
    </section>
      </div>
    </div>
  );
}
