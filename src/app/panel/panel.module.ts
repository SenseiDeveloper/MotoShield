import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PanelRoutingModule } from './panel-routing.module';
import { AuthComponent } from './auth/auth.component';
import { SystemComponent } from './system/system.component';
import { PanelComponent } from './panel.component';
import {RouterModule} from '@angular/router';


@NgModule({
  declarations: [AuthComponent, SystemComponent, PanelComponent],
  imports: [
    CommonModule,
    PanelRoutingModule,
    RouterModule
  ]
})
export class PanelModule { }
