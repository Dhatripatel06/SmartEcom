export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      {/* Table Header */}
      <div className="bg-gray-50 border-b border-gray-200 p-4">
        <div className="flex gap-4">
          <div className="h-4 bg-gray-200 rounded w-1/4 animate-pulse-subtle"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4 animate-pulse-subtle"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4 animate-pulse-subtle"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4 animate-pulse-subtle"></div>
        </div>
      </div>

      {/* Table Rows */}
      {Array.from({ length: rows }).map((_, index) => (
        <div key={index} className="border-b border-gray-100 p-4">
          <div className="flex gap-4 items-center">
            <div className="h-12 w-12 bg-gray-200 rounded animate-pulse-subtle"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse-subtle"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2 animate-pulse-subtle"></div>
            </div>
            <div className="h-8 w-20 bg-gray-200 rounded animate-pulse-subtle"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="space-y-2 flex-1">
          <div className="h-4 bg-gray-200 rounded w-1/3 animate-pulse-subtle"></div>
          <div className="h-8 bg-gray-200 rounded w-1/2 animate-pulse-subtle"></div>
        </div>
        <div className="h-12 w-12 bg-gray-200 rounded-lg animate-pulse-subtle"></div>
      </div>
      <div className="h-3 bg-gray-200 rounded w-2/3 animate-pulse-subtle"></div>
    </div>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="h-48 bg-gray-200 animate-pulse-subtle"></div>
      <div className="p-4 space-y-3">
        <div className="h-5 bg-gray-200 rounded w-3/4 animate-pulse-subtle"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse-subtle"></div>
        <div className="h-4 bg-gray-200 rounded w-full animate-pulse-subtle"></div>
        <div className="flex gap-2 mt-4">
          <div className="h-9 bg-gray-200 rounded flex-1 animate-pulse-subtle"></div>
          <div className="h-9 bg-gray-200 rounded flex-1 animate-pulse-subtle"></div>
        </div>
      </div>
    </div>
  );
}

export function ChartSkeleton({ height = 300 }: { height?: number }) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="space-y-4">
        <div className="h-6 bg-gray-200 rounded w-1/4 animate-pulse-subtle"></div>
        <div style={{ height }} className="bg-gray-100 rounded animate-pulse-subtle"></div>
      </div>
    </div>
  );
}

export function StatsGridSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <CardSkeleton key={index} />
      ))}
    </div>
  );
}
