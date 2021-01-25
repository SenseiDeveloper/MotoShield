import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthComponent} from './auth/auth.component';
import {SystemComponent} from './system/system.component';
import {PanelComponent} from './panel.component';


const routes: Routes = [
  { path: '', component: PanelComponent, children: [
      {path: 'auth', component: AuthComponent},
      {path: 'system', component: SystemComponent}
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PanelRoutingModule { }
