import {Component, OnDestroy, OnInit} from '@angular/core';
import {HomeProductModel} from '../../shared/model/home-product.model';
import {ProductsService} from '../../shared/service/products.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit, OnDestroy {

  unsubscribe: Subject<void> = new Subject<void>();
  listProducts: HomeProductModel[] = [];

  constructor(
    private productsService: ProductsService
  ) { }

  ngOnInit(): void {
    this.initNewProducts();
  }

  initNewProducts() {
    this.productsService.getAllProducts()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(
        (products: HomeProductModel[]) => this.listProducts = products,
        error => console.log(error)
      );
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
  }
}
