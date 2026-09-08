'use client';

import { useState } from 'react';
import Balance from '@/components/payment/balance';
import WithdrawList from '@/components/payment/withdraw-list';
import PaymentFilter from '@/components/payment/payment-filter';
import { EmptyState } from '@/components/shared/empty-state';
import { ErrorState } from '@/components/shared/error-state';
import TableSkeleton from '@/components/skeleton/table-skeleton';
import { toast } from '@/components/ui/toast';
import {
  getWithdrawRequestListData,
  submitWithdrawRequest,
} from '@/serverAction/reportAction';
import {
  WithdrawPayload,
  WithdrawRequestResponse,
} from '@/types/payment.types';
import { useMutation, useQuery } from '@tanstack/react-query';
import { InboxIcon } from 'lucide-react';

const PaymentContainer = () => {
  const [filters, setFilters] = useState<{
    from_date: string;
    to_date: string;
    status: number | null;
  }>({
    from_date: '',
    to_date: '',
    status: null,
  });
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });

  const { mutate: withdraw, isPending: isWithdrawing } = useMutation<
    WithdrawRequestResponse,
    Error,
    WithdrawPayload
  >({
    mutationFn: (payload) => submitWithdrawRequest(payload),
    onSuccess: (result) => {
      toast.add({
        title: 'Withdrawal Submitted',
        description: result.message || 'Your withdrawal request was submitted.',
        type: 'success',
      });
    },
    onError: (err) => {
      toast.add({
        title: 'Withdrawal Failed',
        description:
          err.message || 'An unexpected error occurred. Please try again.',
        type: 'error',
      });
    },
  });

  const {
    data: withdrawListData,
    isPending: isWithdrawalPending,
    isError: isWithdrawalError,
  } = useQuery({
    queryKey: ['withdraw-request-list', filters, pagination],
    queryFn: () =>
      getWithdrawRequestListData({
        filters,
        pagination: {
          per_page: pagination.pageSize,
          page: pagination.pageIndex + 1, // Convert 0-based to 1-based
        },
      }),
  });

  const handleWithdraw = (formdata: WithdrawPayload) => {
    withdraw(formdata);
  };

  const handleFiltersChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
    setPagination((p) => ({ ...p, pageIndex: 0 }));
  };

  const handleResetFilters = () => {
    setFilters({
      from_date: '',
      to_date: '',
      status: null,
    });
    setPagination({ pageIndex: 0, pageSize: 10 });
  };

  // const withdrawalSummary = withdrawListData?.data?.data?.reduce(
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

  console.log('withdrawalSummary', withdrawListData);

  return (
    <div className="space-y-8">
      <div className="relative">
        <div className="absolute inset-0 bg-linear-to-r from-primary/10 via-transparent to-primary/10 opacity-50 blur-3xl" />
        <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold bg-linear-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
              Payment Reports
            </h1>
            <p className="text-sm text-muted-foreground">
              Track your withdrawal history and manage your balance
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <Balance
          handleWithdraw={handleWithdraw}
          isWithdrawing={isWithdrawing}
        />
        <PaymentFilter
          filters={filters}
          onFiltersChange={handleFiltersChange}
          onReset={handleResetFilters}
        />
        {isWithdrawalPending ? (
          <TableSkeleton />
        ) : isWithdrawalError ? (
          <ErrorState />
        ) : withdrawListData?.data === null ||
          withdrawListData?.data?.data?.length === 0 ||
          withdrawListData?.data === undefined ? (
          <EmptyState
            title="No withdrawal requests found"
            description="Try adjusting your filters or search query."
            icon={<InboxIcon className="size-10 text-muted-foreground" />}
          />
        ) : (
          <WithdrawList
            withdrawListData={withdrawListData?.data}
            pagination={pagination}
            onPaginationChange={setPagination}
          />
        )}
      </div>
    </div>
  );
};

export default PaymentContainer;
