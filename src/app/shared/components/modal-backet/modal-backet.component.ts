import {Component, OnDestroy, OnInit} from '@angular/core';
import { Subject} from 'rxjs';
import {ProductsService} from '../../service/products.service';
import {takeUntil} from 'rxjs/operators';
import {HomeProductModel} from '../../model/home-product.model';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-modal-backet',
  templateUrl: './modal-backet.component.html',
  styleUrls: ['./modal-backet.component.scss']
})
export class ModalBacketComponent implements OnInit, OnDestroy {

  products: HomeProductModel[];
  unsubscribe: Subject<void> = new Subject<void>();

  constructor(
    private productService: ProductsService,
    private router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.initProducts();
  }

  initProducts() {
    const products = JSON.parse(localStorage.getItem('backet'));
    this.productService.getProductsForBasket(products)
    .pipe(takeUntil(this.unsubscribe))
      .subscribe(
        (products: HomeProductModel[]) => this.products = products,
        error => console.log(error)
      );
  }

  redirectProduct(id: string) {
    this.dialog.closeAll();
    this.router.navigate([`product/${id}`]);
  }

  removeProduct(id: string) {
    const checkBasket = JSON.parse(localStorage.getItem('backet'));
    const findElement = checkBasket.indexOf(id);
    checkBasket.splice(findElement,1);
    localStorage.setItem('backet', JSON.stringify(checkBasket));

    const newProducts = this.products.filter(el => el.id !== id);
    this.products = newProducts;
  }

  closeDialod() {
    this.dialog.closeAll();
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
  }
}
