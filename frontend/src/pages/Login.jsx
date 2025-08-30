import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { loginUser, sendResetCode, verifyResetCode, resetPassword } from "../utils/auth";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  // Login states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  // Forgot password states
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showResetForm, setShowResetForm] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetCode, setResetCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resetLoading, setResetLoading] = useState(false);
  const [resetPasswordLoading, setResetPasswordLoading] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await loginUser(email, password);
      
      if (result.success) {
        login(result.user);
        
        // Redirect based on role
        switch (result.user.role) {
          case 'admin':
            navigate('/admin-dashboard');
            break;
          case 'farmer':
            navigate('/farmer-dashboard');
            break;
          case 'ngo':
            navigate('/ngo-dashboard');
            break;
          default:
            navigate('/');
        }
        
        alert("Login successful! Welcome back.");
      } else {
        alert(result.message);
      }
    } catch (error) {
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setResetLoading(true);

    try {
      const result = await sendResetCode(resetEmail);
      if (result.success) {
        alert("Reset code sent to your email! Please check your inbox.");
        setShowResetForm(true);
      } else {
        alert(result.message);
      }
    } catch (error) {
      alert("An error occurred. Please try again.");
    } finally {
      setResetLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    if (newPassword.length < 6) {
      alert("Password must be at least 6 characters long!");
      return;
    }

    setResetPasswordLoading(true);

    try {
      const result = await resetPassword(resetEmail, resetCode, newPassword);
      if (result.success) {
        alert("Password reset successfully! Please login with your new password.");
        // Reset all states
        setShowForgotPassword(false);
        setShowResetForm(false);
        setResetEmail("");
        setResetCode("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        alert(result.message);
      }
    } catch (error) {
      alert("An error occurred. Please try again.");
    } finally {
      setResetPasswordLoading(false);
    }
  };

  const goBackToLogin = () => {
    setShowForgotPassword(false);
    setShowResetForm(false);
    setResetEmail("");
    setResetCode("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-50 to-amber-50 px-4">
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-green-800 mb-2">
            {showForgotPassword ? "Forgot Password" : "Welcome Back"}
          </h2>
          <p className="text-gray-600">
            {showForgotPassword ? "Reset your password" : "Sign in to your AgriSupport account"}
          </p>
        </div>

        {!showForgotPassword ? (
          // Login Form
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Email</label>
              <div className="flex items-center border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-green-500">
                <Mail className="h-5 w-5 text-gray-400 ml-3" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="your.email@example.com"
                  className="w-full px-3 py-3 focus:outline-none rounded-lg"
                />
              </div>
            </div>
            
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Password</label>
              <div className="flex items-center border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-green-500">
                <Lock className="h-5 w-5 text-gray-400 ml-3" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full px-3 py-3 focus:outline-none rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="px-3 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => setShowForgotPassword(true)}
                className="text-sm text-green-700 hover:underline"
              >
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-800 text-white py-3 rounded-lg font-semibold hover:bg-green-900 disabled:bg-gray-400 transition"
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>
        ) : !showResetForm ? (
          // Forgot Password Form
          <form onSubmit={handleForgotPassword} className="space-y-4">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Email</label>
              <div className="flex items-center border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-green-500">
                <Mail className="h-5 w-5 text-gray-400 ml-3" />
                <input
                  type="email"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  required
                  placeholder="your.email@example.com"
                  className="w-full px-3 py-3 focus:outline-none rounded-lg"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={resetLoading}
              className="w-full bg-green-800 text-white py-3 rounded-lg font-semibold hover:bg-green-900 disabled:bg-gray-400 transition"
            >
              {resetLoading ? "Sending..." : "Send Reset Code"}
            </button>

            <button
              type="button"
              onClick={goBackToLogin}
              className="w-full bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-300 transition flex items-center justify-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Login
            </button>
          </form>
        ) : (
          // Reset Password Form
          <form onSubmit={handleResetPassword} className="space-y-4">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Reset Code</label>
              <div className="flex items-center border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-green-500">
                <Lock className="h-5 w-5 text-gray-400 ml-3" />
                <input
                  type="text"
                  value={resetCode}
                  onChange={(e) => setResetCode(e.target.value)}
                  required
                  placeholder="Enter 7-digit code"
                  className="w-full px-3 py-3 focus:outline-none rounded-lg"
                  maxLength="7"
                />
              </div>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">New Password</label>
              <div className="flex items-center border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-green-500">
                <Lock className="h-5 w-5 text-gray-400 ml-3" />
                <input
                  type={showNewPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full px-3 py-3 focus:outline-none rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="px-3 text-gray-400 hover:text-gray-600"
                >
                  {showNewPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Confirm New Password</label>
              <div className="flex items-center border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-green-500">
                <Lock className="h-5 w-5 text-gray-400 ml-3" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full px-3 py-3 focus:outline-none rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="px-3 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={resetPasswordLoading}
              className="w-full bg-green-800 text-white py-3 rounded-lg font-semibold hover:bg-green-900 disabled:bg-gray-400 transition"
            >
              {resetPasswordLoading ? "Resetting..." : "Reset Password"}
            </button>

            <button
              type="button"
              onClick={goBackToLogin}
              className="w-full bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-300 transition flex items-center justify-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Login
            </button>
          </form>
        )}

        {!showForgotPassword && (
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-center text-sm text-gray-600 mb-4">
              Don't have an account? Choose your role:
            </p>
            <div className="space-y-3">
              <Link
                to="/signup-farmer"
                className="block w-full text-center bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-medium transition-colors duration-300"
              >
                Sign up as Farmer
              </Link>
              <Link
                to="/signup-ngo"
                className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition-colors duration-300"
              >
                Sign up as NGO
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
