'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { EmptyState } from '@/components/shared/empty-state';
import { ErrorState } from '@/components/shared/error-state';
import { getWalletTransactionHistoryData } from '@/serverAction/reportAction';

import ReportSkeleton from '@/components/skeleton/report-skeleton';
import { InboxIcon } from 'lucide-react';
import ListFilter from '@/components/common/list-filter';
import TransactionList from '@/components/reports/transaction-list';
import { transactionTypeOptions } from '@/constants/filter.constant';

const ReportsContainer = () => {
  const [filters, setFilters] = useState<{
    from_date: string;
    to_date: string;
    type: number | null;
  }>({
    from_date: '',
    to_date: '',
    type: null,
  });
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });

  const {
    data: transactionsListData,
    isPending: isTransactionsPending,
    isError: isTransactionsError,
  } = useQuery({
    queryKey: ['wallet-transaction-history', filters, pagination],
    queryFn: () =>
      getWalletTransactionHistoryData({
        from_date: filters.from_date,
        to_date: filters.to_date,
        type: filters.type,
        per_page: pagination.pageSize,
        page: pagination.pageIndex + 1,
      }),
  });
  console.log('transactioListData', transactionsListData);
  const handleFiltersChange = (newFilters: {
    from_date: string;
    to_date: string;
    status?: number | null;
    type?: number | null;
  }) => {
    setFilters({
      from_date: newFilters.from_date,
      to_date: newFilters.to_date,
      type: newFilters.type ?? null,
    });
    setPagination((p) => ({ ...p, pageIndex: 0 }));
  };

  const handleResetFilters = () => {
    setFilters({
      from_date: '',
      to_date: '',
      type: null,
    });
    setPagination({ pageIndex: 0, pageSize: 10 });
  };
  // const transactionSummary = transactionsListData?.data?.data?.reduce(
  //   (summary, item) => {
  //     summary.totalTransactions += 1;
  //     summary.totalAmountIn += Number(item.amount_in || 0);
  //     summary.totalAmountOut += Number(item.amount_out || 0);

  //     return summary;
  //   },
  //   {
  //     totalTransactions: 0,
  //     totalAmountIn: 0,
  //     totalAmountOut: 0,
  //   },
  // ) ?? {
  //   totalTransactions: 0,
  //   totalAmountIn: 0,
  //   totalAmountOut: 0,
  // };
  return (
    <div className="space-y-8">
      <div className="relative">
        <div className="absolute inset-0 bg-linear-to-r from-primary/10 via-transparent to-primary/10 opacity-50 blur-3xl" />
        <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold bg-linear-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
              Reports
            </h1>
            <p className="text-sm text-muted-foreground">
              Track your withdrawal history and manage your balance
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <ListFilter
          title="Transaction"
          filters={filters}
          onFiltersChange={handleFiltersChange}
          onReset={handleResetFilters}
          filterType="type"
          options={transactionTypeOptions}
        />
        {isTransactionsPending ? (
          <ReportSkeleton />
        ) : isTransactionsError ? (
          <ErrorState />
        ) : transactionsListData?.data === null ||
          transactionsListData?.data?.data?.length === 0 ||
          transactionsListData?.data === undefined ? (
          <EmptyState
            title="No transactions found"
            description="Try adjusting your filters or search query."
            icon={<InboxIcon className="size-10 text-muted-foreground" />}
          />
        ) : (
          <TransactionList
            transactionsListData={transactionsListData?.data}
            pagination={pagination}
            onPaginationChange={setPagination}
          />
        )}
      </div>
    </div>
  );
};

export default ReportsContainer;
