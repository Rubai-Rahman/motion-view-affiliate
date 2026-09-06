export interface WithdrawPayload {
  payment_method: number;
  amount: number;
  payment_account: string;
  affiliate_note?: string;
  note?: string;
}
