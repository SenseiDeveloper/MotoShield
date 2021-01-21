import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopRoutingModule } from './shop-routing.module';
import { ShopComponent } from './shop.component';
import {SharedModule} from '../../shared/shared.module';
import { FilterComponent } from './filter/filter.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';


@NgModule({
  declarations: [ShopComponent, FilterComponent],
  imports: [
    CommonModule,
    ShopRoutingModule,
    SharedModule,
    MatFormFieldModule,
    MatInputModule,
    SharedModule
  ]
})
export class ShopModule { }
