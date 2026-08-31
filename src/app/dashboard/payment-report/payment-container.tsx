'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import Payment from '@/components/payment/payment';
import { EmptyState } from '@/components/shared/empty-state';
import { ErrorState } from '@/components/shared/error-state';
import { toast } from '@/components/ui/toast';
import {
  getBalanceInquiryData,
  getWithdrawRequestListData,
  submitWithdrawRequest,
} from '@/serverAction/reportAction';
import {
  WithdrawRequestListApiResponse,
  WithdrawRequestPayload,
} from '@/types/reports.types';

const PaymentContainer = () => {
  const queryClient = useQueryClient();

  const {
    data: balanceData,
    isPending: isBalancePending,
    isError: isBalanceError,
  } = useQuery({
    queryKey: ['balance-inquiry-payment'],
    queryFn: async () => {
      const result = await getBalanceInquiryData();
      if (!result.success) {
        toast.add({
          title: 'Balance Load Failed',
          description: result.error || 'Unable to load available balance.',
          type: 'error',
        });
      }
      return result;
    },
  });

  const {
    data: withdrawalData,
    isPending: isWithdrawalPending,
    isError: isWithdrawalError,
  } = useQuery({
    queryKey: ['withdraw-request-list'],
    queryFn: async () => {
      const result = await getWithdrawRequestListData();
      if (!result.success) {
        toast.add({
          title: 'Withdrawal List Failed',
          description:
            result.error || 'Unable to load your withdrawal request history.',
          type: 'error',
        });
      }
      return result;
    },
  });
  console.log('withdrawalData===', withdrawalData);
  const { mutate: withdraw, isPending: isWithdrawing } = useMutation({
    mutationFn: (payload: WithdrawRequestPayload) =>
      submitWithdrawRequest(payload),
    onSuccess: (result) => {
      if (!result.success) {
        toast.add({
          title: 'Withdrawal Failed',
          description: result.error || 'Unable to submit withdrawal request.',
          type: 'error',
        });
        return;
      }
      toast.add({
        title: 'Withdrawal Submitted',
        description:
          result?.data?.message || 'Your withdrawal request was submitted.',
        type: 'success',
      });
      void queryClient.invalidateQueries({
        queryKey: ['balance-inquiry-payment'],
      });
      void queryClient.invalidateQueries({
        queryKey: ['withdraw-request-list'],
      });
    },
    onError: () => {
      toast.add({
        title: 'Withdrawal Failed',
        description: 'An unexpected error occurred. Please try again.',
        type: 'error',
      });
    },
  });

  const availableBalance =
    typeof balanceData?.data?.balance === 'string'
      ? balanceData.data.balance
      : String(balanceData?.data?.balance ?? '0.00');

  console.log('balanceData', balanceData);
  if (isBalanceError || isWithdrawalError) return <ErrorState />;

  if (isBalancePending || isWithdrawalPending) {
    return (
      <div className="space-y-4 py-8">
        <div className="h-10 w-48 animate-pulse rounded-lg bg-muted" />
        <div className="grid gap-4 md:grid-cols-2">
          <div className="h-40 animate-pulse rounded-xl bg-muted" />
          <div className="h-40 animate-pulse rounded-xl bg-muted" />
        </div>
      </div>
    );
  }

  if (!balanceData?.data && !withdrawalData?.data) return <EmptyState />;

  console.log('withdrawalData===', withdrawalData);

  return (
    <Payment
      withdrawalList={
        (withdrawalData?.data as WithdrawRequestListApiResponse) ?? null
      }
      availableBalance={availableBalance}
      onWithdraw={withdraw}
      isWithdrawing={isWithdrawing}
    />
  );
};

export default PaymentContainer;
