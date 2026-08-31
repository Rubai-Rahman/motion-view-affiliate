'use server';

import { apiGet } from '@/lib/fetch/fetchCore';
import {
  DashboardServerResponse,
  LeaderboardServerResponse,
  AccountServerResponse,
} from '@/types/dashboard.types';

export const getDashboardData = async () => {
  const result = await apiGet(`/dashboard`);
  if (!result.success) {
    return {
      success: false,
      error: result.error,
    };
  }
  return {
    success: true,
    data: result.data as DashboardServerResponse,
  };
};

export const getLeaderboardData = async () => {
  const result = await apiGet(`/leaderboard`);
  if (!result.success) {
    return {
      success: false,
      error: result.error,
    };
  }
  return {
    success: true,
    data: result.data as LeaderboardServerResponse,
  };
};

export const getAccountData = async () => {
  const result = await apiGet(`/me`);
  if (!result.success) {
    return {
      success: false,
      error: result.error,
    };
  }
  return {
    success: true,
    data: result.data as AccountServerResponse,
  };
};
