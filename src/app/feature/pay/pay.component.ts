import {Component, OnDestroy, OnInit} from '@angular/core';
import {takeUntil} from 'rxjs/operators';
import {HomeProductModel} from '../../shared/model/home-product.model';
import {Subject} from 'rxjs';
import {ProductsService} from '../../shared/service/products.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.scss']
})
export class PayComponent implements OnInit, OnDestroy {

  unsubscribe: Subject<void> = new Subject<void>();
  products: HomeProductModel[];

  constructor(
    private productService: ProductsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initProducts();
  }

  initProducts() {
    const products = JSON.parse(localStorage.getItem('backet'));
    this.productService.getProductsForBasket(products)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(
        ( products: HomeProductModel[] ) => this.products = products,
        error => console.log(error)
      );
  }

  redirectProduct(id: string) {
    this.router.navigate([`product/${id}`]);
  }

  removeProduct(id: string) {
    const checkBasket = JSON.parse(localStorage.getItem('backet'));
    const findElement = checkBasket.indexOf(id);
    checkBasket.splice(findElement,1);
    localStorage.setItem('backet', JSON.stringify(checkBasket));

    const newProducts = this.products.filter(el => el._id !== id);
    this.products = newProducts;
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
  }

}
