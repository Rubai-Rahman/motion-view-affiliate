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

export interface WalletTransactionItem {
  id?: number | string;
  type?: string;
  amount?: number | string;
  note?: string;
  created_at?: string;
  updated_at?: string;
  transaction_id?: string;
  status?: string;
  balance_after?: number | string;
  [key: string]: unknown;
}

export interface WalletTransactionHistoryApiResponse {
  success: boolean;
  message: string;
  balance: number | string;
  data: Paginated<WalletTransactionItem>;
}

// export interface WithdrawRequestItem {
//   id?: number | string;
//   amount_in: number;
//   amount_out: number;
//   amount?: number | string;
//   transaction_type?: string;
//   transaction_type_name?: string;
//   reference_id?: number;
//   description?: string;
//   created_at?: string;
// }
// export interface WithdrawRequestPagination {
//   current_page: number;
//   last_page: number;
//   per_page: number;
//   total: number;
//   from: number | null;
//   to: number | null;
//   has_next_page: boolean;
// }

// export interface WithdrawRequestListApiResponse {
//   success: boolean;
//   message: string;
//   data: WithdrawRequestItem[];
//   pagination: WithdrawRequestPagination;
// }

// export interface WithdrawRequestResponse {
//   success: boolean;
//   message: string;
//   available_balance?: string;
// }

// export interface TransactionFilters {
//   from_date: string;
//   to_date: string;
//   type: string;
// }
