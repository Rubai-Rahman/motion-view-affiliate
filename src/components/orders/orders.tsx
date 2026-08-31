import { CalendarRange, PackageSearch, ShoppingBag } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { EmptyState } from '@/components/shared/empty-state';
import { OrderFilters, OrderItem, OrderListApiResponse } from '@/types/orders.types';

interface OrdersProps {
  orders: OrderListApiResponse | null;
  filters: OrderFilters;
  onFilterChange: (field: keyof OrderFilters, value: string) => void;
  onApplyFilters: () => void;
  isLoading?: boolean;
}

const formatCurrency = (value: number | string) => {
  const amount = Number(value ?? 0);
  return new Intl.NumberFormat('en-BD', {
    style: 'currency',
    currency: 'BDT',
    maximumFractionDigits: 2,
  }).format(amount);
};

const formatDate = (value?: string) => {
  if (!value) return 'N/A';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'N/A';
  return new Intl.DateTimeFormat('en-BD', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date);
};

const statusVariant = (
  status?: string,
): 'default' | 'secondary' | 'destructive' | 'outline' => {
  const s = String(status ?? '').toLowerCase();
  if (s === 'completed' || s === 'delivered') return 'default';
  if (s === 'cancelled' || s === 'rejected') return 'destructive';
  return 'secondary';
};

const Orders = ({
  orders,
  filters,
  onFilterChange,
  onApplyFilters,
  isLoading = false,
}: OrdersProps) => {
  const items = orders?.data?.data ?? [];
  const total = orders?.data?.total ?? 0;

  return (
    <div className="space-y-6 pb-10">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Orders</h1>
        <p className="text-sm text-muted-foreground">
          Affiliate orders and commission overview.
        </p>
      </div>

      {/* Summary card */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="border-primary/10 bg-linear-to-br from-primary/8 to-transparent">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm font-medium">
              <ShoppingBag className="size-4 text-primary" />
              Total Orders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold tracking-tight">{total}</div>
            <p className="mt-2 text-sm text-muted-foreground">
              Orders linked to your affiliate code.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm font-medium">
              <PackageSearch className="size-4" />
              Current Page
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold tracking-tight">
              {orders?.data?.current_page ?? 1}
              <span className="ml-1 text-base font-normal text-muted-foreground">
                / {orders?.data?.last_page ?? 1}
              </span>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              Showing {orders?.data?.per_page ?? 10} orders per page.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <CalendarRange className="size-4" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <label className="space-y-2 text-sm">
              <span className="text-muted-foreground">From date</span>
              <input
                type="date"
                value={filters.from_date}
                onChange={(e) => onFilterChange('from_date', e.target.value)}
                className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none transition focus:border-ring"
              />
            </label>

            <label className="space-y-2 text-sm">
              <span className="text-muted-foreground">To date</span>
              <input
                type="date"
                value={filters.to_date}
                onChange={(e) => onFilterChange('to_date', e.target.value)}
                className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none transition focus:border-ring"
              />
            </label>

            <label className="space-y-2 text-sm">
              <span className="text-muted-foreground">Status</span>
              <select
                value={filters.status}
                onChange={(e) => onFilterChange('status', e.target.value)}
                className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none transition focus:border-ring"
              >
                <option value="all">All</option>
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="completed">Completed</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </label>
          </div>

          <div className="mt-4 flex justify-end">
            <button
              type="button"
              onClick={onApplyFilters}
              disabled={isLoading}
              className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading ? 'Loading...' : 'Apply filters'}
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Orders table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Order List</CardTitle>
        </CardHeader>
        <CardContent>
          {!items.length ? (
            <EmptyState
              title="No orders yet"
              description="Orders linked to your affiliate code will appear here."
            />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-180 border-separate border-spacing-y-2 text-left">
                <thead>
                  <tr className="text-sm text-muted-foreground">
                    <th className="pb-2 font-medium">Date</th>
                    <th className="pb-2 font-medium">Order ID</th>
                    <th className="pb-2 font-medium">Customer</th>
                    <th className="pb-2 font-medium text-right">Amount</th>
                    <th className="pb-2 font-medium text-right">Commission</th>
                    <th className="pb-2 font-medium text-right">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {(items as OrderItem[]).map((item, index) => (
                    <tr
                      key={`${item.id ?? item.order_id ?? index}`}
                      className="rounded-xl bg-muted/30"
                    >
                      <td className="rounded-l-xl px-3 py-3 text-sm text-muted-foreground">
                        {formatDate(String(item.created_at ?? ''))}
                      </td>
                      <td className="px-3 py-3 text-sm font-medium">
                        {String(item.order_id ?? item.id ?? '—')}
                      </td>
                      <td className="px-3 py-3 text-sm text-muted-foreground">
                        {String(item.customer_name ?? '—')}
                      </td>
                      <td className="px-3 py-3 text-right font-semibold">
                        {formatCurrency(item.amount ?? 0)}
                      </td>
                      <td className="px-3 py-3 text-right text-sm text-emerald-600 dark:text-emerald-400">
                        {formatCurrency(item.commission ?? 0)}
                      </td>
                      <td className="rounded-r-xl px-3 py-3 text-right">
                        <Badge variant={statusVariant(String(item.status ?? ''))}>
                          {String(item.status ?? 'Pending')}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Orders;
