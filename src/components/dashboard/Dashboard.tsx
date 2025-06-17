import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../auth/context/AuthContext";

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();

  const getDashboardContent = () => {
    switch (user?.role) {
      case "CUSTOMER":
        return {
          title: "Customer Dashboard",
          description: "Welcome to your shopping dashboard",
          cards: [
            {
              title: "Browse Products",
              description: "Discover amazing products",
              icon: "🛍️",
              link: "/products",
            },
            {
              title: "My Orders",
              description: "Track your orders",
              icon: "📦",
              link: "/orders",
            },
            {
              title: "Wishlist",
              description: "Your saved items",
              icon: "❤️",
              link: "/wishlist",
            },
            {
              title: "Account Settings",
              description: "Manage your profile",
              icon: "⚙️",
              link: "/settings",
            },
          ],
        };
      case "SELLER":
        return {
          title: "Seller Dashboard",
          description: "Manage your products and sales",
          cards: [
            {
              title: "My Products",
              description: "Manage your listings",
              icon: "📝",
              link: "/seller/products",
            },
            {
              title: "Sales Analytics",
              description: "View your performance",
              icon: "📊",
              link: "/seller/analytics",
            },
            {
              title: "Orders",
              description: "Manage customer orders",
              icon: "📋",
              link: "/seller/orders",
            },
            {
              title: "Shop Settings",
              description: "Configure your shop",
              icon: "🏪",
              link: "/seller/settings",
            },
          ],
        };
      case "BUSINESS_OWNER":
        return {
          title: "Business Dashboard",
          description: "Manage your business operations",
          cards: [
            {
              title: "Business Overview",
              description: "Key metrics and KPIs",
              icon: "📈",
              link: "/business/overview",
            },
            {
              title: "Team Management",
              description: "Manage your team",
              icon: "👥",
              link: "/business/team",
            },
            {
              title: "Financial Reports",
              description: "View financial data",
              icon: "💰",
              link: "/business/finances",
            },
            {
              title: "Business Settings",
              description: "Configure your business",
              icon: "🏢",
              link: "/business/settings",
            },
          ],
        };
      case "ADMIN":
        return {
          title: "Admin Dashboard",
          description: "Platform administration and management",
          cards: [
            {
              title: "User Management",
              description: "Manage platform users",
              icon: "👤",
              link: "/admin/users",
            },
            {
              title: "Content Moderation",
              description: "Review and moderate content",
              icon: "🛡️",
              link: "/admin/moderation",
            },
            {
              title: "Platform Analytics",
              description: "Platform performance metrics",
              icon: "📊",
              link: "/admin/analytics",
            },
            {
              title: "System Settings",
              description: "Configure platform settings",
              icon: "⚙️",
              link: "/admin/settings",
            },
          ],
        };
      default:
        return {
          title: "Dashboard",
          description: "Welcome to MarketCove",
          cards: [
            {
              title: "Getting Started",
              description: "Learn how to use the platform",
              icon: "🚀",
              link: "/getting-started",
            },
            {
              title: "Support",
              description: "Get help and support",
              icon: "💬",
              link: "/support",
            },
            {
              title: "Documentation",
              description: "Read our documentation",
              icon: "📚",
              link: "/docs",
            },
            {
              title: "Profile",
              description: "Complete your profile",
              icon: "👤",
              link: "/profile",
            },
          ],
        };
    }
  };

  const dashboardContent = getDashboardContent();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                MarketCove
              </h1>
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600 dark:text-gray-300">
                Welcome, {user?.firstName} {user?.lastName}
              </div>
              <button
                onClick={logout}
                className="text-sm text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-200 font-medium"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Dashboard Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {dashboardContent.title}
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            {dashboardContent.description}
          </p>
        </div>

        {/* User Info Card */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow mb-8 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Account Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Email
              </div>
              <div className="font-medium text-gray-900 dark:text-white">
                {user?.email}
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Role
              </div>
              <div className="font-medium text-gray-900 dark:text-white">
                {user?.role.replace("_", " ")}
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Email Status
              </div>
              <div
                className={`font-medium ${
                  user?.emailVerified
                    ? "text-green-600 dark:text-green-400"
                    : "text-yellow-600 dark:text-yellow-400"
                }`}
              >
                {user?.emailVerified ? "Verified" : "Pending"}
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Profile Status
              </div>
              <div
                className={`font-medium ${
                  user?.profileVerified
                    ? "text-green-600 dark:text-green-400"
                    : "text-blue-600 dark:text-blue-400"
                }`}
              >
                {user?.profileVerified ? "Verified" : "Setup Required"}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {dashboardContent.cards.map((card, index) => (
            <Link
              key={index}
              to={card.link}
              className="bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition-shadow duration-200 p-6 block"
            >
              <div className="text-3xl mb-4">{card.icon}</div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {card.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {card.description}
              </p>
              <div className="mt-4 text-blue-600 dark:text-blue-400 text-sm font-medium">
                Learn more →
              </div>
            </Link>
          ))}
        </div>

        {/* Recent Activity Placeholder */}
        <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Recent Activity
          </h3>
          <div className="text-center py-8">
            <svg
              className="w-12 h-12 text-gray-400 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            <p className="text-gray-500 dark:text-gray-400">
              No recent activity to display. Start exploring the platform to see
              your activity here.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
