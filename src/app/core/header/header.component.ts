import { Component, OnInit } from '@angular/core';
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
       width: '90%',
       height: 'auto'
    });
  }
}
