import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreComponent } from './core.component';
import { HeaderComponent } from './header/header.component';
import {NavComponent} from '../shared/components/nav/nav.component';
import {CoreRoutingModule} from './core-routing.module';
import {SharedModule} from '../shared/shared.module';
import { FooterComponent } from './footer/footer.component';



@NgModule({
  declarations: [
    CoreComponent,
    HeaderComponent,
    NavComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    CoreRoutingModule,
    SharedModule
  ],
  exports: [CoreComponent]
})
export class CoreModule { }
