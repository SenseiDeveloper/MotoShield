import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PayRoutingModule } from './pay-routing.module';
import { PayComponent } from './pay.component';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {ReactiveFormsModule} from '@angular/forms';
import { ModalCallbackComponent } from './modal-callback/modal-callback.component';


@NgModule({
  declarations: [PayComponent, ModalCallbackComponent],
  imports: [
    CommonModule,
    PayRoutingModule,
    MatSelectModule,
    MatInputModule,
    ReactiveFormsModule
  ]
})
export class PayModule { }
