'use client';

import EmptyState from '@/components/EmptyState';

export default function CustomersPage() {
  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-xl font-bold text-text-primary">Customers</h1>
          <p className="text-text-secondary mt-1">Manage your customer database</p>
        </div>
        <div className="flex gap-2 sm:gap-3">
          <button 
            onClick={() => alert('Export functionality coming soon!')}
            className="px-4 py-2 bg-bg-card border border-border-light text-text-primary rounded-lg font-medium hover:bg-bg-hover transition-all duration-200 text-sm sm:text-base"
          >
            Export List
          </button>
          <button 
            onClick={() => alert('Add customer functionality coming soon!')}
            className="px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-secondary transition-all duration-200 hover:scale-105 active:scale-95 whitespace-nowrap text-sm sm:text-base"
          >
            + Add Customer
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-bg-card rounded-lg p-4 border border-border-light shadow-sm">
          <p className="text-sm text-text-secondary">Total Customers</p>
          <p className="text-2xl font-bold text-text-primary mt-1">3,542</p>
        </div>
        <div className="bg-bg-card rounded-lg p-4 border border-border-light shadow-sm">
          <p className="text-sm text-text-secondary">Active</p>
          <p className="text-2xl font-bold text-success mt-1">2,891</p>
        </div>
        <div className="bg-bg-card rounded-lg p-4 border border-border-light shadow-sm">
          <p className="text-sm text-text-secondary">New This Month</p>
          <p className="text-2xl font-bold text-info mt-1">147</p>
        </div>
        <div className="bg-bg-card rounded-lg p-4 border border-border-light shadow-sm">
          <p className="text-sm text-text-secondary">VIP Members</p>
          <p className="text-2xl font-bold text-secondary mt-1">89</p>
        </div>
      </div>

      <div className="bg-bg-card rounded-lg border border-border-light shadow-sm">
        <EmptyState
          icon="👥"
          title="No customers yet"
          description="Your customer database is empty. Add customers manually or they will be automatically added when they make their first purchase."
          actionLabel="Add First Customer"
          onAction={() => alert('Add customer functionality coming soon!')}
        />
      </div>
    </div>
  );
}
