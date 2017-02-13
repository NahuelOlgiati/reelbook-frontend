import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import 'rxjs/Rx';

@Injectable()
export class AuthService {

  private headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
  private options = new RequestOptions({ headers: this.headers });

  constructor(private http: Http, private router: Router) { }

  signupUser(user: M.User): Observable<M.ModelResponse<M.User>> {
    const body = 'email=' + user.email + '&userName=' + user.userName + '&firstName=' + user.firstName + '&lastName=' + user.lastName + '&password=' + user.password;
    return this.http.post('/rest/authentication/signup', body, this.options)
      .map((res: Response) => res.json());
  }

  signinUser(user: M.User): Observable<M.ModelResponse<M.RestSession>> {
    const body = 'userName=' + user.userName + '&password=' + user.password;
    return this.http.post('/rest/authentication/signin', body, this.options)
      .map((res: Response) => res.json());
  }
}
