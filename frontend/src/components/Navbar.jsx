import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Leaf } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Drought Awareness", path: "/drought-awareness" },
    { name: "Farming Tips", path: "/farming-tips" },
    { name: "Contact", path: "/contact" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-green-900/95 backdrop-blur-sm border-b border-green-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="bg-green-600 rounded-lg p-2 group-hover:scale-105 transition-transform duration-300">
              <Leaf className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-white">AgriSupport</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`font-medium transition-colors duration-300 ${
                  isActive(item.path)
                    ? "text-green-400 border-b-2 border-green-400 pb-1"
                    : "text-gray-300 hover:text-green-400"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white focus:outline-none"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-green-700">
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`font-medium py-2 px-4 rounded-lg transition-colors duration-300 ${
                    isActive(item.path)
                      ? "bg-green-800 text-green-300"
                      : "text-gray-300 hover:text-green-400 hover:bg-green-800/50"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
