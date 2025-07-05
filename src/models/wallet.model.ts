export interface Wallet {
  id: string;
  name: string;
  balance: number;
  date: string;
}
export interface WalletResponse {
  code: number;
  message: string;
  status: boolean;
  data: {
    id: string;
    balance: number;
    name: string;
    transactionId?: string | null;
    date: string;
  };
}
