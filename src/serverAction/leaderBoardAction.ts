'use server';
import { apiGet } from '@/lib/fetch/fetchCore';
import { LeaderboardApiResponse } from '@/types/leaderboard.types';

export const getLeaderboardData = async () => {
  const result = await apiGet<LeaderboardApiResponse>(`/leaderboard`);
  if (!result.success) {
    return {
      success: false,
      error: result.error,
    };
  }
  return {
    success: true,
    data: result.data,
  };
};
