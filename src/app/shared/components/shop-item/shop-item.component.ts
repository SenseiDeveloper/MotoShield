import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-shop-item',
  templateUrl: './shop-item.component.html',
  styleUrls: ['./shop-item.component.scss']
})
export class ShopItemComponent implements OnInit {

  @Input() listProduct;

  constructor() { }

  ngOnInit(): void {
    this.getDateForProduct();
  }

  getDateForProduct() {
    let dateNow = new Date();
    let dateProduct = new Date(this.listProduct.data);
    let timeDiff = Math.abs(dateNow.getTime() - dateProduct.getTime());
    let diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return diffDays;
  }
}
