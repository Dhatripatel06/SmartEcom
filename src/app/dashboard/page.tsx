'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface StatCardProps {
  title: string;
  value: string | number;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
  icon: string;
}

function StatCard({ title, value, change, changeType, icon }: StatCardProps) {
  const changeColor = {
    positive: 'text-green-600 bg-green-50',
    negative: 'text-red-600 bg-red-50',
    neutral: 'text-gray-600 bg-gray-50',
  }[changeType];

  return (
    <div className="bg-bg-card rounded-lg p-6 border border-border-light shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.02] cursor-pointer group">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-text-secondary mb-1">{title}</p>
          <h3 className="text-3xl font-bold text-text-primary mb-2 group-hover:text-primary transition-colors duration-300">{value}</h3>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${changeColor}`}>
            {change}
          </span>
        </div>
        <div className="text-4xl opacity-80 group-hover:scale-110 transition-transform duration-300">{icon}</div>
      </div>
    </div>
  );
}

interface DashboardStats {
  products: {
    total: number;
    inStock: number;
    lowStock: number;
    outOfStock: number;
  };
  orders: {
    total: number;
  };
  revenue: {
    total: number;
  };
  inventory: {
    totalValue: number;
  };
}

export default function DashboardPage() {
  const router = useRouter();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/dashboard/stats', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setStats(data.stats);
      } else {
        setError('Failed to fetch dashboard statistics');
      }
    } catch (error) {
      setError('Failed to fetch dashboard statistics');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <p className="mt-4 text-text-secondary">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div className="bg-red-50 border border-red-200 text-error px-4 py-3 rounded-lg">
        {error || 'Failed to load dashboard data'}
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-text-primary">Dashboard Overview</h1>
        <p className="text-text-secondary mt-1">Welcome back! Here's what's happening today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <StatCard
          title="Total Products"
          value={stats.products.total}
          change={stats.products.total > 0 ? `${stats.products.inStock} in stock` : 'No products yet'}
          changeType={stats.products.total > 0 ? 'positive' : 'neutral'}
          icon="📦"
        />
        <StatCard
          title="Total Orders"
          value={stats.orders.total}
          change={stats.orders.total > 0 ? 'Active orders' : 'No orders yet'}
          changeType={stats.orders.total > 0 ? 'positive' : 'neutral'}
          icon="🛒"
        />
        <StatCard
          title="Inventory Value"
          value={`$${stats.inventory.totalValue.toFixed(2)}`}
          change={`${stats.products.total} total products`}
          changeType={stats.inventory.totalValue > 0 ? 'positive' : 'neutral'}
          icon="💰"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="lg:col-span-2 bg-bg-card rounded-lg border border-border-light shadow-sm p-4 sm:p-6">
          <h2 className="text-lg font-semibold text-text-primary mb-4">Inventory Status</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-bg-alt rounded-lg">
              <div>
                <p className="text-sm font-medium text-text-primary">Products In Stock</p>
                <p className="text-xs text-text-secondary mt-1">Stock {'>'} 10 units</p>
              </div>
              <span className="text-2xl font-bold text-success">{stats.products.inStock}</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-bg-alt rounded-lg">
              <div>
                <p className="text-sm font-medium text-text-primary">Low Stock Products</p>
                <p className="text-xs text-text-secondary mt-1">Stock 1-10 units</p>
              </div>
              <span className="text-2xl font-bold text-warning">{stats.products.lowStock}</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-bg-alt rounded-lg">
              <div>
                <p className="text-sm font-medium text-text-primary">Out of Stock</p>
                <p className="text-xs text-text-secondary mt-1">Requires restock</p>
              </div>
              <span className="text-2xl font-bold text-error">{stats.products.outOfStock}</span>
            </div>
          </div>
        </div>

        <div className="bg-bg-card rounded-lg border border-border-light shadow-sm p-4 sm:p-6">
          <h2 className="text-lg font-semibold text-text-primary mb-4">Quick Actions</h2>
          <div className="space-y-2">
            <button
              onClick={() => router.push('/dashboard/products')}
              className="w-full text-left px-4 py-3 bg-bg-selected text-primary rounded-lg hover:bg-bg-hover transition-all duration-200 font-medium hover:scale-[1.02] active:scale-[0.98]"
            >
              ➕ Add New Product
            </button>
            <button
              onClick={() => router.push('/dashboard/products')}
              className="w-full text-left px-4 py-3 bg-bg-alt text-text-primary rounded-lg hover:bg-bg-hover transition-all duration-200 font-medium hover:scale-[1.02] active:scale-[0.98]"
            >
              📦 View All Products
            </button>
            <button
              onClick={() => router.push('/dashboard/categories')}
              className="w-full text-left px-4 py-3 bg-bg-alt text-text-primary rounded-lg hover:bg-bg-hover transition-all duration-200 font-medium hover:scale-[1.02] active:scale-[0.98]"
            >
              📁 Manage Categories
            </button>
            <button
              onClick={() => router.push('/dashboard/orders')}
              className="w-full text-left px-4 py-3 bg-bg-alt text-text-primary rounded-lg hover:bg-bg-hover transition-all duration-200 font-medium hover:scale-[1.02] active:scale-[0.98]"
            >
              📋 View Orders
            </button>
          </div>
        </div>
      </div>

      <div className="bg-bg-card rounded-lg border border-border-light shadow-sm p-4 sm:p-6">
        <h2 className="text-lg font-semibold text-text-primary mb-4">System Status</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Database', status: 'Connected', type: 'success' },
            { label: 'Product API', status: 'Operational', type: 'success' },
            { label: 'Category API', status: 'Operational', type: 'success' },
            { label: 'Authentication', status: 'Active', type: 'success' },
          ].map((item, index) => {
            const statusColor = {
              success: 'bg-green-100 text-success',
              warning: 'bg-yellow-100 text-warning',
              error: 'bg-red-100 text-error',
            }[item.type];

            return (
              <div key={index} className="flex flex-col items-center p-4 border border-border-subtle rounded-lg">
                <span className="text-sm text-text-primary font-medium mb-2">{item.label}</span>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColor}`}>
                  {item.status}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
