export interface LeaderboardEntry {
  rank: number;
  affiliate_id: number;
  name: string;
  affiliate_code: string;
  number_of_sales: number;
  total_sales: number;
  total_commission: number;
}
export interface MyPosition {
  rank: number;
  affiliate_id: number;
  name: string;
  affiliate_code: string;
  number_of_sales: number;
  total_sales: number;
  total_commission: number;
  is_in_top_10: boolean;
}

export interface LeaderboardData {
  date_filter: {
    from_date: string;
    to_date: string;
  };
  my_position: MyPosition;
  leaderboard: LeaderboardEntry[];
}

export interface LeaderboardApiResponse {
  success: boolean;
  message: string;
  data: LeaderboardData;
}
