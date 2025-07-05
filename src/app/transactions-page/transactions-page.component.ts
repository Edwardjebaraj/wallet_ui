import { Component, signal } from '@angular/core';
import { AppService } from '../app.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-transactions-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './transactions-page.component.html',
  styleUrl: './transactions-page.component.scss',
})
export class TransactionsPageComponent {
  transactions = signal<any[]>([]);
  skip = 0;
  limit = 10;

  constructor(private walletService: AppService) {}

  ngOnInit(): void {
    this.loadTransactions();
  }

  loadTransactions() {
    const walletId = localStorage.getItem('walletId');
    if (!walletId) return;

    this.walletService
      .getTransactions(walletId, this.skip, this.limit)
      .subscribe((res) => {
        this.transactions.set(res.data);
      });
  }

  nextPage() {
    this.skip += this.limit;
    this.loadTransactions();
  }

  prevPage() {
    if (this.skip >= this.limit) {
      this.skip -= this.limit;
      this.loadTransactions();
    }
  }
  exportCSV() {
    const rows = this.transactions();
    const header = ['ID', 'Amount', 'Balance', 'Description', 'Type', 'Date'];
    const csv = [header.join(',')];
    rows.forEach((row) => {
      csv.push(
        [
          row.id,
          row.amount,
          row.balance,
          row.description,
          row.type,
          row.date,
        ].join(',')
      );
    });
    const blob = new Blob([csv.join('\n')], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'transactions.csv';
    link.click();
  }
}
