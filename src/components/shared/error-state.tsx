import * as React from 'react';
import { OctagonXIcon, RefreshCwIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface ErrorStateProps {
  /** Main heading text */
  title?: string;
  /** Supporting description or error message */
  description?: string;
  /** Override the default error icon */
  icon?: React.ReactNode;
  /** Called when the retry button is clicked. If omitted, the button is hidden. */
  onRetry?: () => void;
  /** Label for the retry button */
  retryLabel?: string;
  /** Optional extra action (e.g. a "Go home" link) */
  action?: React.ReactNode;
  className?: string;
}

/**
 * Reusable error state component for data-fetching failures, boundary
 * fallbacks, or any section that needs to surface an error to the user.
 *
 * Usage:
 *   <ErrorState
 *     title="Failed to load data"
 *     description={error.message}
 *     onRetry={refetch}
 *   />
 */
export function ErrorState({
  title = 'Something went wrong',
  description = 'An unexpected error occurred. Please try again.',
  icon,
  onRetry,
  retryLabel = 'Try again',
  action,
  className,
}: ErrorStateProps) {
  return (
    <div
      role="alert"
      aria-live="assertive"
      className={cn(
        'flex flex-col items-center justify-center gap-4 py-16 px-4 text-center',
        className,
      )}
    >
      <span className="flex items-center justify-center rounded-full bg-destructive/10 p-4 [&_svg]:pointer-events-none [&_svg:not([class*=\'size-\'])]:size-8">
        {icon ?? (
          <OctagonXIcon className="text-destructive" aria-hidden="true" />
        )}
      </span>

      <div className="flex flex-col gap-1.5 max-w-sm">
        <p className="text-base font-semibold text-foreground">{title}</p>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2 mt-2">
        {onRetry && (
          <Button variant="outline" size="sm" onClick={onRetry}>
            <RefreshCwIcon className="size-4" aria-hidden="true" />
            {retryLabel}
          </Button>
        )}
        {action}
      </div>
    </div>
  );
}
