'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getBalanceInquiryData } from '@/serverAction/reportAction';
import { useQuery } from '@tanstack/react-query';
import { CheckCircle2, Wallet } from 'lucide-react';
import { ErrorState } from '../shared/error-state';

const formatCurrency = (value: number | string) =>
  new Intl.NumberFormat('en-BD', {
    style: 'currency',
    currency: 'BDT',
    maximumFractionDigits: 2,
  }).format(Number(value ?? 0));

const Balance = () => {
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
            {formatCurrency(balanceData?.data?.balance ?? 0)}
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
        {/* <CardContent>
          <div className="text-3xl font-bold tracking-tight">
            {withdrawalList?.data?.total ?? 0}
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            Total records in your withdrawal history.
          </p>
        </CardContent> */}
      </Card>
    </div>
  );
};

export default Balance;
