import Link from 'next/link';

interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
  onAction?: () => void;
}

export default function EmptyState({
  icon,
  title,
  description,
  actionLabel,
  actionHref,
  onAction,
}: EmptyStateProps) {
  const ActionButton = actionHref ? (
    <Link
      href={actionHref}
      className="inline-flex items-center px-6 py-3 bg-[#4F8CFF] text-white rounded-lg hover:bg-[#3D7AE8] transition-all duration-200 hover:scale-105 active:scale-95 font-medium shadow-sm"
    >
      {actionLabel}
    </Link>
  ) : onAction ? (
    <button
      onClick={onAction}
      className="inline-flex items-center px-6 py-3 bg-[#4F8CFF] text-white rounded-lg hover:bg-[#3D7AE8] transition-all duration-200 hover:scale-105 active:scale-95 font-medium shadow-sm"
    >
      {actionLabel}
    </button>
  ) : null;

  return (
    <div className="bg-white rounded-lg shadow p-12 text-center">
      <div className="flex flex-col items-center max-w-md mx-auto">
        <div className="text-gray-400 mb-4">
          {icon}
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-500 mb-6">{description}</p>
        {ActionButton}
      </div>
    </div>
  );
}

export function EmptyProducts() {
  return (
    <EmptyState
      title="No Products Yet"
      description="Get started by creating your first product. Add product details, images, and pricing information."
      actionLabel="Add Product"
      actionHref="/dashboard/products"
      icon={
        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      }
    />
  );
}

export function EmptyCategories() {
  return (
    <EmptyState
      title="No Categories Yet"
      description="Create categories to organize your products. Categories help customers find what they're looking for."
      actionLabel="Add Category"
      actionHref="/dashboard/categories"
      icon={
        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
        </svg>
      }
    />
  );
}

export function EmptyOrders() {
  return (
    <EmptyState
      title="No Orders Yet"
      description="Orders from customers will appear here. You'll be able to track status and manage fulfillment."
      icon={
        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      }
    />
  );
}

export function EmptySearch({ searchQuery }: { searchQuery: string }) {
  return (
    <EmptyState
      title="No Results Found"
      description={`We couldn't find anything matching "${searchQuery}". Try adjusting your search terms.`}
      icon={
        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      }
    />
  );
}
