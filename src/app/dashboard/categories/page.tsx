'use client';

import { useState, useEffect } from 'react';
import { EmptyCategories } from '@/components/EmptyState';
import { useToast } from '@/hooks/useToast';
import { TableSkeleton } from '@/components/Skeletons';

interface Category {
  _id: string;
  name: string;
  description?: string;
  createdAt: Date;
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', description: '' });
  const [error, setError] = useState('');
  const [submitLoading, setSubmitLoading] = useState(false);
  const { success, error: showError, ToastContainer } = useToast();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/categories', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setCategories(data.categories || []);
      } else {
        setError('Failed to fetch categories');
      }
    } catch (error) {
      setError('Failed to fetch categories');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.name.trim()) {
      setError('Category name is required');
      return;
    }

    setSubmitLoading(true);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          description: formData.description.trim(),
        }),
      });

      if (response.ok) {
        success('Category created successfully!');
        setFormData({ name: '', description: '' });
        setShowForm(false);
        await fetchCategories();
      } else {
        const data = await response.json();
        if (data.errors) {
          const errorMessages = data.errors.map((e: any) => e.message).join(', ');
          showError(errorMessages);
          setError(errorMessages);
        } else {
          showError(data.error || 'Failed to create category');
          setError(data.error || 'Failed to create category');
        }
      }
    } catch (error) {
      const msg = 'Failed to create category';
      showError(msg);
      setError(msg);
    } finally {
      setSubmitLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-xl sm:text-xl font-bold">Categories</h1>
        </div>
        <TableSkeleton rows={4} />
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-xl font-bold text-text-primary">Categories</h1>
          <p className="text-text-secondary mt-1">Manage product categories</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-secondary transition-all duration-200 hover:scale-105 active:scale-95 whitespace-nowrap"
        >
          {showForm ? 'Cancel' : '+ Add Category'}
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-error px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {showForm && (
        <div className="bg-bg-card rounded-lg border border-border-light shadow-sm p-6">
          <h2 className="text-xl font-semibold text-text-primary mb-4">Create New Category</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">
                Category Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border border-border-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Enter category name"
                disabled={submitLoading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-2 border border-border-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Enter category description"
                rows={3}
                disabled={submitLoading}
              />
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={submitLoading}
                className="flex-1 px-6 py-2 bg-primary text-white rounded-lg font-medium hover:bg-secondary transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitLoading ? 'Creating...' : 'Create Category'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setFormData({ name: '', description: '' });
                  setError('');
                }}
                className="px-6 py-2 bg-bg-card border border-border-light text-text-primary rounded-lg font-medium hover:bg-bg-hover transition-all duration-200"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid gap-4">
        <div className="bg-bg-card rounded-lg p-4 border border-border-light shadow-sm">
          <p className="text-sm text-text-secondary">Total Categories</p>
          <p className="text-2xl font-bold text-text-primary mt-1">{categories.length}</p>
        </div>
      </div>

      {categories.length === 0 ? (
        <EmptyCategories />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((category) => (
            <div
              key={category._id}
              className="bg-bg-card rounded-lg border border-border-light shadow-sm p-6 hover:shadow-md transition-shadow"
            >
              <h3 className="text-lg font-semibold text-text-primary mb-2">{category.name}</h3>
              {category.description && (
                <p className="text-text-secondary text-sm">{category.description}</p>
              )}
              <div className="mt-4 pt-4 border-t border-border-light">
                <p className="text-xs text-text-muted">
                  Created: {new Date(category.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
      
      <ToastContainer />
    </div>
  );
}
