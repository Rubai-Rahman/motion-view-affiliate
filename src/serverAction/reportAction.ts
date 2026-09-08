'use server';

import { apiGet, apiPost } from '@/lib/fetch/fetchCore';
import { DashboardApiResponse } from '@/types/dashboard.types';

import {
  BalanceInquiryResponse,
  WithdrawPayload,
  WithdrawRequestListApiResponse,
  WithdrawRequestResponse,
} from '@/types/payment.types';
import { OrderListApiResponse } from '@/types/orders.types';
import { AccountServerResponse } from '@/types/dashboard.types';
import { TransactionListApiResponse } from '@/types/reports.types';

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
  type?: number | null;
  per_page?: number;
  page?: number;
}) => {
  const searchParams = new URLSearchParams();

  if (params?.from_date) searchParams.set('from_date', params.from_date);
  if (params?.to_date) searchParams.set('to_date', params.to_date);
  if (params?.type !== null && params?.type !== undefined) {
    searchParams.set('type', String(params.type));
  }
  if (params?.per_page) searchParams.set('per_page', String(params.per_page));
  if (params?.page && params.page > 1)
    searchParams.set('page', String(params.page));

  const queryString = searchParams.toString();
  const endpoint = queryString
    ? `/wallet-transaction-history?${queryString}`
    : `/wallet-transaction-history`;

  const result = await apiGet<TransactionListApiResponse>(endpoint);

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

export const getWithdrawRequestListData = async ({
  filters,
  pagination,
}: {
  filters?: {
    from_date?: string;
    to_date?: string;
    status?: number | null;
  };
  pagination?: {
    per_page?: number;
    page?: number;
  };
}) => {
  const result = await apiPost<WithdrawRequestListApiResponse>(
    '/withdraw-request-list',
    {
      per_page: pagination?.per_page,
      page: pagination?.page,
      from_date: filters?.from_date,
      to_date: filters?.to_date,
      status: filters?.status,
    },
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
