import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import {SubHeaderComponent} from './sub-header/sub-header.component';
import {ListShopComponent} from './list-shop/list-shop.component';
import {SharedModule} from '../../shared/shared.module';


@NgModule({
  declarations: [
    HomeComponent,
    SubHeaderComponent,
    ListShopComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule
  ]
})
export class HomeModule { }
