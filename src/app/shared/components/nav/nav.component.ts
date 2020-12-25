import {Component, OnInit} from '@angular/core';
import {ModalBacketComponent} from '../modal-backet/modal-backet.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  hiddenState: boolean = false;

  constructor(
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  openMobileMenu() {
    this.hiddenState = !this.hiddenState;
  }

  closeModalMenu() {
    this.hiddenState = !this.hiddenState;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ModalBacketComponent, {
      width: '700px'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
