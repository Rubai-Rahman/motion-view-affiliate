import {
  ArrowDownRight,
  ArrowUpRight,
  CalendarRange,
  Wallet,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { EmptyState } from '@/components/shared/empty-state';
import {
  BalanceInqueryResponse,
  TransactionFilters,
  WalletTransactionHistoryApiResponse,
  WalletTransactionItem,
} from '@/types/reports.types';

interface ReportsProps {
  balance: BalanceInqueryResponse | null;
  transactions: WalletTransactionHistoryApiResponse | null;
  filters: TransactionFilters;
  onFilterChange: (field: keyof TransactionFilters, value: string) => void;
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

const getTransactionTone = (type?: string) => {
  const normalized = String(type ?? '').toLowerCase();

  if (normalized.includes('credit') || normalized.includes('deposit')) {
    return 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20';
  }

  if (normalized.includes('withdraw') || normalized.includes('debit')) {
    return 'bg-rose-500/10 text-rose-600 border-rose-500/20';
  }

  return 'bg-primary/10 text-primary border-primary/20';
};

const Reports = ({
  balance,
  transactions,
  filters,
  onFilterChange,
  onApplyFilters,
  isLoading = false,
}: ReportsProps) => {
  const items = transactions?.data?.data ?? [];
  const balanceAmount = balance?.balance ?? '0.00';

  return (
    <div className="space-y-6 pb-10">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Reports</h1>
          <p className="text-sm text-muted-foreground">
            Wallet balance and transaction activity overview.
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <Card className="border-primary/10 bg-linear-to-br from-primary/8 to-transparent">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm font-medium">
              <Wallet className="size-4 text-primary" />
              Available Balance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold tracking-tight">
              {formatCurrency(balanceAmount)}
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              Updated from your latest wallet inquiry.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold tracking-tight">
              {transactions?.data?.total ?? 0}
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              Total wallet transactions found.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Card Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-lg font-semibold">
              <span className="inline-flex size-2.5 rounded-full bg-emerald-500" />
              Active
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              Reports are synced with your affiliate wallet.
            </p>
          </CardContent>
        </Card>
      </div>

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
                onChange={(event) =>
                  onFilterChange('from_date', event.target.value)
                }
                className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none ring-0 transition focus:border-ring"
              />
            </label>

            <label className="space-y-2 text-sm">
              <span className="text-muted-foreground">To date</span>
              <input
                type="date"
                value={filters.to_date}
                onChange={(event) =>
                  onFilterChange('to_date', event.target.value)
                }
                className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none ring-0 transition focus:border-ring"
              />
            </label>

            <label className="space-y-2 text-sm">
              <span className="text-muted-foreground">Type</span>
              <select
                value={filters.type}
                onChange={(event) => onFilterChange('type', event.target.value)}
                className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none transition focus:border-ring"
              >
                <option value="all">All</option>
                <option value="credit">Credit</option>
                <option value="debit">Debit</option>
                <option value="withdraw">Withdrawal</option>
                <option value="bonus">Bonus</option>
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

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Transaction History</CardTitle>
        </CardHeader>
        <CardContent>
          {!items.length ? (
            <EmptyState
              title="No transactions yet"
              description="No wallet activity matches the selected criteria."
            />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-180 border-separate border-spacing-y-2 text-left">
                <thead>
                  <tr className="text-sm text-muted-foreground">
                    <th className="pb-2 font-medium">Date</th>
                    <th className="pb-2 font-medium">Type</th>
                    <th className="pb-2 font-medium">Reference</th>
                    <th className="pb-2 font-medium text-right">Amount</th>
                    <th className="pb-2 font-medium text-right">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {(items as WalletTransactionItem[]).map((item, index) => {
                    const amount = Number(item.amount ?? 0);
                    const isPositive = amount >= 0;

                    return (
                      <tr
                        key={`${item.id ?? item.transaction_id ?? index}`}
                        className="rounded-xl bg-muted/30"
                      >
                        <td className="rounded-l-xl px-3 py-3 text-sm text-muted-foreground">
                          {formatDate(
                            item.created_at ??
                              (item.date as string | undefined) ??
                              (item.updated_at as string | undefined),
                          )}
                        </td>
                        <td className="px-3 py-3">
                          <Badge
                            variant="outline"
                            className={getTransactionTone(
                              String(item.type ?? 'transaction'),
                            )}
                          >
                            <span className="flex items-center gap-1.5">
                              {isPositive ? (
                                <ArrowDownRight className="size-3.5" />
                              ) : (
                                <ArrowUpRight className="size-3.5" />
                              )}
                              {String(item.type ?? 'Transaction')}
                            </span>
                          </Badge>
                        </td>
                        <td className="px-3 py-3 text-sm text-muted-foreground">
                          {String(item.note ?? item.transaction_id ?? '—')}
                        </td>
                        <td className="px-3 py-3 text-right font-semibold">
                          <span
                            className={
                              isPositive ? 'text-emerald-600' : 'text-rose-600'
                            }
                          >
                            {isPositive ? '+' : '-'}
                            {formatCurrency(Math.abs(amount))}
                          </span>
                        </td>
                        <td className="rounded-r-xl px-3 py-3 text-right">
                          <Badge
                            variant={
                              String(item.status ?? 'success').toLowerCase() ===
                              'pending'
                                ? 'secondary'
                                : 'outline'
                            }
                          >
                            {String(item.status ?? 'Completed')}
                          </Badge>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Reports;
