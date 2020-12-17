import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {ApiBaseService} from './API/api-base.service';
import { ShopItemComponent } from './components/shop-item/shop-item.component';
import { ModalBacketComponent } from './components/modal-backet/modal-backet.component';
import { CallbackModalComponent } from './components/callback-modal/callback-modal.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';




@NgModule({
  declarations: [ShopItemComponent, ModalBacketComponent, CallbackModalComponent],
  exports: [ShopItemComponent, CallbackModalComponent ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    MatDialogModule,
    MatInputModule
  ],
  providers: [ApiBaseService]
})
export class SharedModule { }
