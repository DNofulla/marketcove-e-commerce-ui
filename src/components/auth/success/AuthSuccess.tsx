import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import LogoVertical from "../../../assets/MarketCoveFullVertical.png";

const AuthSuccess: React.FC = () => {
  const { user, logout } = useAuth();

  const getRoleDescription = () => {
    switch (user?.role) {
      case "CUSTOMER":
        return "You can now browse and purchase products from our marketplace.";
      case "SELLER":
        return "You can now start listing and selling your products.";
      case "BUSINESS_OWNER":
        return "You can now manage your business operations and marketplace presence.";
      case "ADMIN":
        return "You have administrative access to the platform.";
      default:
        return "Welcome to MarketCove!";
    }
  };

  const getNextSteps = () => {
    switch (user?.role) {
      case "CUSTOMER":
        return [
          "Browse our product catalog",
          "Set up your delivery preferences",
          "Start shopping and discover amazing deals",
        ];
      case "SELLER":
        return [
          "Set up your seller profile",
          "Add your first product listing",
          "Configure payment and shipping options",
        ];
      case "BUSINESS_OWNER":
        return [
          "Complete your business verification",
          "Set up your business dashboard",
          "Start managing your marketplace presence",
        ];
      case "ADMIN":
        return [
          "Access the admin dashboard",
          "Review platform analytics",
          "Manage users and content",
        ];
      default:
        return [
          "Explore the platform",
          "Complete your profile",
          "Start using MarketCove",
        ];
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-2xl">
        <div className="bg-white rounded-lg shadow-lg dark:border dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-6 md:space-y-8 sm:p-8">
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
              <div className="w-20 h-20 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center dark:bg-green-900/20">
                <svg
                  className="w-10 h-10 text-green-600 dark:text-green-400"
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

              <h1 className="text-2xl font-bold leading-tight tracking-tight text-gray-900 md:text-3xl dark:text-white mb-2">
                Welcome to MarketCove!
              </h1>

              <p className="text-lg text-gray-600 dark:text-gray-400 mb-2">
                Authentication Successful
              </p>

              {user && (
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-4">
                  <p className="text-sm text-blue-800 dark:text-blue-200 font-medium">
                    Welcome, {user.firstName} {user.lastName}!
                  </p>
                  <p className="text-sm text-blue-600 dark:text-blue-300">
                    Account Type: {user.role.replace("_", " ")}
                  </p>
                  {user.profileName && (
                    <p className="text-sm text-blue-600 dark:text-blue-300">
                      Profile: {user.profileName}
                    </p>
                  )}
                </div>
              )}

              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {getRoleDescription()}
              </p>
            </div>

            {/* Account Status */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    {user?.emailVerified ? (
                      <div className="w-8 h-8 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
                        <svg
                          className="w-4 h-4 text-green-600 dark:text-green-400"
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
                    ) : (
                      <div className="w-8 h-8 bg-yellow-100 dark:bg-yellow-900/20 rounded-full flex items-center justify-center">
                        <svg
                          className="w-4 h-4 text-yellow-600 dark:text-yellow-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      Email Verification
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {user?.emailVerified
                        ? "Verified"
                        : "Pending verification"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    {user?.profileVerified ? (
                      <div className="w-8 h-8 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
                        <svg
                          className="w-4 h-4 text-green-600 dark:text-green-400"
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
                    ) : (
                      <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
                        <svg
                          className="w-4 h-4 text-blue-600 dark:text-blue-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      Profile Status
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {user?.profileVerified ? "Verified" : "Setup required"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Next Steps */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Next Steps
              </h3>
              <ul className="space-y-2">
                {getNextSteps().map((step, index) => (
                  <li key={index} className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium mr-3 mt-0.5">
                      {index + 1}
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">{step}</p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                to="/dashboard"
                className="flex-1 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Go to Dashboard
              </Link>

              <Link
                to="/home"
                className="flex-1 text-blue-600 bg-blue-50 hover:bg-blue-100 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-3 text-center dark:bg-blue-900/20 dark:text-blue-400 dark:hover:bg-blue-900/30 dark:focus:ring-blue-800"
              >
                Explore MarketCove
              </Link>
            </div>

            {/* User Actions */}
            <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
              <div className="flex items-center justify-between text-sm">
                <div className="text-gray-500 dark:text-gray-400">
                  Logged in as: {user?.email}
                </div>
                <button
                  onClick={logout}
                  className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-200 font-medium"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuthSuccess;
