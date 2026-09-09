import { RequestPagination } from './payment.types';

/* -------------------------------------------------------------------------- */
/* Orders                                                                     */
/* -------------------------------------------------------------------------- */

export interface OrderItem {
  id?: number | string;
  order_id?: string;
  customer_name?: string;
  product_name?: string;
  amount?: number | string;
  commission?: number | string;
  status?: string;
  created_at?: string;
  updated_at?: string;
  [key: string]: unknown;
}

export interface OrderListApiResponse {
  success: boolean;
  message: string;
  data: OrderItem[];
  pagination: RequestPagination;
}

export interface OrderFilters {
  from_date: string;
  to_date: string;
  status: string;
}
