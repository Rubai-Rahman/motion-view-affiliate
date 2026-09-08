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
import { WithdrawPayload } from '@/types/payment.types';
import { WithdrawRequestResponse } from '@/types/reports.types';
import { useMutation, useQuery } from '@tanstack/react-query';

const dummyWithdrawList = {
  success: true,
  data: {
    success: true,
    message: 'Withdrawal request list retrieved successfully.',
    data: [
      {
        id: 1,
        amount_in: 5000,
        amount_out: 0,
        amount: 5000,
        transaction_type: 'withdrawal',
        transaction_type_name: 'Withdrawal Request',
        reference_id: 1001,
        description: 'Withdrawal to bank account',
        created_at: '2026-09-01T10:30:00Z',
      },
      {
        id: 2,
        amount_in: 0,
        amount_out: 3000,
        amount: 3000,
        transaction_type: 'withdrawal',
        transaction_type_name: 'Withdrawal Request',
        reference_id: 1002,
        description: 'Withdrawal to bank account',
        created_at: '2026-09-02T14:20:00Z',
      },
      {
        id: 3,
        amount_in: 2500,
        amount_out: 0,
        amount: 2500,
        transaction_type: 'withdrawal',
        transaction_type_name: 'Withdrawal Request',
        reference_id: 1003,
        description: 'Withdrawal to bank account',
        created_at: '2026-09-03T09:15:00Z',
      },
      {
        id: 4,
        amount_in: 0,
        amount_out: 4500,
        amount: 4500,
        transaction_type: 'withdrawal',
        transaction_type_name: 'Withdrawal Request',
        reference_id: 1004,
        description: 'Withdrawal to bank account',
        created_at: '2026-09-04T16:45:00Z',
      },
      {
        id: 5,
        amount_in: 1500,
        amount_out: 0,
        amount: 1500,
        transaction_type: 'withdrawal',
        transaction_type_name: 'Withdrawal Request',
        reference_id: 1005,
        description: 'Withdrawal to bank account',
        created_at: '2026-09-05T11:10:00Z',
      },
      {
        id: 6,
        amount_in: 1500,
        amount_out: 0,
        amount: 1500,
        transaction_type: 'withdrawal',
        transaction_type_name: 'Withdrawal Request',
        reference_id: 1005,
        description: 'Withdrawal to bank account',
        created_at: '2026-09-05T11:10:00Z',
      },
      {
        id: 7,
        amount_in: 1500,
        amount_out: 0,
        amount: 1500,
        transaction_type: 'withdrawal',
        transaction_type_name: 'Withdrawal Request',
        reference_id: 1005,
        description: 'Withdrawal to bank account',
        created_at: '2026-09-05T11:10:00Z',
      },
      {
        id: 8,
        amount_in: 1500,
        amount_out: 0,
        amount: 1500,
        transaction_type: 'withdrawal',
        transaction_type_name: 'Withdrawal Request',
        reference_id: 1005,
        description: 'Withdrawal to bank account',
        created_at: '2026-09-05T11:10:00Z',
      },
      {
        id: 9,
        amount_in: 1500,
        amount_out: 0,
        amount: 1500,
        transaction_type: 'withdrawal',
        transaction_type_name: 'Withdrawal Request',
        reference_id: 1005,
        description: 'Withdrawal to bank account',
        created_at: '2026-09-05T11:10:00Z',
      },
      {
        id: 10,
        amount_in: 1500,
        amount_out: 0,
        amount: 1500,
        transaction_type: 'withdrawal',
        transaction_type_name: 'Withdrawal Request',
        reference_id: 1005,
        description: 'Withdrawal to bank account',
        created_at: '2026-09-05T11:10:00Z',
      },
      {
        id: 11,
        amount_in: 1500,
        amount_out: 0,
        amount: 1500,
        transaction_type: 'withdrawal',
        transaction_type_name: 'Withdrawal Request',
        reference_id: 1005,
        description: 'Withdrawal to bank account',
        created_at: '2026-09-05T11:10:00Z',
      },
      {
        id: 12,
        amount_in: 1500,
        amount_out: 0,
        amount: 1500,
        transaction_type: 'withdrawal',
        transaction_type_name: 'Withdrawal Request',
        reference_id: 1005,
        description: 'Withdrawal to bank account',
        created_at: '2026-09-05T11:10:00Z',
      },
      {
        id: 13,
        amount_in: 1500,
        amount_out: 0,
        amount: 1500,
        transaction_type: 'withdrawal',
        transaction_type_name: 'Withdrawal Request',
        reference_id: 1005,
        description: 'Withdrawal to bank account',
        created_at: '2026-09-05T11:10:00Z',
      },
      {
        id: 14,
        amount_in: 1500,
        amount_out: 0,
        amount: 1500,
        transaction_type: 'withdrawal',
        transaction_type_name: 'Withdrawal Request',
        reference_id: 1005,
        description: 'Withdrawal to bank account',
        created_at: '2026-09-05T11:10:00Z',
      },
      {
        id: 15,
        amount_in: 1500,
        amount_out: 0,
        amount: 1500,
        transaction_type: 'withdrawal',
        transaction_type_name: 'Withdrawal Request',
        reference_id: 1005,
        description: 'Withdrawal to bank account',
        created_at: '2026-09-05T11:10:00Z',
      },
      {
        id: 16,
        amount_in: 1500,
        amount_out: 0,
        amount: 1500,
        transaction_type: 'withdrawal',
        transaction_type_name: 'Withdrawal Request',
        reference_id: 1005,
        description: 'Withdrawal to bank account',
        created_at: '2026-09-05T11:10:00Z',
      },
      {
        id: 17,
        amount_in: 1500,
        amount_out: 0,
        amount: 1500,
        transaction_type: 'withdrawal',
        transaction_type_name: 'Withdrawal Request',
        reference_id: 1005,
        description: 'Withdrawal to bank account',
        created_at: '2026-09-05T11:10:00Z',
      },
      {
        id: 18,
        amount_in: 1500,
        amount_out: 0,
        amount: 1500,
        transaction_type: 'withdrawal',
        transaction_type_name: 'Withdrawal Request',
        reference_id: 1005,
        description: 'Withdrawal to bank account',
        created_at: '2026-09-05T11:10:00Z',
      },
      {
        id: 19,
        amount_in: 1500,
        amount_out: 0,
        amount: 1500,
        transaction_type: 'withdrawal',
        transaction_type_name: 'Withdrawal Request',
        reference_id: 1005,
        description: 'Withdrawal to bank account',
        created_at: '2026-09-05T11:10:00Z',
      },
    ],
    pagination: {
      current_page: 1,
      last_page: 2,
      per_page: 10,
      total: 19,
      from: 1,
      to: 10,
      has_next_page: true,
    },
  },
};
const PaymentContainer = () => {
  const [filters, setFilters] = useState({
    from_date: '',
    to_date: '',
    type: 'all',
  });

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
    queryKey: ['withdraw-request-list', filters],
    queryFn: async () => {
      const result = await getWithdrawRequestListData(filters);
      return result;
    },
  });

  const handleWithdraw = (formdata: WithdrawPayload) => {
    withdraw(formdata);
  };

  const handleFiltersChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
  };

  const handleResetFilters = () => {
    setFilters({
      from_date: '',
      to_date: '',
      type: 'all',
    });
  };

  const withdrawalSummary = dummyWithdrawList?.data?.data?.reduce(
    (summary, item) => {
      summary.totalTransactions += 1;
      summary.totalAmountIn += Number(item.amount_in || 0);
      summary.totalAmountOut += Number(item.amount_out || 0);

      return summary;
    },
    {
      totalTransactions: 0,
      totalAmountIn: 0,
      totalAmountOut: 0,
    },
  ) ?? {
    totalTransactions: 0,
    totalAmountIn: 0,
    totalAmountOut: 0,
  };

  console.log('withdrawalSummary', withdrawalSummary);
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
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs text-muted-foreground">
              Real-time updates
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <Balance
          handleWithdraw={handleWithdraw}
          isWithdrawing={isWithdrawing}
          withdrawalSummary={withdrawalSummary}
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
          withdrawListData?.data === undefined ? (
          <EmptyState />
        ) : (
          <WithdrawList withdrawListData={dummyWithdrawList?.data} />
        )}
      </div>
    </div>
  );
};

export default PaymentContainer;
