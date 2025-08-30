import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Shield, Mail, Lock, ArrowLeft } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { loginUser } from "../utils/auth";

export default function AdminLogin() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError(""); // Clear error when user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await loginUser(formData.email, formData.password);

      if (result.success) {
        if (result.user.role === 'admin') {
          login(result.user);
          navigate('/admin-dashboard');
        } else {
          setError("Access denied. Admin credentials required.");
        }
      } else {
        setError(result.message || "Login failed. Please check your credentials.");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-indigo-50 px-4 py-8">
      <div className="bg-white shadow-xl rounded-2xl max-w-md w-full p-8">
        {/* Back to Home */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        <div className="text-center mb-8">
          <div className="bg-purple-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <Shield className="h-8 w-8 text-purple-600" />
          </div>
          <h2 className="text-3xl font-bold text-purple-800 mb-2">
            Admin Login
          </h2>
          <p className="text-gray-600">
            Access the AgriSupport administration panel
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Admin Email
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-purple-500">
              <Mail className="h-5 w-5 text-gray-400 ml-3" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="admin@agrisupport.com"
                required
                className="w-full p-3 focus:outline-none rounded-lg"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Admin Password
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-purple-500">
              <Lock className="h-5 w-5 text-gray-400 ml-3" />
              <input
                type="password"
                name="password"
                value={formData.password}
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
            className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 disabled:from-gray-400 disabled:to-gray-500 text-white py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Signing In...
              </>
            ) : (
              <>
                <Shield className="h-5 w-5" />
                Admin Login
              </>
            )}
          </button>
        </form>

        {/* Admin Info */}
        <div className="mt-8 p-4 bg-purple-50 rounded-lg border border-purple-200">
          <h3 className="text-sm font-semibold text-purple-800 mb-2">Admin Access</h3>
          <p className="text-xs text-purple-600">
            This login is restricted to authorized administrators only. 
            Unauthorized access attempts will be logged.
          </p>
        </div>

        {/* Other Login Options */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-sm text-center text-gray-600 mb-4">
            Need different access?
          </p>
          <div className="space-y-2">
            <Link
              to="/login"
              className="block w-full text-center bg-gray-600 hover:bg-gray-700 text-white py-2 rounded-lg font-medium transition-colors duration-300"
            >
              Regular User Login
            </Link>
            <Link
              to="/signup"
              className="block w-full text-center bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-medium transition-colors duration-300"
            >
              Create New Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
