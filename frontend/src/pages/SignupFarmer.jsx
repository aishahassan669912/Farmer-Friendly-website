import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, User, MapPin, Phone, Calendar } from "lucide-react";
import { signupUser } from "../utils/auth";
import { useAuth } from "../context/AuthContext";

const SignupFarmer = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    location: "",
    farmSize: "",
    crops: "",
    droughtImpact: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      setLoading(false);
      return;
    }

    try {
      const result = await signupUser({
        ...formData,
        role: 'farmer',
        farmSize: parseFloat(formData.farmSize) || 0,
      });

      if (result.success) {
        alert("Account created successfully! Please login to access your dashboard.");
        navigate('/login');
      } else {
        alert(result.message);
      }
    } catch (error) {
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-amber-50 px-4 py-8">
      <div className="bg-white shadow-xl rounded-2xl max-w-md w-full p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-green-800 mb-2">
            Farmer Registration
          </h2>
          <p className="text-gray-600">
            Join AgriSupport to get help with drought management
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name *
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-green-500">
              <User className="h-5 w-5 text-gray-400 ml-3" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your full name"
                required
                className="w-full p-3 focus:outline-none rounded-lg"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address *
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-green-500">
              <Mail className="h-5 w-5 text-gray-400 ml-3" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your.email@example.com"
                required
                className="w-full p-3 focus:outline-none rounded-lg"
              />
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number *
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-green-500">
              <Phone className="h-5 w-5 text-gray-400 ml-3" />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+1234567890"
                required
                className="w-full p-3 focus:outline-none rounded-lg"
              />
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Farm Location *
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-green-500">
              <MapPin className="h-5 w-5 text-gray-400 ml-3" />
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="City, State, Country"
                required
                className="w-full p-3 focus:outline-none rounded-lg"
              />
            </div>
          </div>

          {/* Farm Size */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Farm Size (acres) *
            </label>
            <input
              type="number"
              name="farmSize"
              value={formData.farmSize}
              onChange={handleChange}
              placeholder="e.g., 50"
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Crops */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Main Crops *
            </label>
            <input
              type="text"
              name="crops"
              value={formData.crops}
              onChange={handleChange}
              placeholder="e.g., Corn, Wheat, Soybeans"
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Drought Impact */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Drought Impact Level *
            </label>
            <select
              name="droughtImpact"
              value={formData.droughtImpact}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Select impact level</option>
              <option value="low">Low - Some crop stress</option>
              <option value="medium">Medium - Significant yield loss expected</option>
              <option value="high">High - Severe crop damage</option>
              <option value="critical">Critical - Complete crop failure</option>
            </select>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password *
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-green-500">
              <Lock className="h-5 w-5 text-gray-400 ml-3" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
                minLength="6"
                className="w-full p-3 focus:outline-none rounded-lg"
              />
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password *
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-green-500">
              <Lock className="h-5 w-5 text-gray-400 ml-3" />
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                required
                className="w-full p-3 focus:outline-none rounded-lg"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-700 hover:bg-green-800 disabled:bg-gray-400 text-white py-3 rounded-lg font-medium transition-colors duration-300"
          >
            {loading ? "Creating Account..." : "Create Farmer Account"}
          </button>
        </form>

        {/* Login Link */}
        <p className="text-sm text-center text-gray-600 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-green-700 hover:underline font-medium">
            Log in
          </Link>
        </p>

        {/* Other Signup Options */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-sm text-center text-gray-600 mb-4">
            Or sign up as:
          </p>
          <div className="space-y-2">
            <Link
              to="/signup-ngo"
              className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition-colors duration-300"
            >
              NGO/Organization
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupFarmer;
