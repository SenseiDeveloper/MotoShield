import { Injectable } from '@angular/core';
import {ApiBaseService} from '../API/api-base.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {HomeProductModel} from '../model/home-product.model';
import {ProductModel} from '../model/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService extends ApiBaseService{

  constructor( public http: HttpClient ) {
    super(http);
  }

  getNewProducts(): Observable<HomeProductModel[]> {
    return this.get('new-products');
  }

  getAllProducts(): Observable<HomeProductModel[]> {
    return this.get('products');
  }

  getFilterProducts(filter: {}): Observable<HomeProductModel[]> {
    return  this.post('filter-products', filter);
  }

  getCountCategoryProducts(): Observable<[]> {
    return this.get('products-counter');
  }

  getProductByID(id: string): Observable<ProductModel[]> {
    return this.get(`products/${id}`);
  }
}
