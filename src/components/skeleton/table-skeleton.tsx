import { Skeleton } from '@/components/ui/skeleton';

export function TableSkeleton({ rows = 5, columns = 4 }: { rows?: number; columns?: number }) {
  return (
    <div className="rounded-xl border border-border bg-card">
      <div className="p-6 border-b border-border">
        <Skeleton className="h-6 w-1/4" />
      </div>
      <div className="p-6">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex gap-4">
            {[...Array(columns)].map((_, i) => (
              <Skeleton key={`header-${i}`} className="h-4 flex-1" />
            ))}
          </div>
          {/* Rows */}
          {[...Array(rows)].map((_, rowIndex) => (
            <div key={`row-${rowIndex}`} className="flex gap-4">
              {[...Array(columns)].map((_, colIndex) => (
                <Skeleton key={`cell-${rowIndex}-${colIndex}`} className="h-10 flex-1" />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
