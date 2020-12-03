import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {ApiBaseService} from './API/api-base.service';
import { ShopItemComponent } from './components/shop-item/shop-item.component';
import { ModalBacketComponent } from './components/modal-backet/modal-backet.component';




@NgModule({
  declarations: [ShopItemComponent, ModalBacketComponent],
  exports: [ShopItemComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule
  ],
  providers: [ApiBaseService]
})
export class SharedModule { }
