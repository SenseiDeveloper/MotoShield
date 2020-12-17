import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product.component';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { RouterModule} from '@angular/router';



@NgModule({
  declarations: [ProductComponent],
  imports: [
    CommonModule,
    ProductRoutingModule,
    NgxGalleryModule,
    RouterModule
  ]
})
export class ProductModule { }
