import {Component, OnDestroy, OnInit} from '@angular/core';
import {HomeProductModel} from '../../shared/model/home-product.model';
import {ProductsService} from '../../shared/service/products.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {CategoryModel} from '../../shared/model/category.model';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit, OnDestroy {

  unsubscribe: Subject<void> = new Subject<void>();
  listProducts: HomeProductModel[] = [];
  category: string;
  size: string;
  activeCategorySize: CategoryModel[];

  constructor(
    private productsService: ProductsService
  ) { }

  ngOnInit(): void {
    this.initFilter();
    this.initProducts();
  }

  initFilter() {
    localStorage.getItem('filterKey') === null ? this.category = 'all' : this.category = localStorage.getItem('filterKey');
    localStorage.getItem('filterSize') === null ? this.size = 'all' : this.size = localStorage.getItem('filterSize');
  }

  createObjectFilter() {
    return Object.assign({
      category: this.category,
      size: this.size
    });
  }

  createObjectSize(size: CategoryModel[]){
    const sizeValue = Object.entries(size);
    return sizeValue.map(([key, value]) => {
     return  Object.assign({
        name: key,
        filterSize: value
      });
    });
  }

  successInitProducts(products: HomeProductModel[]) {
    this.listProducts = products['products'];
    this.activeCategorySize = this.createObjectSize(products['size']);
  }

  initProducts() {
    this.productsService.getFilterProducts(this.createObjectFilter())
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(
        (products: HomeProductModel[]) => this.successInitProducts(products),
        error => console.log(error)
      );
  }

  newCategory(event: string) {
    this.category = event;
    localStorage.setItem('filterSize', 'all');
    this.size = 'all';
    this.initProducts();
  }

  sizeProducts(event: string) {
    this.size = event;
    this.initProducts();
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
  }
}
