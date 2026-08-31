/* -------------------------------------------------------------------------- */
/* Shared pagination envelope (Laravel-style)                                 */
/* -------------------------------------------------------------------------- */

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

/* -------------------------------------------------------------------------- */
/* Balance                                                                    */
/* -------------------------------------------------------------------------- */

export interface BalanceInquiryResponse {
  success: boolean;
  message: string;
  balance: string | number;
}

/* -------------------------------------------------------------------------- */
/* Wallet transaction history                                                 */
/* -------------------------------------------------------------------------- */

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

/* -------------------------------------------------------------------------- */
/* Withdraw requests                                                          */
/* -------------------------------------------------------------------------- */

export interface WithdrawRequestItem {
  id?: number | string;
  amount?: number | string;
  status?: string;
  created_at?: string;
  updated_at?: string;
  note?: string;
  transaction_id?: string;
  [key: string]: unknown;
}

export interface WithdrawRequestListApiResponse {
  success: boolean;
  message: string;
  data: Paginated<WithdrawRequestItem>;
}

export interface WithdrawRequestPayload {
  amount: number | string;
  note?: string;
}

export interface WithdrawRequestResponse {
  success: boolean;
  message: string;
  available_balance?: string;
}

/* -------------------------------------------------------------------------- */
/* Filter shapes (shared between container and presentational layer)          */
/* -------------------------------------------------------------------------- */

export interface TransactionFilters {
  from_date: string;
  to_date: string;
  type: string;
}
