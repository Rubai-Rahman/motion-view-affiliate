'use client';

import Leaderboard from '@/components/leaderboard/leaderboard';
import { EmptyState } from '@/components/shared/empty-state';
import { ErrorState } from '@/components/shared/error-state';
import { LeaderboardSkeleton } from '@/components/skeleton/leaderboard-skeleton';
import { toast } from '@/components/ui/toast';
import { getLeaderboardData } from '@/serverAction/reportAction';
import { useQuery } from '@tanstack/react-query';

const LeaderboardContainer = () => {
  const {
    data: leaderboardData,
    isPending,
    isError,
  } = useQuery({
    queryKey: ['leaderboard'],
    queryFn: async () => {
      const result = await getLeaderboardData();
      console.log('apiResult', result);
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
  console.log('leaderboardData', leaderboardData);
  if (isError) return <ErrorState />;
  if (isPending) return <LeaderboardSkeleton />;
  if (!leaderboardData?.data) return <EmptyState />;

  return <Leaderboard data={leaderboardData.data?.data ?? {}} />;
};

export default LeaderboardContainer;
