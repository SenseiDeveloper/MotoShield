import {Component, OnDestroy, OnInit} from '@angular/core';
import {HomeProductModel} from '../../shared/model/home-product.model';
import {ProductsService} from '../../shared/service/products.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {CategoryModel} from '../../shared/model/category.model';
import {FilterDataService} from '../../shared/service/filter-data.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit, OnDestroy {

  unsubscribe: Subject<void> = new Subject<void>();
  listProducts: HomeProductModel[] = [];
  categoryOption: {};
  activeCategorySize: CategoryModel[];
  initPageCounter: number[];
  pageNumber: number;
  searchState: boolean;
  loader: boolean = true;

  constructor(
    private productsService: ProductsService,
    private filterDataService: FilterDataService
  ) { }

  ngOnInit(): void {
    this.initOption();
    this.initFilter();
    this.initProducts();
    this.initStylePage();
    this.initRouter();
  }

  initRouter(){
    window.scroll({
      top: 0,
      left: 0
    });
  }

  initStylePage(){
    this.pageNumber = Number(localStorage.getItem('page'));
  }
  initFilter() {
    this.filterDataService.getFilterOption()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe( (data: {}) => this.categoryOption = data);
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
    this.searchState = false;
    this.loader = false;
  }

  initOption() {
    if (!this.categoryOption){
      this.categoryOption = Object.assign({
        category: 'all',
        sizeCategory: 'all',
        page: 1
      });
    }
  }
  initProducts(){
    this.productsService.getFilterProducts(this.categoryOption)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(
        (products: HomeProductModel[]) => this.successInitProducts(products),
        error => console.log(error)
      );
  }

  searchText(event: HomeProductModel[]) {
    event.length === 0 ? this.initProducts() : this.listProducts = event; this.searchState = true;
  }

  newCategory() {
    this.initFilter();
    this.initProducts();
    this.pageNumber = 1;
  }

  sizeProducts() {
    this.initFilter();
    this.initProducts();
  }
  pageCounter(value: number){
    const array = Array.from(Array(value), (_, i) => i + 1);
    this.initPageCounter = array;
  }

  nextPage(event){
    this.pageNumber = event;
    localStorage.setItem('page', event);

    const category = localStorage.getItem('filterKey');
    const size = localStorage.getItem('filterSize');
    this.filterDataService.setFilterOption(category, size, event);
    this.initProducts();
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
  }
}
