/* -------------------------------------------------------------------------- */
/* Dashboard summary                                                          */
/* -------------------------------------------------------------------------- */

export interface DashboardData {
  date_filter?: {
    from_date: string;
    to_date: string;
  };
  summary?: {
    balance: number;
    number_of_sales: number;
    total_sales: number;
    total_commission: number;
    total_clicks: number;
    conversion_rate: number;
    total_bonus: number;
    pending_commission: number;
    cancelled_sales: number;
    returned_sales: number;
    refunded_sales: number;
  };
}

export interface DashboardApiResponse {
  success: boolean;
  message: string;
  data: DashboardData;
}

export interface AccountData {
  id: number;
  name: string;
  email: string;
  phone: string;
  profile_picture: string;
  address: string;
  description: string;
  affiliate_code: string;
  commission_rate: string;
  customer_discount_rate: string;
  type: number;
  status: number;
  approved_at: string;
  created_at: string;
  updated_at: string;
  profile_picture_url: string;
}

export interface AccountServerResponse {
  success: boolean;
  data: AccountData;
}
