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
import { ButtonBacketComponent } from './components/button-backet/button-backet.component';
import { ButtonCallbackComponent } from './components/button-callback/button-callback.component';
import {MailService} from './service/mail.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';




@NgModule({
  declarations: [ShopItemComponent, ModalBacketComponent, CallbackModalComponent, ButtonBacketComponent, ButtonCallbackComponent],
  exports: [ShopItemComponent, CallbackModalComponent, ButtonBacketComponent, ButtonCallbackComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    MatDialogModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [ApiBaseService, MailService]
})
export class SharedModule { }
