import { Injectable } from '@angular/core';
import {ApiBaseService} from '../API/api-base.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {MailModel} from '../model/mail.model';

@Injectable({
  providedIn: 'root'
})
export class MailService extends ApiBaseService {

  constructor( public http: HttpClient ) {
    super(http);
  }

  sendCallback( value: MailModel[]): Observable<string> {
    return this.post('callback-mail', value);
  }

}
