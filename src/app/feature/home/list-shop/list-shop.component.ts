import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {ProductsService} from '../../../shared/service/products.service';
import {takeUntil} from 'rxjs/operators';
import {HomeProductModel} from '../../../shared/model/home-product.model';
import {Router} from '@angular/router';
import {FilterDataService} from '../../../shared/service/filter-data.service';

@Component({
  selector: 'app-list-shop',
  templateUrl: './list-shop.component.html',
  styleUrls: ['./list-shop.component.scss']
})
export class ListShopComponent implements OnInit, OnDestroy {

  unsubscribe: Subject<void> = new Subject<void>();
  listProducts: HomeProductModel[] = [];

  constructor(
    private productsService: ProductsService,
    private router: Router,
    private filterDataService: FilterDataService
  ) { }

  ngOnInit(): void {
    this.initNewProducts();
  }

  initNewProducts() {
    this.productsService.getNewProducts()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(
        (products: HomeProductModel[]) => this.listProducts = products,
        error => console.log(error)
      );
  }

  selectCategory(event: string){
    this.router.navigate(['shop']);
    localStorage.setItem('filterKey', event);
    localStorage.setItem('page', '1');
    this.filterDataService.setFilterOption(event,'all',1);
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
  }
}
