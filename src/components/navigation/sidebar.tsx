'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

const sidebarVariants = cva(
  'fixed left-0 top-0 z-40 h-screen w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transition-transform duration-300 ease-in-out',
  {
    variants: {
      state: {
        open: 'translate-x-0',
        closed: '-translate-x-full',
        desktop: 'lg:translate-x-0',
      },
    },
    defaultVariants: {
      state: 'desktop',
    },
  },
);

interface SidebarProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof sidebarVariants> {
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const Sidebar = React.forwardRef<HTMLDivElement, SidebarProps>(
  ({ className, state, isOpen, onOpenChange, children, ...props }, ref) => {
    const effectiveState =
      state === 'desktop' ? 'desktop' : isOpen ? 'open' : 'closed';

    return (
      <aside
        ref={ref}
        className={cn(sidebarVariants({ state: effectiveState }), className)}
        {...props}
      >
        {children}
      </aside>
    );
  },
);
Sidebar.displayName = 'Sidebar';

const SidebarHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'flex items-center gap-3 p-6 border-b border-gray-200 dark:border-gray-800',
      className,
    )}
    {...props}
  />
));
SidebarHeader.displayName = 'SidebarHeader';

const SidebarContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex-1 p-4 space-y-1 overflow-y-auto', className)}
    {...props}
  />
));
SidebarContent.displayName = 'SidebarContent';

const SidebarFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'p-4 border-t border-gray-200 dark:border-gray-800',
      className,
    )}
    {...props}
  />
));
SidebarFooter.displayName = 'SidebarFooter';

const SidebarLogo = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { icon?: React.ReactNode }
>(({ className, icon, children, ...props }, ref) => (
  <div ref={ref} className="flex items-center gap-3" {...props}>
    {icon && (
      <div className="w-10 h-10 -linear-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
        {icon}
      </div>
    )}
    <div className={cn(className)}>{children}</div>
  </div>
));
SidebarLogo.displayName = 'SidebarLogo';

const SidebarNav = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <nav ref={ref} className={cn('space-y-1', className)} {...props} />
));
SidebarNav.displayName = 'SidebarNav';

const SidebarNavItem = React.forwardRef<
  HTMLAnchorElement,
  React.AnchorHTMLAttributes<HTMLAnchorElement> & { isActive?: boolean }
>(({ className, isActive, children, ...props }, ref) => (
  <a
    ref={ref}
    className={cn(
      'flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200',
      isActive
        ? '-linear-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 text-blue-600 dark:text-blue-400 shadow-sm'
        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200',
      className,
    )}
    {...props}
  >
    {children}
  </a>
));
SidebarNavItem.displayName = 'SidebarNavItem';

const SidebarOverlay = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    isOpen?: boolean;
    onClose?: () => void;
  }
>(({ className, isOpen, onClose, ...props }, ref) => {
  if (!isOpen) return null;

  return (
    <div
      ref={ref}
      className={cn('fixed inset-0 bg-black/50 z-40 lg:hidden', className)}
      onClick={onClose}
      {...props}
    />
  );
});
SidebarOverlay.displayName = 'SidebarOverlay';

export {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarLogo,
  SidebarNav,
  SidebarNavItem,
  SidebarOverlay,
  sidebarVariants,
};
