'use client';

import Leaderboard from '@/components/leaderboard/leaderboard';
import { EmptyState } from '@/components/shared/empty-state';
import { ErrorState } from '@/components/shared/error-state';
import { LeaderboardSkeleton } from '@/components/skeleton/leaderboard-skeleton';
import { toast } from '@/components/ui/toast';
import { getLeaderboardData } from '@/serverAction/reportAction';
import { useQuery } from '@tanstack/react-query';
import {
  LeaderboardData,
  LeaderboardServerResponse,
} from '@/types/dashboard.types';

const LeaderboardContainer = () => {
  const {
    data: leaderboardData,
    isPending,
    isError,
  } = useQuery({
    queryKey: ['leaderboard'],
    queryFn: async () => {
      const result = await getLeaderboardData();

      if (result.success) {
        toast.add({
          title: 'Leaderboard Loaded',
          description: 'Leaderboard data has been loaded successfully.',
          type: 'success',
        });
      } else {
        toast.add({
          title: 'Leaderboard Load Failed',
          description:
            result.error || 'An error occurred while loading leaderboard data.',
          type: 'error',
        });
      }

      return result;
    },
  });

  if (isError) return <ErrorState />;
  if (isPending) return <LeaderboardSkeleton />;
  if (!leaderboardData?.data) return <EmptyState />;

  const leaderboardResponse = leaderboardData.data as LeaderboardServerResponse;
  if (!leaderboardResponse?.data) return <EmptyState />;

  return <Leaderboard data={leaderboardResponse.data as LeaderboardData} />;
};

export default LeaderboardContainer;
