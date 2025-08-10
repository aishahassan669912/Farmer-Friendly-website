import React from "react";
import { Link } from "react-router-dom";
import { Droplets, Sprout, Sun, ArrowRight, Users, BookOpen } from "lucide-react";
import HeroSection from "../components/HeroSection";
import { Button } from "../components/ui/Button";
import TipCard from "../components/ui/TipCard.jsx";
import { Card, CardContent } from "../components/ui/Card";

const Home = () => {
  const featuredTips = [
    {
      icon: Droplets,
      title: "Water Conservation",
      description: "Efficient irrigation and water management strategies",
      tips: [
        "Install drip irrigation systems",
        "Collect and store rainwater",
        "Use mulching to retain soil moisture",
        "Plant drought-resistant crops",
      ],
    },
    {
      icon: Sprout,
      title: "Soil Health",
      description: "Building and maintaining healthy, resilient soil",
      tips: [
        "Practice crop rotation",
        "Add organic matter regularly",
        "Test soil pH and nutrients",
        "Avoid over-tilling",
      ],
    },
    {
      icon: Sun,
      title: "Climate Adaptation",
      description: "Adapting to changing weather patterns",
      tips: [
        "Choose climate-appropriate varieties",
        "Monitor weather forecasts",
        "Plan planting seasons carefully",
        "Use shade structures when needed",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-gray to-amber-50">
      {/* Hero Section */}
      <HeroSection />

      {/* Featured Tips Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-green-900 mb-4">
              Essential Farming Knowledge
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Practical tips and strategies to help you build a more resilient and sustainable farm.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 mb-12">
            {featuredTips.map((tip, index) => (
              <div
                key={index}
                className="transition transform hover:scale-105 duration-300"
              >
                <TipCard {...tip} />
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button
              asChild
              size="lg"
              className="bg-green-700 hover:bg-green-800 text-gray shadow-lg"
            >
              <Link to="/farming-tips">
                View All Tips
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-green-50">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          {/* Mission Text */}
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold text-green-900 mb-6">
              Our Mission: Building Resilient Farming Communities
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              Climate change and unpredictable weather patterns pose significant challenges 
              to farmers worldwide. AgriSupport bridges the knowledge gap by providing 
              accessible, practical resources for sustainable agriculture.
            </p>
            <ul className="space-y-4 mb-8">
              {[
                "Evidence-based farming practices",
                "Drought preparedness strategies",
                "Community support networks",
                "Access to expert guidance",
              ].map((point, i) => (
                <li key={i} className="flex items-start space-x-3">
                  <div className="w-3 h-3 bg-green-600 rounded-full mt-1"></div>
                  <span className="text-gray-800">{point}</span>
                </li>
              ))}
            </ul>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-green-700 text-green-700 hover:bg-green-100"
            >
              <Link to="/about">Learn More About Us</Link>
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 gap-6">
            <Card className="p-6 text-center bg-white border border-green-200 shadow-sm">
              <CardContent className="p-0">
                <Users className="h-12 w-12 text-green-700 mx-auto mb-4" />
                <div className="text-2xl font-bold text-green-900 mb-1">
                  10,000+
                </div>
                <p className="text-gray-600">Farmers Helped</p>
              </CardContent>
            </Card>

            <Card className="p-6 text-center bg-white border border-green-200 shadow-sm">
              <CardContent className="p-0">
                <BookOpen className="h-12 w-12 text-green-700 mx-auto mb-4" />
                <div className="text-2xl font-bold text-green-900 mb-1">
                  500+
                </div>
                <p className="text-gray-600">Resources Shared</p>
              </CardContent>
            </Card>

            <Card className="p-6 text-center bg-white border border-green-200 shadow-sm">
              <CardContent className="p-0">
                <Sprout className="h-12 w-12 text-green-700 mx-auto mb-4" />
                <div className="text-2xl font-bold text-green-900 mb-1">
                  75%
                </div>
                <p className="text-gray-600">Yield Improvement</p>
              </CardContent>
            </Card>

            <Card className="p-6 text-center bg-white border border-green-200 shadow-sm">
              <CardContent className="p-0">
                <Droplets className="h-12 w-12 text-green-700 mx-auto mb-4" />
                <div className="text-2xl font-bold text-green-900 mb-1">
                  40%
                </div>
                <p className="text-gray-600">Water Savings</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
