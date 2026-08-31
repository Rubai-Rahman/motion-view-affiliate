'use client';

import Dashboard from '@/components/dashboard/dashboard';
import { EmptyState } from '@/components/shared/empty-state';
import { ErrorState } from '@/components/shared/error-state';
import { DashboardSkeleton } from '@/components/skeleton/dashboard-skeleton';
import { toast } from '@/components/ui/toast';
import { getDashboardData } from '@/serverAction/reportAction';
import { useQuery } from '@tanstack/react-query';
import {
  DashboardData,
  DashboardServerResponse,
} from '@/types/dashboard.types';

const DashboardContainer = () => {
  const {
    data: dashboardData,
    isPending,
    isError,
  } = useQuery({
    queryKey: ['dashboard'],
    queryFn: async () => {
      const result = await getDashboardData();

      if (result.success) {
        toast.add({
          title: 'Dashboard Loaded',
          description: 'Your dashboard data has been loaded successfully.',
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

  const dashboardResponse = dashboardData.data as DashboardServerResponse;
  if (!dashboardResponse?.data) return <EmptyState />;

  return <Dashboard data={dashboardResponse.data as DashboardData} />;
};

export default DashboardContainer;
