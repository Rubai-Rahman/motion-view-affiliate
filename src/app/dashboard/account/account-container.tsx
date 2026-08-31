'use client';

import Account from '@/components/account/account';
import { EmptyState } from '@/components/shared/empty-state';
import { ErrorState } from '@/components/shared/error-state';
import { AccountSkeleton } from '@/components/skeleton/account-skeleton';
import { toast } from '@/components/ui/toast';
import { getAccountData } from '@/serverAction/reportAction';
import { useQuery } from '@tanstack/react-query';
import { AccountServerResponse } from '@/types/dashboard.types';

const AccountContainer = () => {
  const {
    data: accountData,
    isPending,
    isError,
  } = useQuery({
    queryKey: ['account'],
    queryFn: async () => {
      const result = await getAccountData();

      if (result.success) {
        toast.add({
          title: 'Account Data Loaded',
          description: 'Your account information has been loaded successfully.',
          type: 'success',
        });
      } else {
        toast.add({
          title: 'Account Data Load Failed',
          description:
            result.error || 'An error occurred while loading account data.',
          type: 'error',
        });
      }

      return result;
    },
  });

  if (isError) return <ErrorState />;
  if (isPending) return <AccountSkeleton />;
  if (!accountData?.data) return <EmptyState />;

  const accountResponse = accountData.data as AccountServerResponse;
  if (!accountResponse?.data) return <EmptyState />;

  return <Account data={accountResponse.data} />;
};

export default AccountContainer;
