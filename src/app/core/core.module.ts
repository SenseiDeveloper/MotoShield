import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreComponent } from './core.component';
import { HeaderComponent } from './header/header.component';
import { SubHeaderComponent } from './header/sub-header/sub-header.component';
import {NavComponent} from '../shared/components/nav/nav.component';



@NgModule({
  declarations: [
    CoreComponent,
    HeaderComponent,
    SubHeaderComponent,
    NavComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [CoreComponent]
})
export class CoreModule { }
