import React, { useState } from "react";
import {
  Droplets,
  Leaf,
  Shield,
  Clock,
  Users,
  TrendingUp,
  Thermometer,
} from "lucide-react";

export default function FarmingPage() {
  const [activeTab, setActiveTab] = useState("water");

  const categories = [
    {
      id: "water",
      name: "Water Management",
      icon: <Droplets className="h-5 w-5" />,
      tips: [
        {
          title: "Drip Irrigation Systems",
          description:
            "Install efficient drip irrigation to reduce water waste by up to 50% while maintaining optimal soil moisture.",
          difficulty: "Intermediate",
          timeframe: "2-3 weeks to implement",
        },
        {
          title: "Rainwater Harvesting",
          description:
            "Collect and store rainwater during wet seasons for use during dry periods.",
          difficulty: "Beginner",
          timeframe: "1 week to set up",
        },
        {
          title: "Mulching for Water Retention",
          description:
            "Apply organic mulch to reduce evaporation and maintain soil moisture longer.",
          difficulty: "Beginner",
          timeframe: "Ongoing practice",
        },
      ],
    },
    {
      id: "soil",
      name: "Soil Health",
      icon: <Leaf className="h-5 w-5" />,
      tips: [
        {
          title: "Compost Application",
          description: "Enhance soil fertility by regularly applying compost.",
          difficulty: "Beginner",
          timeframe: "Ongoing practice",
        },
      ],
    },
    {
      id: "drought",
      name: "Drought Resistance",
      icon: <Shield className="h-5 w-5" />,
      tips: [
        {
          title: "Drought-Resistant Crops",
          description: "Plant crop varieties that require less water.",
          difficulty: "Intermediate",
          timeframe: "Seasonal planning",
        },
      ],
    },
  ];

  const quickReferenceSections = [
    {
      icon: <Users className="w-10 h-10 text-green-500" />,
      title: "Beginner Farmers",
      description: "Start with these essential practices",
      items: [
        "Rainwater harvesting",
        "Basic mulching techniques",
        "Composting for soil health",
        "Drought-tolerant crop varieties",
      ],
    },
    {
      icon: <TrendingUp className="w-10 h-10 text-yellow-500" />,
      title: "Experienced Farmers",
      description: "Advanced techniques for optimization",
      items: [
        "Drip irrigation systems",
        "Soil moisture monitoring",
        "Cover crop rotation",
        "Succession planting",
      ],
    },
    {
      icon: <Thermometer className="w-10 h-10 text-green-600" />,
      title: "Emergency Measures",
      description: "During severe drought conditions",
      items: [
        "Emergency water conservation",
        "Crop stress management",
        "Shade structure installation",
        "Livestock water planning",
      ],
    },
  ];

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-100 text-green-700";
      case "Intermediate":
        return "bg-yellow-100 text-yellow-700";
      case "Advanced":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-500";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 to-green-100 py-12">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h1 className="text-3xl font-bold mb-4">
            Sustainable Farming Tips & Techniques
          </h1>
          <p className="text-gray-600 mb-8">
            Practical strategies to protect your crops, conserve water, and
            build resilience against drought and climate challenges.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex items-center bg-white rounded-full px-4 py-2 shadow">
              <Droplets className="h-5 w-5 text-green-600" />
              <span className="ml-2">Water Conservation</span>
            </div>
            <div className="flex items-center bg-white rounded-full px-4 py-2 shadow">
              <Leaf className="h-5 w-5 text-green-600" />
              <span className="ml-2">Soil Health</span>
            </div>
            <div className="flex items-center bg-white rounded-full px-4 py-2 shadow">
              <Shield className="h-5 w-5 text-yellow-600" />
              <span className="ml-2">Drought Resistance</span>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="py-10 max-w-5xl mx-auto px-4">
        <div className="flex justify-center gap-4 mb-8 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded ${
                activeTab === cat.id
                  ? "bg-green-600 text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {cat.icon}
              {cat.name}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {categories
          .filter((cat) => cat.id === activeTab)
          .map((cat) => (
            <div key={cat.id}>
              <h2 className="text-xl font-semibold mb-4">{cat.name}</h2>
              <div className="space-y-4">
                {cat?.tips?.map((tip, i) => (
                  <div
                    key={i}
                    className="border rounded-lg p-4 bg-white shadow"
                  >
                    <div className="flex justify-between">
                      <div>
                        <h3 className="font-bold">{tip.title}</h3>
                        <p className="text-gray-600 text-sm">
                          {tip.description}
                        </p>
                      </div>
                      <div className="flex flex-col items-end">
                        <span
                          className={`text-xs px-2 py-1 rounded ${getDifficultyColor(
                            tip.difficulty
                          )}`}
                        >
                          {tip.difficulty}
                        </span>
                        <span className="text-xs flex items-center mt-1 text-gray-500">
                          <Clock className="h-3 w-3 mr-1" />
                          {tip.timeframe}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
      </section>

      {/* Quick Reference Guide */}
      <section className="bg-white py-12">
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="text-3xl font-bold text-center mb-10">
            Quick Reference Guide
          </h1>
          <div className="grid md:grid-cols-3 gap-8">
            {quickReferenceSections.map((section, idx) => (
              <div
                key={idx}
                className="bg-gray-50 rounded-2xl shadow p-6 flex flex-col items-center text-center"
              >
                <div className="mb-4">{section.icon}</div>
                <h2 className="text-xl font-semibold mb-2">
                  {section.title}
                </h2>
                <p className="text-gray-600 mb-4">{section.description}</p>
                <ul className="text-gray-700 list-disc list-inside text-left">
                  {section.items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
