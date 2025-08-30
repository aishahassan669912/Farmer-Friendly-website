import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Leaf, LogOut, User, Settings, Shield } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  const getDashboardLink = () => {
    if (!user) return null;
    
    switch (user.role) {
      case 'admin':
        return '/admin-dashboard';
      case 'farmer':
        return '/farmer-dashboard';
      case 'ngo':
        return '/ngo-dashboard';
      default:
        return '/';
    }
  };

  const getDashboardName = () => {
    if (!user) return '';
    
    switch (user.role) {
      case 'admin':
        return 'Admin Dashboard';
      case 'farmer':
        return 'Farmer Dashboard';
      case 'ngo':
        return 'NGO Dashboard';
      default:
        return 'Dashboard';
    }
  };

  return (
    <header className="bg-green-800 text-white shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold flex items-center gap-2">
          <div className="bg-green-600 rounded-lg p-2">
            <Leaf className="h-6 w-6 text-white" />
          </div>
          AgriSupport
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="hover:underline">
            Home
          </Link>
          <Link to="/about" className="hover:underline">
            About
          </Link>
          <Link to="/drought-awareness" className="hover:underline">
            Drought Awareness
          </Link>
          <Link to="/farming-tips" className="hover:underline">
            Farming Tips
          </Link>
          <Link to="/contact" className="hover:underline">
            Contact
          </Link>

          {/* Auth buttons */}
          {user ? (
            <div className="flex items-center space-x-4">
              <Link
                to={getDashboardLink()}
                className="bg-white text-green-800 px-4 py-2 rounded-lg font-semibold hover:bg-green-100 transition flex items-center gap-2"
              >
                <User className="h-4 w-4" />
                {getDashboardName()}
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700 transition flex items-center gap-2"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link
                to="/signup"
                className="bg-white text-green-800 px-4 py-2 rounded-lg font-semibold hover:bg-green-100 transition"
              >
                Sign Up
              </Link>
              <Link
                to="/login"
                className="bg-white text-green-800 px-4 py-2 rounded-lg font-semibold hover:bg-green-100 transition"
              >
                Login
              </Link>
              <Link
                to="/admin-login"
                className="bg-purple-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-purple-700 transition flex items-center gap-2"
              >
                <Shield className="h-4 w-4" />
                Admin Login
              </Link>
            </div>
          )}
        </nav>

        {/* Mobile menu button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden focus:outline-none"
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {menuOpen ? (
              <path d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile nav */}
      {menuOpen && (
        <nav className="md:hidden bg-green-700 px-6 py-4 space-y-4">
          <Link to="/" className="block hover:underline" onClick={() => setMenuOpen(false)}>
            Home
          </Link>
          <Link to="/about" className="block hover:underline" onClick={() => setMenuOpen(false)}>
            About
          </Link>
          <Link to="/drought-awareness" className="block hover:underline" onClick={() => setMenuOpen(false)}>
            Drought Awareness
          </Link>
          <Link to="/farming-tips" className="block hover:underline" onClick={() => setMenuOpen(false)}>
            Farming Tips
          </Link>
          <Link to="/contact" className="block hover:underline" onClick={() => setMenuOpen(false)}>
            Contact
          </Link>

          {/* Auth buttons */}
          {user ? (
            <div className="space-y-4 pt-4 border-t border-green-600">
              <Link
                to={getDashboardLink()}
                className="block bg-white text-green-800 px-4 py-2 rounded-lg font-semibold hover:bg-green-100 transition flex items-center gap-2"
                onClick={() => setMenuOpen(false)}
              >
                <User className="h-4 w-4" />
                {getDashboardName()}
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="w-full bg-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700 transition flex items-center gap-2"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </div>
          ) : (
            <div className="space-y-4 pt-4 border-t border-green-600">
              <Link
                to="/signup"
                className="block bg-white text-green-800 px-4 py-2 rounded-lg font-semibold hover:bg-green-100 transition"
                onClick={() => setMenuOpen(false)}
              >
                Sign Up
              </Link>
              <Link
                to="/login"
                className="block bg-white text-green-800 px-4 py-2 rounded-lg font-semibold hover:bg-green-100 transition"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/admin-login"
                className="block bg-purple-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-purple-700 transition flex items-center gap-2"
                onClick={() => setMenuOpen(false)}
              >
                <Shield className="h-4 w-4" />
                Admin Login
              </Link>
            </div>
          )}
        </nav>
      )}
    </header>
  );
}
