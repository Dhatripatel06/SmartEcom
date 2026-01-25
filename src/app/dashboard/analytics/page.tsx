'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell } from 'recharts';

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

const COLORS = ['#4F8CFF', '#6C7CFF', '#FF6B9D', '#FFA94D'];

export default function AnalyticsPage() {
  const router = useRouter();
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/analytics', {
        headers: { 'Authorization': `Bearer ${token}` },
      });

      if (response.ok) {
        const data = await response.json();
        setAnalytics(data.analytics);
      } else {
        setError('Failed to fetch analytics data');
      }
    } catch (error) {
      setError('Failed to fetch analytics data');
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
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <p className="mt-4 text-text-secondary">Loading analytics...</p>
        </div>
      </div>
    );
  }

  if (error || !analytics) {
    return (
      <div className="p-8">
        <div className="bg-red-50 border border-red-200 text-error px-4 py-3 rounded-lg">
          {error || 'Failed to load analytics data'}
        </div>
      </div>
    );
  }

  const statusData = [
    { name: 'Pending', value: analytics.statusBreakdown.pending, color: '#FFA94D' },
    { name: 'Shipped', value: analytics.statusBreakdown.shipped, color: '#4F8CFF' },
    { name: 'Delivered', value: analytics.statusBreakdown.delivered, color: '#10B981' },
  ];

  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-xl sm:text-xl font-bold text-text-primary">Advanced Analytics</h1>
        <p className="text-text-secondary mt-1">Comprehensive insights and data visualization</p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-6 text-white shadow-lg">
          <p className="text-blue-100 text-sm mb-2">Total Products</p>
          <p className="text-4xl font-bold">{analytics.overview.totalProducts}</p>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg p-6 text-white shadow-lg">
          <p className="text-purple-100 text-sm mb-2">Total Orders</p>
          <p className="text-4xl font-bold">{analytics.overview.totalOrders}</p>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg p-6 text-white shadow-lg">
          <p className="text-green-100 text-sm mb-2">Total Revenue</p>
          <p className="text-4xl font-bold">{formatCurrency(analytics.overview.totalRevenue)}</p>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Sales Chart */}
        <div className="bg-white rounded-lg border border-border shadow-sm p-6">
          <h2 className="text-xl font-semibold text-text-primary mb-4">Monthly Revenue Trend</h2>
          {analytics.monthlySales.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={analytics.monthlySales}>
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
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#4F8CFF" 
                  strokeWidth={3}
                  dot={{ fill: '#4F8CFF', r: 5 }}
                  activeDot={{ r: 7 }}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-64 text-text-secondary">
              No sales data available
            </div>
          )}
        </div>

        {/* Order Status Breakdown */}
        <div className="bg-white rounded-lg border border-border shadow-sm p-6">
          <h2 className="text-xl font-semibold text-text-primary mb-4">Order Status Distribution</h2>
          {statusData.some(d => d.value > 0) ? (
            <div className="flex items-center justify-center">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${((percent || 0) * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: any) => [`${value} orders`, 'Count']} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="flex items-center justify-center h-64 text-text-secondary">
              No order data available
            </div>
          )}
        </div>
      </div>

      {/* Monthly Orders Chart */}
      <div className="bg-white rounded-lg border border-border shadow-sm p-6">
        <h2 className="text-xl font-semibold text-text-primary mb-4">Monthly Order Volume</h2>
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
              />
              <Tooltip 
                formatter={(value: any) => [`${value} orders`, 'Orders']}
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                }}
              />
              <Bar dataKey="orders" fill="#6C7CFF" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex items-center justify-center h-64 text-text-secondary">
            No order data available
          </div>
        )}
      </div>

      {/* Data Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white rounded-lg border border-border shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-text-primary">Recent Orders</h2>
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
                  className="flex items-center justify-between p-4 bg-bg-alt rounded-lg hover:bg-bg-hover transition-colors cursor-pointer"
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
        <div className="bg-white rounded-lg border border-border shadow-sm p-6">
          <h2 className="text-xl font-semibold text-text-primary mb-4">Top Selling Products</h2>
          {analytics.topProducts.length > 0 ? (
            <div className="space-y-3">
              {analytics.topProducts.map((product, index) => (
                <div
                  key={product._id}
                  className="flex items-center justify-between p-4 bg-bg-alt rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    >
                      #{index + 1}
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
                    <p className="text-lg font-bold text-primary">
                      {product.totalQuantity}
                    </p>
                    <p className="text-xs text-text-secondary">units sold</p>
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
    </div>
  );
}
