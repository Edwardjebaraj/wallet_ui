import { Component, computed, signal } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppService } from '../app.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-wallet-page',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule,RouterLink],
  templateUrl: './wallet-page.component.html',
  styleUrl: './wallet-page.component.scss',
})
export class WalletPageComponent {
  wallet = signal<any | null>(null);
  transactionForm!: FormGroup;
  isInitialized = computed(() => !!this.wallet());

  constructor(private walletService: AppService, private fb: FormBuilder) {}

  ngOnInit(): void {
    const walletId = localStorage.getItem('walletId');
    if (walletId) {
      this.walletService
        .getWallet(walletId)
        .subscribe((res) => this.wallet.set(res.data));
    }

    this.transactionForm = this.fb.group({
      amount: [''],
      description: [''],
      isCredit: [true],
    });
  }

  setupWallet(form: any) {
    const { name, balance } = form;
    this.walletService.createWallet({ name, balance }).subscribe((res) => {
      this.wallet.set(res.data);
      localStorage.setItem('walletId', res.data.id);
    });
  }

  submitTransaction() {
    const form = this.transactionForm.value; 
    const walletId = this.wallet()?.id;
    const payload = {
      amount: form.isCredit ? form.amount : -form.amount,
      description: form.description,
    };
    this.walletService.transact(walletId, payload).subscribe((res) => {
      const updated = { ...this.wallet(), balance: res.data.balance };
      this.wallet.set(updated);
      this.transactionForm.reset({ isCredit: true });
    });
  }
}
