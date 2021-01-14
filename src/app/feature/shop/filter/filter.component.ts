import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {CategoryModel} from '../../../shared/model/category.model';
import {ProductsService} from '../../../shared/service/products.service';
import { takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {ThemePalette} from '@angular/material/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit, OnDestroy {

  @Output() categoryEvent = new EventEmitter();
  @Output() sizeEvent = new EventEmitter();
  @Input() sizeCounter: CategoryModel[];

  unsubscribe: Subject<void> = new Subject<void>();
  activeItem: string;
  activeSizeItem: string;
  categoryCounter: CategoryModel[];
  color: ThemePalette = 'primary';
  filterState: boolean = true;

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
    this.stateFilter();
  }
  stateFilter(){
    if (window.innerWidth < 768 ) {
      this.filterState = !this.filterState;
    }
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

  filterStates() {
    this.filterState = !this.filterState;
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
  }
}
