'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { EmptyOrders } from '@/components/EmptyState';
import { useToast } from '@/hooks/useToast';
import { TableSkeleton } from '@/components/Skeletons';

interface OrderProduct {
  productId: {
    _id: string;
    name: string;
    price: number;
    image?: string;
  };
  quantity: number;
}

interface Order {
  _id: string;
  customerName: string;
  customerEmail: string;
  products: OrderProduct[];
  totalAmount: number;
  status: 'pending' | 'shipped' | 'delivered';
  createdAt: string;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [updatingOrderId, setUpdatingOrderId] = useState<string | null>(null);
  const [viewingOrder, setViewingOrder] = useState<Order | null>(null);
  const { success, error: showError, ToastContainer } = useToast();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError('');
      const token = localStorage.getItem('token');
      
      const response = await fetch('/api/orders', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch orders');
      }

      const data = await response.json();
      setOrders(data);
    } catch (err: any) {
      console.error('Error fetching orders:', err);
      setError(err.message || 'Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      setUpdatingOrderId(orderId);
      const token = localStorage.getItem('token');
      
      const response = await fetch(`/api/orders/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error('Failed to update order status');
      }

      const updatedOrder = await response.json();
      
      success('Order status updated successfully!');
      
      // Update orders list
      setOrders(orders.map(order => 
        order._id === orderId ? updatedOrder : order
      ));

      // Update viewing order if it's the same
      if (viewingOrder && viewingOrder._id === orderId) {
        setViewingOrder(updatedOrder);
      }
    } catch (err: any) {
      console.error('Error updating order:', err);
      showError('Failed to update order status: ' + err.message);
    } finally {
      setUpdatingOrderId(null);
    }
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-xl sm:text-xl font-bold">Orders</h1>
        </div>
        <TableSkeleton rows={6} />
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-xl sm:text-xl font-bold text-text-primary mb-2">Orders</h1>
        <p className="text-text-secondary">Manage and track customer orders</p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-800">{error}</p>
        </div>
      )}

      {/* Orders Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm p-6 border border-border">
          <h3 className="text-text-secondary text-sm font-medium mb-2">Total Orders</h3>
          <p className="text-3xl font-bold text-text-primary">{orders.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6 border border-border">
          <h3 className="text-text-secondary text-sm font-medium mb-2">Pending</h3>
          <p className="text-3xl font-bold text-yellow-600">
            {orders.filter(o => o.status === 'pending').length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6 border border-border">
          <h3 className="text-text-secondary text-sm font-medium mb-2">Shipped</h3>
          <p className="text-3xl font-bold text-blue-600">
            {orders.filter(o => o.status === 'shipped').length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6 border border-border">
          <h3 className="text-text-secondary text-sm font-medium mb-2">Delivered</h3>
          <p className="text-3xl font-bold text-green-600">
            {orders.filter(o => o.status === 'delivered').length}
          </p>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow-sm border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-border">
            <thead className="bg-bg-secondary">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  Products
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  Total Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-border">
              {orders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-0">
                    <EmptyOrders />
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr
                    key={order._id}
                    className="hover:bg-bg-main transition-colors cursor-pointer"
                    onClick={() => setViewingOrder(order)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-mono text-text-secondary">
                        #{order._id.slice(-8)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-text-primary">
                          {order.customerName}
                        </div>
                        <div className="text-sm text-text-secondary">
                          {order.customerEmail}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-text-primary">
                        {order.products.length} item(s)
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-semibold text-text-primary">
                        {formatCurrency(order.totalAmount)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                      <select
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                        disabled={updatingOrderId === order._id}
                        className={`text-sm px-3 py-1 rounded-full font-medium ${getStatusColor(order.status)} border-0 focus:ring-2 focus:ring-primary cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed`}
                      >
                        <option value="pending">Pending</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-text-secondary">
                        {formatDate(order.createdAt)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setViewingOrder(order);
                        }}
                        className="text-primary hover:text-secondary text-sm font-medium"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Details Modal */}
      {viewingOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-border">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold text-text-primary mb-1">
                    Order Details
                  </h2>
                  <p className="text-sm text-text-secondary font-mono">
                    #{viewingOrder._id}
                  </p>
                </div>
                <button
                  onClick={() => setViewingOrder(null)}
                  className="text-text-secondary hover:text-text-primary"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Customer Information */}
              <div>
                <h3 className="text-lg font-semibold text-text-primary mb-3">Customer Information</h3>
                <div className="bg-bg-main rounded-lg p-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Name:</span>
                    <span className="text-text-primary font-medium">{viewingOrder.customerName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Email:</span>
                    <span className="text-text-primary">{viewingOrder.customerEmail}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Order Date:</span>
                    <span className="text-text-primary">{formatDate(viewingOrder.createdAt)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-text-secondary">Status:</span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(viewingOrder.status)}`}>
                      {viewingOrder.status.charAt(0).toUpperCase() + viewingOrder.status.slice(1)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Products */}
              <div>
                <h3 className="text-lg font-semibold text-text-primary mb-3">Products</h3>
                <div className="space-y-3">
                  {viewingOrder.products.map((item, index) => (
                    <div key={index} className="flex items-center gap-4 bg-bg-main rounded-lg p-4">
                      {item.productId?.image && (
                        <div className="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-white">
                          <Image
                            src={item.productId.image}
                            alt={item.productId.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <h4 className="text-text-primary font-medium truncate">
                          {item.productId?.name || 'Product Unavailable'}
                        </h4>
                        <p className="text-text-secondary text-sm">
                          Quantity: {item.quantity}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-text-primary font-semibold">
                          {formatCurrency((item.productId?.price || 0) * item.quantity)}
                        </p>
                        <p className="text-text-secondary text-sm">
                          {formatCurrency(item.productId?.price || 0)} each
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Total */}
              <div className="border-t border-border pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-xl font-semibold text-text-primary">Total Amount</span>
                  <span className="text-2xl font-bold text-primary">
                    {formatCurrency(viewingOrder.totalAmount)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <ToastContainer />
    </div>
  );
}
