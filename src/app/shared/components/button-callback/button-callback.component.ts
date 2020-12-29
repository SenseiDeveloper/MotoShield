import {Component, Input, OnInit} from '@angular/core';
import {CallbackModalComponent} from '../callback-modal/callback-modal.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-button-callback',
  templateUrl: './button-callback.component.html',
  styleUrls: ['./button-callback.component.scss']
})
export class ButtonCallbackComponent implements OnInit {

  @Input() btnText: string;

  constructor(
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  openDialog(): void {
    this.dialog.open(CallbackModalComponent, {
      panelClass: 'callback-modal'
    });
  }
}
