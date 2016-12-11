import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from "@angular/http";
import { User } from '../../../shared/model/user';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class SessionService {

  private BASE_URL = 'http://localhost:8080/rest';
  private headers = new Headers({ 'Content-Type': 'application/json' });
  private options = new RequestOptions({ headers: this.headers });

  constructor(private http: Http) { }

  getUser(): Observable<User> {
    const body = 'token=' + localStorage.getItem('token');
    return this.http.post(this.BASE_URL + '/session/user', body, this.headers)
      .map((response: Response) => response.json());
  }
}