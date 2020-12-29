import {Component, Input, OnInit} from '@angular/core';
import {ModalBacketComponent} from '../modal-backet/modal-backet.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-button-backet',
  templateUrl: './button-backet.component.html',
  styleUrls: ['./button-backet.component.scss']
})
export class ButtonBacketComponent implements OnInit {

  @Input() buttonName: string;
  @Input() productID: number;

  constructor(
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  addBacket() {
    const checkBasket = JSON.parse(localStorage.getItem('backet'));
    if (!checkBasket){
      localStorage.setItem('backet', JSON.stringify([this.productID]));
    } else {
      const findElement = checkBasket.find( el => el === this.productID);

      if (!findElement) {
        const newArray = checkBasket.concat([this.productID]);
        localStorage.setItem('backet', JSON.stringify(newArray));
      }
    }
    this.dialog.open(ModalBacketComponent, {
      panelClass: 'basket-modal',
      width: '80%'
    });
  }
}
