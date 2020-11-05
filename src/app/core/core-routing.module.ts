import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



const routes: Routes = [
  { path: '', redirectTo: 'shop', pathMatch: 'full'},
  { path: 'shop', loadChildren: () => import('../feature/shop/shop.module').then( m => m.ShopModule )},
  { path: 'size', loadChildren: () => import('../feature/size/size.module').then( m => m.SizeModule )},
  { path: 'contacts', loadChildren: () => import('../feature/contact/contact.module').then( m => m.ContactModule) },
  { path: 'billpay', loadChildren: () => import('../feature/billpay/billpay.module').then( m => m.BillpayModule ) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
