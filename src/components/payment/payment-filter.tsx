'use client';

import type React from 'react';

import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Calendar, Filter, FunnelX } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface PaymentFilterProps {
  filters: {
    from_date: string;
    to_date: string;
    type: string;
  };
  onFiltersChange: (filters: {
    from_date: string;
    to_date: string;
    type: string;
  }) => void;
  onReset: () => void;
}

const statusOptions = [
  { value: '0', label: 'Pending' },
  { value: '1', label: 'Processing' },
  { value: '2', label: 'Paid' },
  { value: '3', label: 'Rejected' },
  { value: '4', label: 'Cancelled' },
];

const PaymentFilter = ({
  filters,
  onFiltersChange,
  onReset,
}: PaymentFilterProps) => {
  const handleFromDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFiltersChange({ ...filters, from_date: e.target.value });
  };

  const handleToDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFiltersChange({ ...filters, to_date: e.target.value });
  };

  const handleTypeChange = (value: string | null) => {
    onFiltersChange({ ...filters, type: value || 'all' });
  };

  const hasActiveFilters =
    filters.from_date !== '' ||
    filters.to_date !== '' ||
    filters.type !== 'all';

  const selectedType = statusOptions.find(
    (option) => option.value === filters.type,
  );

  return (
    <Card className="overflow-hidden border-primary/20 bg-linear-to-br from-primary/10 via-primary/5 to-transparent shadow-lg shadow-primary/5 backdrop-blur-sm">
      <CardContent className="px-3">
        {/* Header */}
        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-primary/10 p-2">
              <Filter className="size-4 text-primary" />
            </div>

            <div>
              <h3 className="text-sm font-semibold text-foreground">
                Filter Transactions
              </h3>

              <p className="text-xs text-muted-foreground">
                {hasActiveFilters
                  ? 'Active filters applied'
                  : 'Filter by date and type'}
              </p>
            </div>
          </div>

          {hasActiveFilters && (
            <Button
              variant="destructive"
              size="sm"
              onClick={onReset}
              className="h-8 text-xs hover:bg-primary/10 hover:text-primary"
            >
              <FunnelX className="mr-1 size-3" />
              Reset
            </Button>
          )}
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {/* From Date */}
          <div className="space-y-2">
            <label className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
              <Calendar className="size-3" />
              From Date
            </label>

            <div className="relative">
              <Calendar className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                type="date"
                value={filters.from_date}
                onChange={handleFromDateChange}
                className="h-10 border-primary/20 pl-10 transition-colors focus:border-primary/50 focus:ring-primary/20"
              />
            </div>
          </div>

          {/* To Date */}
          <div className="space-y-2">
            <label className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
              <Calendar className="size-3" />
              To Date
            </label>

            <div className="relative">
              <Calendar className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                type="date"
                value={filters.to_date}
                onChange={handleToDateChange}
                className="h-10 border-primary/20 pl-10 transition-colors focus:border-primary/50 focus:ring-primary/20"
              />
            </div>
          </div>

          {/* Transaction Type */}
          <div className="space-y-2">
            <label className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
              <Filter className="size-3" />
              Transaction Type
            </label>

            <Select value={filters.type} onValueChange={handleTypeChange}>
              <SelectTrigger className="h-10 w-full border-primary/20 transition-colors focus:border-primary/50 focus:ring-primary/20">
                <SelectValue placeholder="All Types">
                  {selectedType?.label ?? 'All Types'}
                </SelectValue>
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>

                {statusOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PaymentFilter;
