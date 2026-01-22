'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import EmptyState from '@/components/EmptyState';
import ProductForm from '@/components/ProductForm';

interface Product {
  _id: string;
  name: string;
  price: number;
  description?: string;
  categoryId: { _id: string; name: string };
  image?: string;
  stock: number;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [viewingProduct, setViewingProduct] = useState<Product | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/products', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setProducts(data.products || []);
      } else {
        const errorData = await response.json();
        console.error('API Error:', errorData);
        setError(errorData.error || 'Failed to fetch products');
      }
    } catch (error: any) {
      console.error('Fetch error:', error);
      setError(error.message || 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProduct = async (formData: FormData) => {
    const token = localStorage.getItem('token');
    const response = await fetch('/api/products', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error || 'Failed to create product');
    }

    await fetchProducts();
    setShowForm(false);
  };

  const handleUpdateProduct = async (formData: FormData) => {
    if (!editingProduct) return;

    const token = localStorage.getItem('token');
    const response = await fetch(`/api/products/${editingProduct._id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error || 'Failed to update product');
    }

    await fetchProducts();
    setEditingProduct(null);
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        await fetchProducts();
      } else {
        alert('Failed to delete product');
      }
    } catch (error) {
      alert('Failed to delete product');
    }
  };

  const stats = {
    total: products.length,
    inStock: products.filter(p => p.stock > 10).length,
    lowStock: products.filter(p => p.stock > 0 && p.stock <= 10).length,
    outOfStock: products.filter(p => p.stock === 0).length,
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <p className="mt-4 text-text-secondary">Loading products...</p>
        </div>
      </div>
    );
  }

  if (viewingProduct) {
    return (
      <div className="space-y-4 sm:space-y-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setViewingProduct(null)}
            className="text-text-primary hover:text-primary"
          >
            ← Back to Products
          </button>
        </div>

        <div className="bg-bg-card rounded-lg border border-border-light shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
            <div>
              <div className="relative w-full aspect-square bg-bg-alt rounded-lg overflow-hidden">
                {viewingProduct.image ? (
                  <Image
                    src={viewingProduct.image}
                    alt={viewingProduct.name}
                    fill
                    className="object-contain"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-6xl text-text-muted">
                    📦
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-text-primary mb-2">
                  {viewingProduct.name}
                </h1>
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-bold text-primary">
                    ${viewingProduct.price.toFixed(2)}
                  </span>
                  <span className={`inline-flex px-3 py-1 text-sm font-medium rounded-full ${
                    viewingProduct.stock === 0
                      ? 'bg-red-100 text-error'
                      : viewingProduct.stock <= 10
                      ? 'bg-yellow-100 text-warning'
                      : 'bg-green-100 text-success'
                  }`}>
                    {viewingProduct.stock === 0 ? 'Out of Stock' : `${viewingProduct.stock} in stock`}
                  </span>
                </div>
              </div>

              <div className="border-t border-border-light pt-4">
                <h3 className="text-sm font-medium text-text-secondary mb-2">Category</h3>
                <span className="inline-flex px-3 py-1 bg-bg-selected text-primary rounded-lg font-medium">
                  {viewingProduct.categoryId.name}
                </span>
              </div>

              {viewingProduct.description && (
                <div className="border-t border-border-light pt-4">
                  <h3 className="text-sm font-medium text-text-secondary mb-2">Description</h3>
                  <p className="text-text-primary">{viewingProduct.description}</p>
                </div>
              )}

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => {
                    setViewingProduct(null);
                    setEditingProduct(viewingProduct);
                  }}
                  className="flex-1 px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-secondary transition-all duration-200"
                >
                  Edit Product
                </button>
                <button
                  onClick={() => {
                    if (confirm('Are you sure you want to delete this product?')) {
                      handleDeleteProduct(viewingProduct._id);
                      setViewingProduct(null);
                    }
                  }}
                  className="px-6 py-3 bg-red-50 text-error border border-red-200 rounded-lg font-medium hover:bg-red-100 transition-all duration-200"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (showForm || editingProduct) {
    return (
      <div className="space-y-4 sm:space-y-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-text-primary">
            {editingProduct ? 'Edit Product' : 'Add Product'}
          </h1>
          <p className="text-text-secondary mt-1">
            {editingProduct ? 'Update product details' : 'Create a new product'}
          </p>
        </div>

        <div className="bg-bg-card rounded-lg border border-border-light shadow-sm p-6">
          <ProductForm
            product={editingProduct || undefined}
            onSubmit={editingProduct ? handleUpdateProduct : handleCreateProduct}
            onCancel={() => {
              setShowForm(false);
              setEditingProduct(null);
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-text-primary">Products</h1>
          <p className="text-text-secondary mt-1">Manage your product catalog</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-secondary transition-all duration-200 hover:scale-105 active:scale-95 whitespace-nowrap"
        >
          + Add Product
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-error px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-bg-card rounded-lg p-4 border border-border-light shadow-sm">
          <p className="text-sm text-text-secondary">Total Products</p>
          <p className="text-2xl font-bold text-text-primary mt-1">{stats.total}</p>
        </div>
        <div className="bg-bg-card rounded-lg p-4 border border-border-light shadow-sm">
          <p className="text-sm text-text-secondary">In Stock</p>
          <p className="text-2xl font-bold text-success mt-1">{stats.inStock}</p>
        </div>
        <div className="bg-bg-card rounded-lg p-4 border border-border-light shadow-sm">
          <p className="text-sm text-text-secondary">Low Stock</p>
          <p className="text-2xl font-bold text-warning mt-1">{stats.lowStock}</p>
        </div>
        <div className="bg-bg-card rounded-lg p-4 border border-border-light shadow-sm">
          <p className="text-sm text-text-secondary">Out of Stock</p>
          <p className="text-2xl font-bold text-error mt-1">{stats.outOfStock}</p>
        </div>
      </div>

      {products.length === 0 ? (
        <div className="bg-bg-card rounded-lg border border-border-light shadow-sm">
          <EmptyState
            icon="📦"
            title="No products yet"
            description="Start building your product catalog by adding your first product. You can manage inventory, pricing, and product details here."
            actionLabel="Add First Product"
            onAction={() => setShowForm(true)}
          />
        </div>
      ) : (
        <div className="bg-bg-card rounded-lg border border-border-light shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-bg-alt border-b border-border-light">
                <tr>
                  <th className="text-left px-6 py-3 text-sm font-medium text-text-primary">Image</th>
                  <th className="text-left px-6 py-3 text-sm font-medium text-text-primary">Product</th>
                  <th className="text-left px-6 py-3 text-sm font-medium text-text-primary">Category</th>
                  <th className="text-left px-6 py-3 text-sm font-medium text-text-primary">Price</th>
                  <th className="text-left px-6 py-3 text-sm font-medium text-text-primary">Stock</th>
                  <th className="text-right px-6 py-3 text-sm font-medium text-text-primary">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-light">
                {products.map((product) => (
                  <tr 
                    key={product._id} 
                    className="hover:bg-bg-hover transition-colors cursor-pointer"
                    onClick={() => setViewingProduct(product)}
                  >
                    <td className="px-6 py-4">
                      <div className="relative w-16 h-16 bg-bg-alt rounded-lg overflow-hidden">
                        {product.image ? (
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-text-muted">
                            📦
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-text-primary">{product.name}</div>
                      {product.description && (
                        <div className="text-sm text-text-secondary truncate max-w-xs">
                          {product.description}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-text-secondary">{product.categoryId.name}</td>
                    <td className="px-6 py-4 text-text-primary font-medium">
                      ${product.price.toFixed(2)}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        product.stock === 0
                          ? 'bg-red-100 text-error'
                          : product.stock <= 10
                          ? 'bg-yellow-100 text-warning'
                          : 'bg-green-100 text-success'
                      }`}>
                        {product.stock}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingProduct(product);
                        }}
                        className="text-primary hover:text-secondary font-medium"
                      >
                        Edit
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteProduct(product._id);
                        }}
                        className="text-error hover:text-red-700 font-medium"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
