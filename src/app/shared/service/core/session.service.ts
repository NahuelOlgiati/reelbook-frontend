import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class SessionService {

  private headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
  private options = new RequestOptions({ headers: this.headers });

  constructor(private http: Http) { }

  getSession(): Observable<M.ModelResponse<M.RestSession>> {
    return this.http.get('/rest/session')
      .map((response: Response) => response.json());
  }

  getUser(): Observable<M.ModelResponse<M.User>> {
    const body = 'token=' + localStorage.getItem('token');
    return this.http.post('/rest/session/user', body, this.options)
      .map((res: Response) => res.json());
  }

  refreshUser(): Observable<M.ModelResponse<M.User>> {
    const body = 'token=' + localStorage.getItem('token');
    return this.http.post('/rest/session/refreshuser', body, this.options)
      .map((res: Response) => res.json());
  }
}