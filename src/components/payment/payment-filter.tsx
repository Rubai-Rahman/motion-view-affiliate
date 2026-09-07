'use client';

import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Calendar, Filter, X } from 'lucide-react';
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

const typeOptions = [
  { value: 'all', label: 'All Types' },
  { value: '1', label: 'Campus Ambassador' },
  { value: '2', label: 'Influencer' },
  { value: '3', label: 'Affiliate Marketer' },
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
    filters.from_date || filters.to_date || filters.type !== 'all';

  return (
    <Card className="border-primary/20 bg-linear-to-br from-primary/10 via-primary/5 to-transparent backdrop-blur-sm shadow-lg shadow-primary/5 overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Filter className="size-4 text-primary" />
            </div>
            <div>
              <h3 className="text-sm font-semibold">Filter Transactions</h3>
              <p className="text-xs text-muted-foreground">
                {hasActiveFilters
                  ? 'Active filters applied'
                  : 'Filter by date and type'}
              </p>
            </div>
          </div>
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onReset}
              className="h-8 text-xs hover:bg-primary/10 hover:text-primary"
            >
              <X className="size-3 mr-1" />
              Reset
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
              <Calendar className="size-3" />
              From Date
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
              <Input
                type="date"
                value={filters.from_date}
                onChange={handleFromDateChange}
                className="pl-10 border-primary/20 focus:border-primary/50 focus:ring-primary/20"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
              <Calendar className="size-3" />
              To Date
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
              <Input
                type="date"
                value={filters.to_date}
                onChange={handleToDateChange}
                className="pl-10 border-primary/20 focus:border-primary/50 focus:ring-primary/20"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
              <Filter className="size-3" />
              Transaction Type
            </label>
            <Select value={filters.type} onValueChange={handleTypeChange}>
              <SelectTrigger className="w-full border-primary/20 focus:border-primary/50 focus:ring-primary/20">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                {typeOptions.map((option) => (
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
