'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { StatsGridSkeleton, ChartSkeleton } from '@/components/Skeletons';

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
    pending: number;
    shipped: number;
    delivered: number;
  };
  revenue: {
    total: number;
  };
  inventory: {
    totalValue: number;
  };
}

interface MonthlySale {
  year: number;
  month: number;
  monthName: string;
  revenue: number;
  orders: number;
}

interface RecentOrder {
  _id: string;
  customerName: string;
  customerEmail: string;
  totalAmount: number;
  status: string;
  createdAt: string;
  products: any[];
}

interface TopProduct {
  _id: string;
  name: string;
  totalQuantity: number;
  orderCount: number;
}

interface AnalyticsData {
  overview: {
    totalProducts: number;
    totalOrders: number;
    totalRevenue: number;
  };
  monthlySales: MonthlySale[];
  recentOrders: RecentOrder[];
  statusBreakdown: {
    pending: number;
    shipped: number;
    delivered: number;
  };
  topProducts: TopProduct[];
}

export default function DashboardPage() {
  const router = useRouter();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      
      // Fetch both stats and analytics in parallel
      const [statsResponse, analyticsResponse] = await Promise.all([
        fetch('/api/dashboard/stats', {
          headers: { 'Authorization': `Bearer ${token}` },
        }),
        fetch('/api/analytics', {
          headers: { 'Authorization': `Bearer ${token}` },
        })
      ]);

      if (statsResponse.ok && analyticsResponse.ok) {
        const statsData = await statsResponse.json();
        const analyticsData = await analyticsResponse.json();
        setStats(statsData.stats);
        setAnalytics(analyticsData.analytics);
      } else {
        setError('Failed to fetch dashboard data');
      }
    } catch (error) {
      setError('Failed to fetch dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'shipped':
        return 'bg-blue-100 text-blue-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-xl sm:text-xl font-bold">Dashboard</h1>
          <p className="text-gray-300 mt-1">Loading your data...</p>
        </div>
        <StatsGridSkeleton count={4} />
        <ChartSkeleton height={300} />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartSkeleton height={250} />
          <ChartSkeleton height={250} />
        </div>
      </div>
    );
  }

  if (error || !stats || !analytics) {
    return (
      <div className="bg-red-50 border border-red-200 text-error px-4 py-3 rounded-lg">
        {error || 'Failed to load dashboard data'}
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h1 className="text-xl sm:text-xl font-bold text-text-primary">Dashboard</h1>
        <p className="text-text-secondary mt-1">Real-time insights from your e-commerce data</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <StatCard
          title="Total Products"
          value={analytics.overview.totalProducts}
          change={`${stats.products.inStock} in stock`}
          changeType="positive"
          icon="📦"
        />
        <StatCard
          title="Total Orders"
          value={analytics.overview.totalOrders}
          change={`${analytics.statusBreakdown.pending} pending`}
          changeType="positive"
          icon="🛒"
        />
        <StatCard
          title="Total Revenue"
          value={formatCurrency(analytics.overview.totalRevenue)}
          change={`${analytics.statusBreakdown.delivered} delivered`}
          changeType="positive"
          icon="💰"
        />
        <StatCard
          title="Inventory Value"
          value={formatCurrency(stats.inventory.totalValue)}
          change={`${stats.products.total} products`}
          changeType="positive"
          icon="📊"
        />
      </div>

      {/* Sales Chart */}
      <div className="bg-bg-card rounded-lg border border-border-light shadow-sm p-4 sm:p-6">
        <h2 className="text-lg font-semibold text-text-primary mb-4">Monthly Revenue</h2>
        {analytics.monthlySales.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={analytics.monthlySales}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="monthName" 
                stroke="#6B7280"
                style={{ fontSize: '12px' }}
              />
              <YAxis 
                stroke="#6B7280"
                style={{ fontSize: '12px' }}
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip 
                formatter={(value: any) => [`$${value.toFixed(2)}`, 'Revenue']}
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                }}
              />
              <Bar dataKey="revenue" fill="#4F8CFF" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex items-center justify-center h-64 text-text-secondary">
            No sales data available yet
          </div>
        )}
      </div>

      {/* Recent Orders and Top Products */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Recent Orders */}
        <div className="bg-bg-card rounded-lg border border-border-light shadow-sm p-4 sm:p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-text-primary">Recent Orders</h2>
            <button
              onClick={() => router.push('/dashboard/orders')}
              className="text-sm text-primary hover:text-secondary font-medium"
            >
              View All →
            </button>
          </div>
          {analytics.recentOrders.length > 0 ? (
            <div className="space-y-3">
              {analytics.recentOrders.map((order) => (
                <div
                  key={order._id}
                  className="flex items-center justify-between p-3 bg-bg-alt rounded-lg hover:bg-bg-hover transition-colors cursor-pointer"
                  onClick={() => router.push('/dashboard/orders')}
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-text-primary truncate">
                      {order.customerName}
                    </p>
                    <p className="text-xs text-text-secondary">
                      {formatDate(order.createdAt)}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold text-text-primary">
                      {formatCurrency(order.totalAmount)}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-40 text-text-secondary">
              No recent orders
            </div>
          )}
        </div>

        {/* Top Products */}
        <div className="bg-bg-card rounded-lg border border-border-light shadow-sm p-4 sm:p-6">
          <h2 className="text-lg font-semibold text-text-primary mb-4">Top Products</h2>
          {analytics.topProducts.length > 0 ? (
            <div className="space-y-3">
              {analytics.topProducts.map((product, index) => (
                <div
                  key={product._id}
                  className="flex items-center justify-between p-3 bg-bg-alt rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">
                      {index + 1}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-text-primary">
                        {product.name}
                      </p>
                      <p className="text-xs text-text-secondary">
                        {product.orderCount} orders
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-text-primary">
                      {product.totalQuantity} sold
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-40 text-text-secondary">
              No product data available
            </div>
          )}
        </div>
      </div>

      {/* Status Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <div className="bg-bg-card rounded-lg border border-border-light shadow-sm p-4 sm:p-6">
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
          <h2 className="text-lg font-semibold text-text-primary mb-4">Order Status</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-bg-alt rounded-lg">
              <div>
                <p className="text-sm font-medium text-text-primary">Pending Orders</p>
                <p className="text-xs text-text-secondary mt-1">Awaiting processing</p>
              </div>
              <span className="text-2xl font-bold text-warning">{stats.orders.pending}</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-bg-alt rounded-lg">
              <div>
                <p className="text-sm font-medium text-text-primary">Shipped Orders</p>
                <p className="text-xs text-text-secondary mt-1">In transit</p>
              </div>
              <span className="text-2xl font-bold text-blue-600">{stats.orders.shipped}</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-bg-alt rounded-lg">
              <div>
                <p className="text-sm font-medium text-text-primary">Delivered Orders</p>
                <p className="text-xs text-text-secondary mt-1">Completed</p>
              </div>
              <span className="text-2xl font-bold text-success">{stats.orders.delivered}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-bg-card rounded-lg border border-border-light shadow-sm p-4 sm:p-6">
        <h2 className="text-lg font-semibold text-text-primary mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <button
            onClick={() => router.push('/dashboard/products')}
            className="text-center px-4 py-3 bg-bg-selected text-primary rounded-lg hover:bg-bg-hover transition-all duration-200 font-medium hover:scale-[1.02] active:scale-[0.98]"
          >
            ➕ Add New Product
          </button>
          <button
            onClick={() => router.push('/dashboard/products')}
            className="text-center px-4 py-3 bg-bg-alt text-text-primary rounded-lg hover:bg-bg-hover transition-all duration-200 font-medium hover:scale-[1.02] active:scale-[0.98]"
          >
            📦 View All Products
          </button>
          <button
            onClick={() => router.push('/dashboard/categories')}
            className="text-center px-4 py-3 bg-bg-alt text-text-primary rounded-lg hover:bg-bg-hover transition-all duration-200 font-medium hover:scale-[1.02] active:scale-[0.98]"
          >
            📁 Manage Categories
          </button>
          <button
            onClick={() => router.push('/dashboard/orders')}
            className="text-center px-4 py-3 bg-bg-alt text-text-primary rounded-lg hover:bg-bg-hover transition-all duration-200 font-medium hover:scale-[1.02] active:scale-[0.98]"
          >
            📋 View Orders
          </button>
        </div>
      </div>
    </div>
  );
}
