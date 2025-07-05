 
import { Injectable } from '@angular/core';
import { Transaction, TransactionListResponse, TransactionResponse } from '../models/transaction.model';
import { WalletResponse } from '../models/wallet.model';
import { first } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  baseUrl = 'http://localhost:3400';

  constructor(private http: HttpClient) {}

  createWallet(data: { name: string; balance: number }) {
    return this.http.post<WalletResponse>(`${this.baseUrl}/setup`, data).pipe(first());
  }

  getWallet(id: string) {
    return this.http
      .get<WalletResponse>(`${this.baseUrl}/wallet/${id}`)
      .pipe(first());
  }

  transact(id: string, payload: { amount: number; description: string }) {
    return this.http
      .post<TransactionResponse>(`${this.baseUrl}/transact/${id}`, payload)
      .pipe(first());
  }

  getTransactions(walletId: string, skip = 0, limit = 10) {
    return this.http
      .get<TransactionListResponse>(`${this.baseUrl}/transactions`, {
        params: { walletId, skip, limit },
      })
      .pipe(first());
  }
}