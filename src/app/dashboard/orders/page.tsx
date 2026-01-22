import EmptyState from '@/components/EmptyState';

export default function OrdersPage() {
  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-text-primary">Orders</h1>
          <p className="text-text-secondary mt-1">Track and manage customer orders</p>
        </div>
        <div className="flex gap-2 sm:gap-3">
          <button className="px-4 py-2 bg-bg-card border border-border-light text-text-primary rounded-lg font-medium hover:bg-bg-hover transition-all duration-200 text-sm sm:text-base">
            Export
          </button>
          <button className="px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-secondary transition-all duration-200 hover:scale-105 active:scale-95 whitespace-nowrap text-sm sm:text-base">
            + Create Order
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-bg-card rounded-lg p-4 border border-border-light shadow-sm">
          <p className="text-sm text-text-secondary">Total Orders</p>
          <p className="text-2xl font-bold text-text-primary mt-1">856</p>
        </div>
        <div className="bg-bg-card rounded-lg p-4 border border-border-light shadow-sm">
          <p className="text-sm text-text-secondary">Pending</p>
          <p className="text-2xl font-bold text-warning mt-1">24</p>
        </div>
        <div className="bg-bg-card rounded-lg p-4 border border-border-light shadow-sm">
          <p className="text-sm text-text-secondary">Completed</p>
          <p className="text-2xl font-bold text-success mt-1">798</p>
        </div>
        <div className="bg-bg-card rounded-lg p-4 border border-border-light shadow-sm">
          <p className="text-sm text-text-secondary">Cancelled</p>
          <p className="text-2xl font-bold text-error mt-1">34</p>
        </div>
      </div>

      <div className="bg-bg-card rounded-lg border border-border-light shadow-sm">
        <EmptyState
          icon="🛒"
          title="No orders found"
          description="When customers place orders, they will appear here. You can track order status, manage shipments, and process refunds."
          actionLabel="Create Test Order"
          onAction={() => console.log('Create order')}
        />
      </div>
    </div>
  );
}
