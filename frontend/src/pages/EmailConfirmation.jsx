import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Mail, ArrowLeft, RefreshCw, CheckCircle } from "lucide-react";
import { confirmEmail, resendConfirmation } from "../utils/auth";

export default function EmailConfirmation() {
    const navigate = useNavigate();
    const location = useLocation();
    const [code, setCode] = useState("");
    const [loading, setLoading] = useState(false);
    const [resendLoading, setResendLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [success, setSuccess] = useState(false);

    // Get email from location state or URL params
    const email = location.state?.email || new URLSearchParams(location.search).get('email');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!code || code.length !== 7) {
            setMessage("Please enter a valid 7-digit code");
            return;
        }

        setLoading(true);
        setMessage("");

        try {
            const result = await confirmEmail(email, code);

            if (result.success) {
                setSuccess(true);
                setMessage("Email confirmed successfully! You can now log in.");
                setTimeout(() => {
                    navigate('/login');
                }, 2000);
            } else {
                setMessage(result.message || "Invalid confirmation code");
            }
        } catch (error) {
            setMessage("An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleResendCode = async () => {
        setResendLoading(true);
        setMessage("");

        try {
            const result = await resendConfirmation(email);

            if (result.success) {
                setMessage("New confirmation code sent to your email!");
            } else {
                setMessage(result.message || "Failed to resend code");
            }
        } catch (error) {
            setMessage("An error occurred. Please try again.");
        } finally {
            setResendLoading(false);
        }
    };

    const handleCodeChange = (e) => {
        const value = e.target.value.replace(/\D/g, '').slice(0, 7);
        setCode(value);
    };

    if (!email) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
                <div className="max-w-md w-full bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="text-center">
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Mail className="h-8 w-8 text-red-600" />
                        </div>
                        <h2 className="text-xl font-semibold text-gray-900 mb-2">Email Required</h2>
                        <p className="text-gray-600 mb-6">Please provide an email address to confirm.</p>
                        <button
                            onClick={() => navigate('/signup')}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors"
                        >
                            Go to Signup
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (success) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
                <div className="max-w-md w-full bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="text-center">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <CheckCircle className="h-8 w-8 text-green-600" />
                        </div>
                        <h2 className="text-xl font-semibold text-gray-900 mb-2">Email Confirmed!</h2>
                        <p className="text-gray-600 mb-6">Your email has been successfully verified. Redirecting to login...</p>
                        <div className="w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Mail className="h-8 w-8 text-blue-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Confirm Your Email</h2>
                    <p className="text-gray-600">
                        We've sent a 7-digit confirmation code to
                    </p>
                    <p className="font-medium text-gray-900">{email}</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Enter Confirmation Code
                        </label>
                        <input
                            type="text"
                            value={code}
                            onChange={handleCodeChange}
                            placeholder="1234567"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center text-2xl font-mono tracking-widest"
                            maxLength={7}
                            required
                        />
                        <p className="text-xs text-gray-500 mt-1">Enter the 7-digit code from your email</p>
                    </div>

                    {message && (
                        <div className={`p-3 rounded-lg text-sm ${message.includes('successfully') || message.includes('sent')
                                ? 'bg-green-50 text-green-700 border border-green-200'
                                : 'bg-red-50 text-red-700 border border-red-200'
                            }`}>
                            {message}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading || code.length !== 7}
                        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                    >
                        {loading ? (
                            <>
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                Confirming...
                            </>
                        ) : (
                            'Confirm Email'
                        )}
                    </button>
                </form>

                <div className="mt-6 space-y-4">
                    <div className="text-center">
                        <p className="text-sm text-gray-600 mb-3">Didn't receive the code?</p>
                        <button
                            onClick={handleResendCode}
                            disabled={resendLoading}
                            className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center justify-center gap-2 mx-auto"
                        >
                            {resendLoading ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                                    Sending...
                                </>
                            ) : (
                                <>
                                    <RefreshCw className="h-4 w-4" />
                                    Resend Code
                                </>
                            )}
                        </button>
                    </div>

                    <div className="border-t pt-4">
                        <button
                            onClick={() => navigate('/signup')}
                            className="w-full text-gray-600 hover:text-gray-700 font-medium text-sm flex items-center justify-center gap-2"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Back to Signup
                        </button>
                    </div>
                </div>

                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <h4 className="text-sm font-medium text-blue-900 mb-2">Important:</h4>
                    <ul className="text-xs text-blue-700 space-y-1">
                        <li>• Check your spam/junk folder if you don't see the email</li>
                        <li>• The code expires in 30 minutes</li>
                        <li>• Make sure you entered the correct email address</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
