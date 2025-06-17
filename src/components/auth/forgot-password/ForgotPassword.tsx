import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import LogoVertical from "../../../assets/MarketCoveFullVertical.png";

const ForgotPassword: React.FC = () => {
  const { forgotPassword, isLoading, error, clearError } = useAuth();

  const [email, setEmail] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [emailError, setEmailError] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);

    // Clear errors when user starts typing
    if (emailError) {
      setEmailError("");
    }
    if (error) {
      clearError();
    }
  };

  const validateEmail = (): boolean => {
    if (!email) {
      setEmailError("Email is required");
      return false;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Please enter a valid email address");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail()) return;

    try {
      await forgotPassword(email);
      setIsEmailSent(true);
    } catch (error) {
      // Error is handled by the context
      console.error("Forgot password failed:", error);
    }
  };

  if (isEmailSent) {
    return (
      <section className="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-lg shadow-lg dark:border dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              {/* Logo */}
              <div className="flex justify-center">
                <img
                  className="w-48 h-auto"
                  src={LogoVertical}
                  alt="MarketCove Logo"
                />
              </div>

              {/* Success Message */}
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center dark:bg-green-900/20">
                  <svg
                    className="w-8 h-8 text-green-600 dark:text-green-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>

                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Check Your Email
                </h1>

                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  We've sent password reset instructions to:
                </p>
                <p className="mt-1 text-sm font-medium text-gray-900 dark:text-white">
                  {email}
                </p>

                <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                  Didn't receive the email? Check your spam folder or try again.
                </p>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <button
                  onClick={() => {
                    setIsEmailSent(false);
                    setEmail("");
                  }}
                  className="w-full text-blue-600 bg-blue-50 hover:bg-blue-100 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-900/20 dark:text-blue-400 dark:hover:bg-blue-900/30 dark:focus:ring-blue-800"
                >
                  Try Different Email
                </button>

                <Link
                  to="/login"
                  className="block w-full text-gray-600 bg-gray-50 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 dark:focus:ring-gray-800"
                >
                  Back to Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-lg dark:border dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            {/* Logo */}
            <div className="flex justify-center">
              <img
                className="w-48 h-auto"
                src={LogoVertical}
                alt="MarketCove Logo"
              />
            </div>

            {/* Title */}
            <div className="text-center">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Forgot Password?
              </h1>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                No worries, we'll send you reset instructions.
              </p>
            </div>

            {/* Global Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg dark:bg-red-900/20 dark:border-red-800 dark:text-red-400">
                <p className="text-sm">{error}</p>
              </div>
            )}

            {/* Forgot Password Form */}
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={handleInputChange}
                  className={`bg-gray-50 border text-gray-900 rounded-lg focus:ring-2 focus:border-transparent block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white ${
                    emailError
                      ? "border-red-500 focus:ring-red-500 dark:focus:ring-red-500"
                      : "border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-500"
                  }`}
                  placeholder="Enter your email address"
                  required
                />
                {emailError && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {emailError}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Sending Reset Link...
                  </>
                ) : (
                  "Send Reset Link"
                )}
              </button>

              {/* Back to Login Link */}
              <div className="text-center">
                <Link
                  to="/login"
                  className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white flex items-center justify-center"
                >
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    />
                  </svg>
                  Back to Login
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;
