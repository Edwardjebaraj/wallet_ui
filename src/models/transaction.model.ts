export type TransactionType = 'CREDIT' | 'DEBIT';

export interface Transaction {
  id: string;
  walletId: string;
  amount: number;
  balance: number;
  description: string;
  type: TransactionType;
  date: string;   
}
export interface TransactionResponse {


    code: number;
    message: string;
    status: boolean;
    data: { transactionId: string;
  balance: number;}
}

export interface TransactionListResponse {
  code: number;
  message: string;
  status: boolean;
  data: Transaction[];
}