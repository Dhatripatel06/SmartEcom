import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <nav className="border-b border-border-light bg-gray-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <span className="text-white font-bold text-xl">SmartEcom</span>
            </div>
            <Link
              href="/login"
              className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-secondary transition-colors duration-200"
            >
              Sign In
            </Link>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl sm:text-6xl font-bold text-white mb-6">
            Smart E-Commerce
            <span className="block text-blue-500 mt-2">Admin Dashboard</span>
          </h1>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Powerful, modern admin panel for managing your e-commerce business.
            Track products, orders, and customers all in one place.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/login"
              className="px-8 py-4 text-lg font-semibold text-white bg-primary rounded-lg hover:bg-secondary transition-all duration-200 hover:scale-105"
            >
              Get Started
            </Link>
            <a
              href="#features"
              className="px-8 py-4 text-lg font-semibold text-white bg-gray-800 rounded-lg hover:bg-gray-700 transition-all duration-200 hover:scale-105"
            >
              Learn More
            </a>
          </div>
        </div>

        <div id="features" className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-8 hover:border-primary transition-all duration-200">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-xl font-semibold text-white mb-3">Real-time Analytics</h3>
            <p className="text-gray-400">
              Track sales, orders, and revenue with beautiful charts and insights.
            </p>
          </div>

          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-8 hover:border-primary transition-all duration-200">
            <div className="text-4xl mb-4">📦</div>
            <h3 className="text-xl font-semibold text-white mb-3">Product Management</h3>
            <p className="text-gray-400">
              Easily manage your product catalog with inventory tracking.
            </p>
          </div>

          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-8 hover:border-primary transition-all duration-200">
            <div className="text-4xl mb-4">🔒</div>
            <h3 className="text-xl font-semibold text-white mb-3">Secure & Reliable</h3>
            <p className="text-gray-400">
              Enterprise-grade security with JWT authentication and encryption.
            </p>
          </div>
        </div>
      </main>

      <footer className="border-t border-gray-700 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-gray-400 text-sm">
            © 2026 SmartEcom Admin Dashboard. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
