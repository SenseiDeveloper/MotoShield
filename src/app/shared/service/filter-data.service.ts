import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterDataService {

  category: string;
  sizeCategory: string;
  page: number;

  private subject = new Subject<any>();

  setFilterOption(category: string, sizeCategory: string, page: number) {
    this.category = category;
    this.sizeCategory = sizeCategory;
    this.page = page;

    const data = Object.assign({
      category: this.category,
      sizeCategory: this.sizeCategory,
      page: this.page
    });

    this.subject.next(data);
  }

  getFilterOption(): Observable<any> {
    return this.subject.asObservable();
  }

}
