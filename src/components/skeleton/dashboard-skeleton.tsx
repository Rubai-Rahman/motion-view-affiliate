import { Skeleton } from '@/components/ui/skeleton';

export function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="rounded-xl border border-border bg-card p-6">
            <div className="space-y-2">
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-8 w-3/4" />
            </div>
            <div className="mt-4">
              <Skeleton className="h-4 w-1/3" />
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-6">
          <Skeleton className="h-6 w-1/3 mb-4" />
          <Skeleton className="h-64 w-full" />
        </div>
        <div className="rounded-xl border border-border bg-card p-6">
          <Skeleton className="h-6 w-1/3 mb-4" />
          <Skeleton className="h-64 w-full" />
        </div>
      </div>

      {/* Recent Activity */}
      <div className="rounded-xl border border-border bg-card p-6">
        <Skeleton className="h-6 w-1/4 mb-4" />
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center gap-4">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
              </div>
              <Skeleton className="h-4 w-20" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
