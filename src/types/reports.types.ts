import { RequestPagination } from './payment.types';

export interface Paginated<T> {
  current_page: number;
  data: T[];
  first_page_url: string | null;
  from: number | null;
  last_page: number;
  last_page_url: string | null;
  links: Array<{
    url: string | null;
    label: string;
    page: number | null;
    active: boolean;
  }>;
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number | null;
  total: number;
}

export interface TransactionItem {
  id?: number | string;
  amount_in: number;
  amount_out: number;
  amount?: number | string;
  transaction_type?: string;
  transaction_type_name?: string;
  reference_id?: number;
  description?: string;
  created_at?: string;
}

export interface TransactionListApiResponse {
  success: boolean;
  message: string;
  data: TransactionItem[];
  pagination: RequestPagination;
}

export interface TransactionResponse {
  success: boolean;
  message: string;
  available_balance?: string;
}

export interface TransactionFilters {
  from_date: string;
  to_date: string;
  type: string;
}
