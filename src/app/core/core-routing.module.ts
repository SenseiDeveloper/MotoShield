import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CoreComponent} from './core.component';


const routes: Routes = [
  { path: '', component: CoreComponent, children: [
      { path: 'home', loadChildren: () => import('../feature/home/home.module').then( m => m.HomeModule) },
      { path: 'shop', loadChildren: () => import('../feature/shop/shop.module').then( m => m.ShopModule )},
      { path: 'size', loadChildren: () => import('../feature/size/size.module').then( m => m.SizeModule )},
      { path: 'contacts', loadChildren: () => import('../feature/contact/contact.module').then( m => m.ContactModule)},
      { path: 'billpay', loadChildren: () => import('../feature/billpay/billpay.module').then( m => m.BillpayModule)},
      { path: 'product/:id', loadChildren: () => import('../feature/product/product.module').then( m => m.ProductModule)},
      { path: 'pay', loadChildren: () => import('../feature/pay/pay.module').then( m => m.PayModule)},
      { path: '404', loadChildren: () => import('../feature/not-found/not-found.module').then( m => m.NotFoundModule)},
      {path: '**', redirectTo: '/404'}
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
