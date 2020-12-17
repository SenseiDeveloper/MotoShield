import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {CategoryModel} from '../../../shared/model/category.model';
import {ProductsService} from '../../../shared/service/products.service';
import {take, takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit, OnDestroy {

  @Output() categoryEvent = new EventEmitter();
  @Output() sizeEvent = new EventEmitter();

  unsubscribe: Subject<void> = new Subject<void>();
  activeItem: string;
  activeSizeItem: string;
  categoryCounter: CategoryModel[];
  @Input() sizeCounter: CategoryModel[];

  category: CategoryModel[] = [
    {
      name: 'Весь товар',
      filterKey: 'all'
    },
    {
      name: 'Мотошлемы',
      filterKey: 'helm'
    },
    {
      name: 'Мотоодежда',
      filterKey: 'clothing'
    },
    {
      name: 'Мотоперчатки',
      filterKey: 'glove'
    },
    {
      name: 'Мотоботы',
      filterKey: 'boot'
    }
  ];

  constructor(
    private productsService: ProductsService
  ) { }

  ngOnInit(): void {
    this.initStyleCategory();
    this.initCountCategory();
  }

  initStyleCategory() {
    this.activeItem = localStorage.getItem('filterKey');
  }

  initCountCategory() {
    this.productsService.getCountCategoryProducts()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(
        (products: []) => this.categoryCounter = products,
        error => console.log(error)
      );
  }

  filterCategory(event: CategoryModel) {
    this.activeItem = event.filterKey;
    localStorage.setItem('filterKey', event.filterKey);
    this.categoryEvent.emit(event.filterKey);
    this.activeSizeItem = '';
  }

  filterSize(event: CategoryModel) {
    this.activeSizeItem = event.name;
    localStorage.setItem('filterSize', event.name);
    this.sizeEvent.emit(event.name);
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
  }
}
