import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BillpayRoutingModule } from './billpay-routing.module';
import { BillpayComponent } from './billpay.component';


@NgModule({
  declarations: [BillpayComponent],
  imports: [
    CommonModule,
    BillpayRoutingModule
  ]
})
export class BillpayModule { }
