import React from "react";
import { Link } from "react-router-dom";
import {
  Leaf,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-green-900 text-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-green-600 rounded-lg p-2">
                <Leaf className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold">AgriSupport</span>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Empowering farmers through knowledge and innovation. We provide
              essential resources, drought awareness education, and sustainable
              farming techniques to build resilient agricultural communities.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-300 hover:text-green-400 transition-colors duration-300"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-green-400 transition-colors duration-300"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-green-400 transition-colors duration-300"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/about"
                  className="text-gray-300 hover:text-green-400 transition-colors duration-300"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/drought-awareness"
                  className="text-gray-300 hover:text-green-400 transition-colors duration-300"
                >
                  Drought Awareness
                </Link>
              </li>
              <li>
                <Link
                  to="/farming-tips"
                  className="text-gray-300 hover:text-green-400 transition-colors duration-300"
                >
                  Farming Tips
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-300 hover:text-green-400 transition-colors duration-300"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-green-400" />
                <span className="text-gray-300">
                  support@agrisupport.com
                </span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-green-400" />
                <span className="text-gray-300">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-green-400" />
                <span className="text-gray-300">
                  Agricultural Support Center
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-300 text-sm">
            © 2024 AgriSupport. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a
              href="#"
              className="text-gray-300 hover:text-green-400 text-sm transition-colors duration-300"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-gray-300 hover:text-green-400 text-sm transition-colors duration-300"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
