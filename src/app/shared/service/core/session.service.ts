import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from "@angular/http";
import { User } from '../../model/user';
import { ModelResponse } from '../../model/core/model-response';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class SessionService {

  private headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
  private options = new RequestOptions({ headers: this.headers });

  constructor(private http: Http) { }

  getUser(): Observable<ModelResponse<User>> {
    const body = 'token=' + localStorage.getItem('token');
    return this.http.post('/rest/session/user', body, this.options)
      .map((res: ModelResponse<User>) => res.json());
  }

  refreshUser(): Observable<ModelResponse<User>> {
    const body = 'token=' + localStorage.getItem('token');
    return this.http.post('/rest/session/refreshuser', body, this.options)
      .map((res: ModelResponse<User>) => res.json());
  }
}