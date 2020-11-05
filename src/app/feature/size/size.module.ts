import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SizeRoutingModule } from './size-routing.module';
import { SizeComponent } from './size.component';


@NgModule({
  declarations: [SizeComponent],
  imports: [
    CommonModule,
    SizeRoutingModule
  ]
})
export class SizeModule { }
