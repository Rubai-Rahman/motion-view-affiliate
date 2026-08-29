import * as React from 'react';
import { cn } from '@/lib/utils';

interface EmptyStateProps {
  /** Main heading text */
  title?: string;
  /** Supporting description below the title */
  description?: string;
  /** Icon or illustration to display above the title */
  icon?: React.ReactNode;
  /** Optional action button or link */
  action?: React.ReactNode;
  className?: string;
}

/**
 * Reusable empty state component for lists, tables, or any section
 * that has no data to show.
 *
 * Usage:
 *   <EmptyState
 *     icon={<InboxIcon className="size-10 text-muted-foreground" />}
 *     title="No results found"
 *     description="Try adjusting your filters or search query."
 *     action={<Button onClick={onReset}>Clear filters</Button>}
 *   />
 */
export function EmptyState({
  title = 'Nothing here yet',
  description,
  icon,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      role="status"
      aria-label={title}
      className={cn(
        'flex flex-col items-center justify-center gap-4 py-16 px-4 text-center',
        className,
      )}
    >
      {icon && (
        <span className="flex items-center justify-center rounded-full bg-muted p-4 [&_svg]:pointer-events-none [&_svg:not([class*=\'size-\'])]:size-8">
          {icon}
        </span>
      )}

      <div className="flex flex-col gap-1.5 max-w-sm">
        <p className="text-base font-semibold text-foreground">{title}</p>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>

      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}
