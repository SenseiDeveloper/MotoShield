import { Component, OnInit } from '@angular/core';
import {CallbackModalComponent} from '../../shared/components/callback-modal/callback-modal.component';
import {MatDialog} from '@angular/material/dialog';
import {ModalBacketComponent} from '../../shared/components/modal-backet/modal-backet.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  openDialog(): void {
     this.dialog.open(ModalBacketComponent, {
       panelClass: 'basket-modal',
       width: '80%'
    });
  }
}
