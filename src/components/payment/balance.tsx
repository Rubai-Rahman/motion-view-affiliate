'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getBalanceInquiryData } from '@/serverAction/reportAction';
import { useQuery } from '@tanstack/react-query';
import { CheckCircle2, Wallet } from 'lucide-react';
import { ErrorState } from '../shared/error-state';
import WithdrawForm from './withdraw-form';
import { WithdrawPayload } from '@/types/payment.types';

const formatCurrency = (value: number | string) =>
  new Intl.NumberFormat('en-BD', {
    style: 'currency',
    currency: 'BDT',
    maximumFractionDigits: 2,
  }).format(Number(value ?? 0));

const Balance = ({
  handleWithdraw,
  isWithdrawing,
  withdrawalSummary,
}: {
  handleWithdraw: (data: WithdrawPayload) => void;
  isWithdrawing: boolean;
  withdrawalSummary?: {
    totalTransactions: number;
    totalAmountIn: number;
    totalAmountOut: number;
  };
}) => {
  const {
    data: balanceData,
    isPending: isBalancePending,
    isError: isBalanceError,
  } = useQuery({
    queryKey: ['balance-inquiry-payment'],
    queryFn: async () => {
      const result = await getBalanceInquiryData();
      return result;
    },
  });
  console.log('balanceData', balanceData);
  if (isBalanceError) return <ErrorState />;
  if (isBalancePending) return <div>Loading...</div>;

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card className="border-primary/20 bg-linear-to-br from-primary/10 via-primary/5 to-transparent backdrop-blur-sm shadow-lg shadow-primary/5">
        <CardHeader className="pb-4 flex justify-between items-start">
          <div className="space-y-1">
            <CardTitle className="flex items-center gap-2 text-base font-semibold">
              <div className="p-1.5 rounded-lg bg-primary/10">
                <Wallet className="size-4 text-primary" />
              </div>
              Available Balance
            </CardTitle>
            <p className="text-xs text-muted-foreground">
              Ready for withdrawal
            </p>
          </div>
          <WithdrawForm onSubmit={handleWithdraw} isPending={isWithdrawing} />
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative">
            <div className="text-4xl font-bold tracking-tight bg-linear-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              {formatCurrency(balanceData?.data?.balance ?? 0)}
            </div>
            <div className="absolute -top-2 -right-2 w-3 h-3 bg-emerald-500 rounded-full animate-pulse" />
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="h-px flex-1 bg-linear-to-r from-primary/20 to-transparent" />
            <span>BDT</span>
            <div className="h-px flex-1 bg-linear-to-l from-primary/20 to-transparent" />
          </div>
          <p className="text-xs text-muted-foreground">
            Request a withdrawal when your balance is sufficient.
          </p>
        </CardContent>
      </Card>

      <Card className="border-emerald-500/20 bg-linear-to-br from-emerald-500/10 via-emerald-500/5 to-transparent backdrop-blur-sm shadow-lg shadow-emerald-500/5">
        <CardHeader className="pb-4">
          <div className="space-y-1">
            <CardTitle className="flex items-center gap-2 text-base font-semibold">
              <div className="p-1.5 rounded-lg bg-emerald-500/10">
                <CheckCircle2 className="size-4 text-emerald-500" />
              </div>
              Total Withdrawals
            </CardTitle>
            <p className="text-xs text-muted-foreground">
              Your withdrawal history
            </p>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 text-xs font-semibold text-emerald-600">
              {withdrawalSummary?.totalTransactions ?? 0} transactions
            </span>
          </div>

          <div className="text-4xl font-bold tracking-tight bg-linear-to-r from-emerald-600 to-emerald-400 bg-clip-text text-transparent">
            {formatCurrency(withdrawalSummary?.totalAmountOut ?? 0)}
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-emerald-500/10">
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground font-medium">
                Total In
              </p>
              <p className="text-sm font-semibold text-emerald-600">
                {formatCurrency(withdrawalSummary?.totalAmountIn ?? 0)}
              </p>
            </div>

            <div className="space-y-1">
              <p className="text-xs text-muted-foreground font-medium">
                Total Out
              </p>
              <p className="text-sm font-semibold text-emerald-600">
                {formatCurrency(withdrawalSummary?.totalAmountOut ?? 0)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Balance;
