import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/Button";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center text-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={"/image1.png"}
          alt="Sustainable farming landscape with green fields"
          className="w-full h-full object-cover"
        />
        {/* Optional gradient overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/20 to-transparent"></div>
      </div>

      {/* Text Content */}
      <div className="relative z-10 max-w-4xl px-6">
        <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-8">
          Welcome to the place where <br /> natural flavour is born
        </h1>
        <p className="text-lg mb-8">
          Discover fresh produce and sustainable farming solutions.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            asChild
            size="lg"
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            <Link to="/products">Discover Our Products</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-white text-white hover:bg-green-700"
          >
            <Link to="/about">Learn More</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
