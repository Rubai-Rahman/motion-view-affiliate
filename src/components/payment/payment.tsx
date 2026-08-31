import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowDownCircle, CheckCircle2, Clock3, Wallet } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { EmptyState } from '@/components/shared/empty-state';
import {
  WithdrawRequestItem,
  WithdrawRequestListApiResponse,
  WithdrawRequestPayload,
} from '@/types/reports.types';

/* -------------------------------------------------------------------------- */
/* Form schema                                                                */
/* -------------------------------------------------------------------------- */

const withdrawSchema = z.object({
  amount: z
    .string()
    .min(1, 'Amount is required')
    .refine((v) => Number(v) > 0, { message: 'Amount must be greater than 0' }),
  note: z.string().optional(),
});

type WithdrawFormValues = z.infer<typeof withdrawSchema>;

/* -------------------------------------------------------------------------- */
/* Helpers                                                                    */
/* -------------------------------------------------------------------------- */

const formatCurrency = (value: number | string) =>
  new Intl.NumberFormat('en-BD', {
    style: 'currency',
    currency: 'BDT',
    maximumFractionDigits: 2,
  }).format(Number(value ?? 0));

const formatDate = (value?: string) => {
  if (!value) return 'N/A';
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? 'N/A'
    : new Intl.DateTimeFormat('en-BD', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }).format(date);
};

const statusVariant = (
  status: string,
): 'default' | 'secondary' | 'destructive' => {
  const s = status.toLowerCase();
  if (s === 'approved') return 'default';
  if (s === 'rejected') return 'destructive';
  return 'secondary';
};

/* -------------------------------------------------------------------------- */
/* Props                                                                      */
/* -------------------------------------------------------------------------- */

interface PaymentProps {
  withdrawalList: WithdrawRequestListApiResponse | null;
  availableBalance: string;
  onWithdraw: (payload: WithdrawRequestPayload) => void;
  isWithdrawing: boolean;
}

/* -------------------------------------------------------------------------- */
/* Component                                                                  */
/* -------------------------------------------------------------------------- */

const Payment = ({
  withdrawalList,
  availableBalance,
  onWithdraw,
  isWithdrawing,
}: PaymentProps) => {
  const items = withdrawalList?.data?.data ?? [];

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<WithdrawFormValues>({
    resolver: zodResolver(withdrawSchema),
    defaultValues: { amount: '', note: '' },
  });

  const onSubmit = (values: WithdrawFormValues) => {
    const requested = Number(values.amount);
    const available = Number(availableBalance || 0);

    if (requested > available) {
      // Validation that depends on server data — handled here before calling mutate
      return;
    }

    onWithdraw({ amount: values.amount, note: values.note });
    reset();
  };

  const isPending = isSubmitting || isWithdrawing;

  return (
    <div className="space-y-6 pb-10">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Payment Report</h1>
        <p className="text-sm text-muted-foreground">
          Manage your balance and withdrawal requests.
        </p>
      </div>

      {/* Summary cards */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="border-primary/10 bg-linear-to-br from-primary/8 to-transparent">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm font-medium">
              <Wallet className="size-4 text-primary" />
              Available Balance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold tracking-tight">
              {formatCurrency(availableBalance)}
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              You can request a withdrawal when the balance is sufficient.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm font-medium">
              <CheckCircle2 className="size-4 text-emerald-500" />
              Total Withdrawals
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold tracking-tight">
              {withdrawalList?.data?.total ?? 0}
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              Total records in your withdrawal history.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Withdrawal form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <ArrowDownCircle className="size-4" />
            Request Withdrawal
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="amount" className="text-sm text-muted-foreground">
                  Amount
                </label>
                <input
                  {...register('amount')}
                  id="amount"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="Enter amount"
                  className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none transition focus:border-ring"
                />
                {errors.amount && (
                  <p className="text-xs text-destructive">
                    {errors.amount.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="note" className="text-sm text-muted-foreground">
                  Note
                </label>
                <input
                  {...register('note')}
                  id="note"
                  type="text"
                  placeholder="Optional note"
                  className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none transition focus:border-ring"
                />
              </div>
            </div>

            <div className="mt-4 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <p className="text-sm text-muted-foreground">
                Available: {formatCurrency(availableBalance)}
              </p>
              <Button
                type="submit"
                disabled={isPending}
                isLoading={isPending}
                className="min-w-45"
              >
                {isPending ? 'Submitting...' : 'Request withdrawal'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Withdrawal history */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Clock3 className="size-4" />
            Recent Withdrawal Requests
          </CardTitle>
        </CardHeader>
        <CardContent>
          {!items.length ? (
            <EmptyState
              title="No withdrawal requests"
              description="Once you request a payout, it will appear here."
            />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-175 border-separate border-spacing-y-2 text-left">
                <thead>
                  <tr className="text-sm text-muted-foreground">
                    <th className="pb-2 font-medium">Date</th>
                    <th className="pb-2 font-medium">Amount</th>
                    <th className="pb-2 font-medium">Note</th>
                    <th className="pb-2 font-medium text-right">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {(items as WithdrawRequestItem[]).map((item, index) => (
                    <tr
                      key={String(item.id ?? index)}
                      className="rounded-xl bg-muted/30"
                    >
                      <td className="rounded-l-xl px-3 py-3 text-sm text-muted-foreground">
                        {formatDate(
                          String(item.created_at ?? item.updated_at ?? ''),
                        )}
                      </td>
                      <td className="px-3 py-3 font-semibold">
                        {formatCurrency(item.amount ?? 0)}
                      </td>
                      <td className="px-3 py-3 text-sm text-muted-foreground">
                        {String(item.note ?? '—')}
                      </td>
                      <td className="rounded-r-xl px-3 py-3 text-right">
                        <Badge
                          variant={statusVariant(String(item.status ?? 'pending'))}
                        >
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

export default Payment;
