'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import Reports from '@/components/reports/reports';
import { EmptyState } from '@/components/shared/empty-state';
import { ErrorState } from '@/components/shared/error-state';
import { toast } from '@/components/ui/toast';
import {
  getBalanceInquiryData,
  getWalletTransactionHistoryData,
} from '@/serverAction/reportAction';
import {
  BalanceInquiryResponse,
  TransactionFilters,
  WalletTransactionHistoryApiResponse,
} from '@/types/reports.types';

const defaultFilters: TransactionFilters = {
  from_date: '',
  to_date: '',
  type: 'all',
};

const ReportsContainer = () => {
  const [filters, setFilters] = useState<TransactionFilters>(defaultFilters);

  const {
    data: balanceData,
    isPending: isBalancePending,
    isError: isBalanceError,
  } = useQuery({
    queryKey: ['balance-inquiry'],
    queryFn: async () => {
      const result = await getBalanceInquiryData();
      if (!result.success) {
        toast.add({
          title: 'Balance Load Failed',
          description: result.error || 'Unable to load your wallet balance.',
          type: 'error',
        });
      }
      return result;
    },
  });

  const {
    data: transactionsData,
    isPending: isTransactionsPending,
    isError: isTransactionsError,
    refetch: refetchTransactions,
  } = useQuery({
    queryKey: ['wallet-transaction-history', filters],
    queryFn: async () => {
      const result = await getWalletTransactionHistoryData({
        from_date: filters.from_date,
        to_date: filters.to_date,
        type: filters.type,
      });
      if (!result.success) {
        toast.add({
          title: 'Transaction History Failed',
          description:
            result.error || 'Unable to load transaction history at this time.',
          type: 'error',
        });
      }
      return result;
    },
  });

  const handleFilterChange = (
    field: keyof TransactionFilters,
    value: string,
  ) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  if (isBalanceError || isTransactionsError) return <ErrorState />;

  if (isBalancePending || isTransactionsPending) {
    return (
      <div className="space-y-4 py-8">
        <div className="h-10 w-48 animate-pulse rounded-lg bg-muted" />
        <div className="grid gap-4 md:grid-cols-3">
          <div className="h-36 animate-pulse rounded-xl bg-muted" />
          <div className="h-36 animate-pulse rounded-xl bg-muted" />
          <div className="h-36 animate-pulse rounded-xl bg-muted" />
        </div>
      </div>
    );
  }

  if (!balanceData?.data && !transactionsData?.data) return <EmptyState />;

  return (
    <Reports
      balance={(balanceData?.data as BalanceInquiryResponse) ?? null}
      transactions={
        (transactionsData?.data as WalletTransactionHistoryApiResponse) ?? null
      }
      filters={filters}
      onFilterChange={handleFilterChange}
      onApplyFilters={refetchTransactions}
      isLoading={isTransactionsPending}
    />
  );
};

export default ReportsContainer;
