'use client';

import Balance from '@/components/payment/balance';
import WithdrawForm from '@/components/payment/withdraw-form';
import WithdrawList from '@/components/payment/withdraw-list';
import { ErrorState } from '@/components/shared/error-state';
import PaymentSkeleton from '@/components/skeleton/payment-skeleton';
import { toast } from '@/components/ui/toast';
import {
  getWithdrawRequestListData,
  submitWithdrawRequest,
} from '@/serverAction/reportAction';
import { WithdrawPayload } from '@/types/payment.types';
import { WithdrawRequestResponse } from '@/types/reports.types';
import { useMutation, useQuery } from '@tanstack/react-query';

const PaymentContainer = () => {
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
    data: withdrawalData,
    isPending: isWithdrawalPending,
    isError: isWithdrawalError,
  } = useQuery({
    queryKey: ['withdraw-request-list'],
    queryFn: async () => {
      const result = await getWithdrawRequestListData();
      return result;
    },
  });

  const handleWithdraw = (formdata: WithdrawPayload) => {
    withdraw(formdata);
  };

  if (isWithdrawalPending) {
    return <PaymentSkeleton />;
  }
  if (isWithdrawalError) {
    return <ErrorState />;
  }
  console.log('withdrawalData===', withdrawalData);
  return (
    <div>
      <Balance />
      <WithdrawForm onSubmit={handleWithdraw} isPending={isWithdrawing} />
      <WithdrawList />
    </div>
  );
};

export default PaymentContainer;
