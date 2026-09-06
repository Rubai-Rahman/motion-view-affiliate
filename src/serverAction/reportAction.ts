'use server';

import { apiGet, apiPost } from '@/lib/fetch/fetchCore';
import { DashboardApiResponse } from '@/types/dashboard.types';
import {
  BalanceInquiryResponse,
  WalletTransactionHistoryApiResponse,
  WithdrawRequestListApiResponse,
  WithdrawRequestResponse,
} from '@/types/reports.types';
import { WithdrawPayload } from '@/types/payment.types';
import { OrderListApiResponse } from '@/types/orders.types';
import { AccountServerResponse } from '@/types/dashboard.types';

export const getDashboardData = async () => {
  const result = await apiGet<DashboardApiResponse>('/dashboard');
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

export const getAccountData = async () => {
  const result = await apiGet<AccountServerResponse>(`/me`);
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

export const getBalanceInquiryData = async () => {
  const result = await apiGet<BalanceInquiryResponse>(`/balance-inquiry`);

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

export const getWalletTransactionHistoryData = async (params?: {
  from_date?: string;
  to_date?: string;
  type?: string;
}) => {
  const searchParams = new URLSearchParams();

  if (params?.from_date) searchParams.set('from_date', params.from_date);
  if (params?.to_date) searchParams.set('to_date', params.to_date);
  if (params?.type && params.type !== 'all') {
    searchParams.set('type', params.type);
  }

  const queryString = searchParams.toString();
  const endpoint = queryString
    ? `/wallet-transaction-history?${queryString}`
    : `/wallet-transaction-history`;

  const result = await apiGet<WalletTransactionHistoryApiResponse>(endpoint);

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

export const getWithdrawRequestListData = async () => {
  const result = await apiPost<WithdrawRequestListApiResponse>(
    `/withdraw-request-list`,
    {},
  );

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

export const submitWithdrawRequest = async (
  payload: WithdrawPayload,
): Promise<WithdrawRequestResponse> => {
  const result = await apiPost<WithdrawRequestResponse>(
    `/withdraw-request`,
    payload,
  );

  if (!result.success) {
    throw new Error(result.error);
  }

  return result.data;
};

export const getOrderListData = async (params?: {
  page?: number;
  from_date?: string;
  to_date?: string;
  status?: string;
}) => {
  const searchParams = new URLSearchParams();

  if (params?.page && params.page > 1) {
    searchParams.set('page', String(params.page));
  }
  if (params?.from_date) searchParams.set('from_date', params.from_date);
  if (params?.to_date) searchParams.set('to_date', params.to_date);
  if (params?.status && params.status !== 'all') {
    searchParams.set('status', params.status);
  }

  const queryString = searchParams.toString();
  const endpoint = queryString ? `/order-list?${queryString}` : `/order-list`;

  const result = await apiGet<OrderListApiResponse>(endpoint);

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
