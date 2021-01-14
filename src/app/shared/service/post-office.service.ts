import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostOfficeService {

  readonly  apiUrl = 'https://api.novaposhta.ua/v2.0/json/';
  readonly apiKey = '2355c03a686db96468827488036ff525';

  constructor(public http: HttpClient) { }

  getAddres(data: string): Observable<any> {
    return this.http.post(this.apiUrl,{
      apiKey: this.apiKey,
      modelName: 'Address',
      calledMethod: 'searchSettlements',
      methodProperties: {
        CityName: data,
        Limit: 10
      }
    });
  }

  getDepartment(data: string): Observable<any>{
    return this.http.post(this.apiUrl,{
      modelName: 'AddressGeneral',
      calledMethod: 'getWarehouses',
      methodProperties: {
        Language: 'ru',
        SettlementRef: data
      },
      apiKey: this.apiKey
    });
  }

  getStreet(data: string, dataRef: string): Observable<any>{
    return this.http.post(this.apiUrl,{
      apiKey: this.apiKey,
      modelName: 'Address',
      calledMethod: 'searchSettlementStreets',
      methodProperties: {
        StreetName: data,
        SettlementRef: dataRef,
        Limit: 5
      }
    });
  }
}
