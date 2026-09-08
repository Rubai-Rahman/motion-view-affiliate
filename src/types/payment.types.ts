export interface WithdrawPayload {
  payment_method: number;
  amount: number;
  payment_account: string;
  affiliate_note?: string;
  note?: string;
}

export interface BalanceInquiryResponse {
  success: boolean;
  message: string;
  balance: string | number;
}

export interface WithdrawRequestItem {
  id: number;
  amount: number;
  payment_method: number;
  payment_method_name: string;
  payment_account: string;
  status: number;
  status_name: string;
  transaction_reference: string;
  affiliate_note: string | null;
  admin_note: string | null;
  processed_at: string | null;
  created_at: string;
}
export interface WithdrawRequestPagination {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  from: number | null;
  to: number | null;
  has_next_page: boolean;
}

export interface WithdrawRequestListApiResponse {
  success: boolean;
  message: string;
  data: WithdrawRequestItem[];
  pagination: WithdrawRequestPagination;
}

export interface WithdrawRequestResponse {
  success: boolean;
  message: string;
  available_balance?: string;
}

export interface WithdrawFilters {
  from_date: string;
  to_date: string;
  status: number | null;
}
