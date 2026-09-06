'use client';

import Dashboard from '@/components/dashboard/dashboard';
import { EmptyState } from '@/components/shared/empty-state';
import { ErrorState } from '@/components/shared/error-state';
import DashboardSkeleton from '@/components/skeleton/dashboard-skeleton';
import { getDashboardData } from '@/serverAction/reportAction';
import { useQuery } from '@tanstack/react-query';

const DashboardContainer = () => {
  const {
    data: dashboardData,
    isPending,
    isError,
  } = useQuery({
    queryKey: ['dashboard'],
    queryFn: getDashboardData,
  });

  if (isError) return <ErrorState />;
  if (isPending) return <DashboardSkeleton />;
  if (!dashboardData?.data) return <EmptyState />;

  return <Dashboard data={dashboardData.data.data} />;
};

export default DashboardContainer;
