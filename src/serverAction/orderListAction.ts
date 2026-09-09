'use server';

import { apiGet } from '@/lib/fetch/fetchCore';
import { OrderListApiResponse } from '@/types/orders.types';

export const getOrderListData = async (params?: {
  from_date?: string;
  to_date?: string;
  status?: number | null;
  per_page?: number;
  page?: number;
}) => {
  const searchParams = new URLSearchParams();

  if (params?.from_date) searchParams.set('from_date', params.from_date);
  if (params?.to_date) searchParams.set('to_date', params.to_date);
  if (params?.status !== null && params?.status !== undefined) {
    searchParams.set('status', String(params.status));
  }
  if (params?.per_page) searchParams.set('per_page', String(params.per_page));
  if (params?.page && params.page > 1)
    searchParams.set('page', String(params.page));

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
