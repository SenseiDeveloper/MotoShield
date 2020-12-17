import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-shop-item',
  templateUrl: './shop-item.component.html',
  styleUrls: ['./shop-item.component.scss']
})
export class ShopItemComponent implements OnInit {

  @Input() listProduct;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getDateForProduct();
  }

  getDateForProduct() {
    const dateNow = new Date();
    const dateProduct = new Date(this.listProduct.data);
    const timeDiff = Math.abs(dateNow.getTime() - dateProduct.getTime());
    const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return diffDays;
  }

 redirectSelectProduct(e){
    this.router.navigate([`product/${e}`]);
 }
}
