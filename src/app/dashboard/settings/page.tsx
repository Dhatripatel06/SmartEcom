'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/useToast';

export default function SettingsPage() {
  const router = useRouter();
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const { success, error: showError, ToastContainer } = useToast();

  useEffect(() => {
    // Get user info from token (decode JWT)
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    // Decode JWT to get user info (basic decode without verification)
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      setUser({
        name: payload.name || 'Admin User',
        email: payload.email || 'admin@smartecom.com',
      });
    } catch (error) {
      console.error('Failed to decode token');
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    success('Logged out successfully!');
    setTimeout(() => {
      router.push('/login');
    }, 1000);
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-xl sm:text-xl font-bold text-text-primary mb-2">Settings</h1>
        <p className="text-text-secondary">Manage your account settings and preferences</p>
      </div>

      {/* Account Information */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-border mb-6">
        <h2 className="text-lg font-semibold text-text-primary mb-4">Account Information</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">Name</label>
            <input
              type="text"
              value={user?.name || ''}
              disabled
              className="w-full px-4 py-2 border border-border-light rounded-lg bg-gray-50 text-text-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">Email</label>
            <input
              type="email"
              value={user?.email || ''}
              disabled
              className="w-full px-4 py-2 border border-border-light rounded-lg bg-gray-50 text-text-primary"
            />
          </div>
          <p className="text-xs text-text-muted">Account details cannot be modified at this time.</p>
        </div>
      </div>

      {/* Application Settings */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-border mb-6">
        <h2 className="text-lg font-semibold text-text-primary mb-4">Application Settings</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-border-light">
            <div>
              <p className="font-medium text-text-primary">Email Notifications</p>
              <p className="text-sm text-text-secondary">Receive email alerts for new orders</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          <div className="flex items-center justify-between py-3 border-b border-border-light">
            <div>
              <p className="font-medium text-text-primary">Low Stock Alerts</p>
              <p className="text-sm text-text-secondary">Get notified when products are running low</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          <div className="flex items-center justify-between py-3">
            <div>
              <p className="font-medium text-text-primary">Order Updates</p>
              <p className="text-sm text-text-secondary">Receive notifications when order status changes</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-red-200 mb-6">
        <h2 className="text-lg font-semibold text-red-600 mb-4">Danger Zone</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between py-3">
            <div>
              <p className="font-medium text-text-primary">Logout from Account</p>
              <p className="text-sm text-text-secondary">Sign out of your current session</p>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* System Information */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-border">
        <h2 className="text-lg font-semibold text-text-primary mb-4">System Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-text-secondary">Version</p>
            <p className="font-medium text-text-primary">1.0.0</p>
          </div>
          <div>
            <p className="text-sm text-text-secondary">Last Updated</p>
            <p className="font-medium text-text-primary">January 25, 2026</p>
          </div>
          <div>
            <p className="text-sm text-text-secondary">Database</p>
            <p className="font-medium text-text-primary">MongoDB Atlas</p>
          </div>
          <div>
            <p className="text-sm text-text-secondary">Environment</p>
            <p className="font-medium text-text-primary">Development</p>
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}
