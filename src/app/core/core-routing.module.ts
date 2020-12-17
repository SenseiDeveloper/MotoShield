import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', loadChildren: () => import('../feature/home/home.module').then( m => m.HomeModule) },
  { path: 'shop', loadChildren: () => import('../feature/shop/shop.module').then( m => m.ShopModule )},
  { path: 'size', loadChildren: () => import('../feature/size/size.module').then( m => m.SizeModule )},
  { path: 'contacts', loadChildren: () => import('../feature/contact/contact.module').then( m => m.ContactModule)},
  { path: 'billpay', loadChildren: () => import('../feature/billpay/billpay.module').then( m => m.BillpayModule)},
  { path: 'product/:id', loadChildren: () => import('../feature/product/product.module').then( m => m.ProductModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
