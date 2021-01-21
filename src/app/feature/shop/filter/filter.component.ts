import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {CategoryModel} from '../../../shared/model/category.model';
import {ProductsService} from '../../../shared/service/products.service';
import { takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {ThemePalette} from '@angular/material/core';
import {FilterDataService} from '../../../shared/service/filter-data.service';

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
  @Output() pageCounter = new EventEmitter<number>();

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
    private productsService: ProductsService,
    private filterDataService: FilterDataService
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

  scroll() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  initStyleCategory() {
    this.activeItem = localStorage.getItem('filterKey');
  }

  initCountCategory() {
    this.productsService.getCountCategoryProducts()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(
        (products: []) => {
          this.categoryCounter = products;
          this.pageCount();
        },
        error => console.log(error)
      );
  }

  filterCategory(event: CategoryModel){
    this.filterDataService.setFilterOption(event.filterKey,'all', 1 );
    this.categoryEvent.emit();
    this.pageCount();

    this.activeItem = event.filterKey;
    this.activeSizeItem = 'all';
    localStorage.setItem('filterKey', event.filterKey);
    localStorage.setItem('filterSize', 'all');
  }

  filterSize(event: CategoryModel){
    const category = localStorage.getItem('filterKey');
    this.filterDataService.setFilterOption(category, event.name, 1 );
    this.sizeEvent.emit();
    this.pageCountSize( Number(event.filterSize));

    this.activeSizeItem = event.name;
    localStorage.setItem('filterSize', event.name);
  }

  pageCount() {
    if (this.categoryCounter) {
      const filter = localStorage.getItem('filterKey');
      const pageCounter = Math.round((this.categoryCounter[filter]) / 8 );
      pageCounter !== 0 ? this.pageCounter.emit(pageCounter) : this.pageCounter.emit(1);
    }
  }

  pageCountSize(event: number) {
    const pageCounter = Math.round(event / 8 );
    pageCounter !== 0 ? this.pageCounter.emit(pageCounter) : this.pageCounter.emit(1);
  }

  filterStates() {
    this.filterState = !this.filterState;
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
  }
}
