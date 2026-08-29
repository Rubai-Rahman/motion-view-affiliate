'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const labelVariants = cva(
  'font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
  {
    variants: {
      labelColor: {
        default: 'text-secondary-foreground',
        foreground: 'text-foreground',
      },
    },
    defaultVariants: {
      labelColor: 'default',
    },
  },
);

export type LabelProps = React.ComponentProps<'label'> &
  VariantProps<typeof labelVariants>;

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, labelColor, ...props }, ref) => (
    <label
      ref={ref}
      className={cn(labelVariants({ labelColor }), className)}
      {...props}
    />
  ),
);

Label.displayName = 'Label';

export { Label };
