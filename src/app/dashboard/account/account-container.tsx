'use client';

import Account from '@/components/account/account';
import { EmptyState } from '@/components/shared/empty-state';
import { ErrorState } from '@/components/shared/error-state';
import { getAccountData } from '@/serverAction/reportAction';
import { useQuery } from '@tanstack/react-query';
import AccountSkeleton from '@/components/skeleton/account-skeleton';

const AccountContainer = () => {
  const {
    data: accountData,
    isPending,
    isError,
  } = useQuery({
    queryKey: ['account'],
    queryFn: async () => {
      const result = await getAccountData();

      return result;
    },
  });
  console.log('accountData===', accountData);
  if (isError) return <ErrorState />;
  if (isPending) return <AccountSkeleton />;
  if (!accountData?.data) return <EmptyState />;

  return <Account data={accountData.data.data} />;
};

export default AccountContainer;
