import { Routes } from '@angular/router';
import { WalletPageComponent } from './wallet-page/wallet-page.component';
import { TransactionsPageComponent } from './transactions-page/transactions-page.component';

export const routes: Routes = [{ path: '', component: WalletPageComponent },
    { path: 'transactions', component: TransactionsPageComponent },
    { path: '**', redirectTo: '' }  ];
