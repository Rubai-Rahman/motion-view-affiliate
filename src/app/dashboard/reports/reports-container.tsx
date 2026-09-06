'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Reports from '@/components/reports/reports';
import { EmptyState } from '@/components/shared/empty-state';
import { ErrorState } from '@/components/shared/error-state';
import {
  getBalanceInquiryData,
  getWalletTransactionHistoryData,
} from '@/serverAction/reportAction';
import {
  BalanceInquiryResponse,
  TransactionFilters,
  WalletTransactionHistoryApiResponse,
} from '@/types/reports.types';
import ReportSkeleton from '@/components/skeleton/report-skeleton';

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
    queryFn: getBalanceInquiryData,
  });

  const {
    data: transactionsData,
    isPending: isTransactionsPending,
    isError: isTransactionsError,
    refetch: refetchTransactions,
  } = useQuery({
    queryKey: ['wallet-transaction-history', filters],
    queryFn: () =>
      getWalletTransactionHistoryData({
        from_date: filters.from_date,
        to_date: filters.to_date,
        type: filters.type,
      }),
  });

  const handleFilterChange = (
    field: keyof TransactionFilters,
    value: string,
  ) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  if (isBalanceError || isTransactionsError) return <ErrorState />;

  if (isBalancePending || isTransactionsPending) {
    return <ReportSkeleton />;
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
