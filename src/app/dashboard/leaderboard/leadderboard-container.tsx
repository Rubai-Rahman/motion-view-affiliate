'use client';

import Leaderboard from '@/components/leaderboard/leaderboard';
import { EmptyState } from '@/components/shared/empty-state';
import { ErrorState } from '@/components/shared/error-state';
import LeaderboardSkeleton from '@/components/skeleton/leaderboard-skeleton';
import { getLeaderboardData } from '@/serverAction/leaderBoardAction';
import { useQuery } from '@tanstack/react-query';

const LeaderboardContainer = () => {
  const {
    data: leaderboardData,
    isPending,
    isError,
  } = useQuery({
    queryKey: ['leaderboard'],
    queryFn: getLeaderboardData,
  });

  if (isError) return <ErrorState />;
  if (isPending) return <LeaderboardSkeleton />;
  if (!leaderboardData?.data) return <EmptyState />;

  return <Leaderboard data={leaderboardData?.data?.data} />;
};

export default LeaderboardContainer;
