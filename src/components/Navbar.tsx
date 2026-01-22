'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

interface NavbarProps {
  onMenuClick: () => void;
}

interface User {
  name: string;
  email: string;
  role: string;
}

export default function Navbar({ onMenuClick }: NavbarProps) {
  const router = useRouter();
  const [showDropdown, setShowDropdown] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/login');
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <nav className="bg-bg-card border-b border-border-light sticky top-0 z-10 shadow-sm">
      <div className="px-4 lg:px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <h2 className="text-xl font-semibold text-text-primary">Admin Panel</h2>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200 relative">
            <span className="text-xl">🔔</span>
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-2 sm:gap-3 p-2 hover:bg-bg-hover rounded-lg transition-colors duration-200"
            >
              <div className="w-9 h-9 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white font-semibold shadow-sm">
                {user ? getInitials(user.name) : 'AD'}
              </div>
              <div className="text-left hidden sm:block">
                <p className="text-sm font-medium text-text-primary">{user?.name || 'Admin User'}</p>
                <p className="text-xs text-text-secondary">{user?.email || 'admin@company.com'}</p>
              </div>
              <span className="text-gray-400 text-xs hidden sm:block">▼</span>
            </button>

            {showDropdown && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setShowDropdown(false)}
                />
                <div className="absolute right-0 mt-2 w-48 bg-bg-card rounded-lg shadow-lg border border-border-light py-2 z-20">
                  <div className="px-4 py-2 border-b border-border-light">
                    <p className="text-xs text-text-secondary">Signed in as</p>
                    <p className="text-sm font-medium text-text-primary truncate">{user?.email}</p>
                  </div>
                  <button className="w-full px-4 py-2 text-left text-sm text-text-primary hover:bg-bg-hover transition-colors duration-200 flex items-center gap-2">
                    <span>👤</span> Profile
                  </button>
                  <button className="w-full px-4 py-2 text-left text-sm text-text-primary hover:bg-bg-hover transition-colors duration-200 flex items-center gap-2">
                    <span>⚙️</span> Settings
                  </button>
                  <hr className="my-2 border-border-light" />
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 text-left text-sm text-error hover:bg-red-50 transition-colors duration-200 flex items-center gap-2"
                  >
                    <span>🚪</span> Logout
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
