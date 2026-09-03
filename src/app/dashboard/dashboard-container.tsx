'use client';

import Dashboard from '@/components/dashboard/dashboard';
import { EmptyState } from '@/components/shared/empty-state';
import { ErrorState } from '@/components/shared/error-state';
import DashboardSkeleton from '@/components/skeleton/dashboard-skeleton';
import { toast } from '@/components/ui/toast';
import { getDashboardData } from '@/serverAction/reportAction';
import { useQuery } from '@tanstack/react-query';

const DashboardContainer = () => {
  const {
    data: dashboardData,
    isPending,
    isError,
  } = useQuery({
    queryKey: ['dashboard'],
    queryFn: async () => {
      const result = await getDashboardData();
      if (result?.success) {
        toast.add({
          title: 'Dashboard Loaded',
          description: result?.data?.message || 'Dashboard loaded successfully',
          type: 'success',
        });
      } else {
        toast.add({
          title: 'Dashboard Load Failed',
          description:
            result.error || 'An error occurred while loading dashboard data.',
          type: 'error',
        });
      }

      return result;
    },
  });

  if (isError) return <ErrorState />;
  if (isPending) return <DashboardSkeleton />;
  if (!dashboardData?.data) return <EmptyState />;

  return <Dashboard data={dashboardData.data.data} />;
};

export default DashboardContainer;
