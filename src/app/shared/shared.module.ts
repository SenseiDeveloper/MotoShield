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
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoaderComponent} from './components/loader/loader.component';





@NgModule({
  declarations: [ShopItemComponent, ModalBacketComponent, CallbackModalComponent, ButtonBacketComponent, ButtonCallbackComponent, LoaderComponent],
  exports: [ShopItemComponent, CallbackModalComponent, ButtonBacketComponent, ButtonCallbackComponent, LoaderComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    MatDialogModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [ApiBaseService]
})
export class SharedModule { }
