'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

const authCardVariants = cva(
  'w-full max-w-md shadow-2xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl',
  {
    variants: {
      size: {
        default: 'max-w-md',
        lg: 'max-w-lg',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  },
);

interface AuthCardProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof authCardVariants> {
  logo?: React.ReactNode;
  title?: string;
  description?: string;
  footer?: React.ReactNode;
}

const AuthCard = React.forwardRef<HTMLDivElement, AuthCardProps>(
  (
    { className, size, logo, title, description, footer, children, ...props },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn(authCardVariants({ size }), className)}
        {...props}
      >
        {logo && <div className="text-center mb-6">{logo}</div>}
        {title && (
          <h2 className="text-3xl font-bold text-center mb-2 -linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {title}
          </h2>
        )}
        {description && (
          <p className="text-center text-base text-gray-600 dark:text-gray-400 mb-6">
            {description}
          </p>
        )}
        {children}
        {footer && (
          <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
            {footer}
          </div>
        )}
      </div>
    );
  },
);
AuthCard.displayName = 'AuthCard';

const AuthLogo = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { icon?: React.ReactNode }
>(({ className, icon, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'mx-auto w-16 h-16 -linear-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg',
      className,
    )}
    {...props}
  >
    {icon}
  </div>
));
AuthLogo.displayName = 'AuthLogo';

const AuthForm = React.forwardRef<
  HTMLFormElement,
  React.FormHTMLAttributes<HTMLFormElement>
>(({ className, ...props }, ref) => (
  <form ref={ref} className={cn('space-y-4', className)} {...props} />
));
AuthForm.displayName = 'AuthForm';

const AuthField = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('space-y-2', className)} {...props} />
));
AuthField.displayName = 'AuthField';

export { AuthCard, AuthLogo, AuthForm, AuthField, authCardVariants };
