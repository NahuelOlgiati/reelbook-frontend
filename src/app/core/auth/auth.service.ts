import { Injectable } from "@angular/core";
import { Http, Response, Headers } from "@angular/http";
import { Observable } from 'rxjs/Observable';
import { Router } from "@angular/router";
import { Subject } from "rxjs/Subject";
import 'rxjs/Rx';

import { User } from "../../shared/model/user";

@Injectable()
export class AuthService {

  // for change the navbar state between online and offline
  private authenticate = new Subject<boolean>();
  authenticateState$ = this.authenticate.asObservable();

  constructor(private http: Http, private router: Router) { }

  signupUser(user: User) {
    console.log('Entrando Serv signupUser');
    const body = 'email=' + user.email + '&username=' + user.username + '&password=' + user.password;
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.post('http://localhost:8080/rest/authentication/signup', body, {
      headers: headers
    })
      .map((res: Response) => res.json())
      .catch(error => {
        console.log('Falló signupUser Mapeo');
        console.log(error);
        return Observable.throw(error.json());
      });
  }

  signinUser(user: User) {
    console.log('Entrando Serv signinUser');
    const body = 'username=' + user.username + '&password=' + user.password;
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.post('http://localhost:8080/rest/authentication/signin', body, {
      headers: headers
    })
      .map(res => res.json())
      .catch(error => {
        console.log('Falló signinUser Mapeo');
        return Observable.throw(error.json());
      });
  }

  // delete the token in localStorage and change the navbar state
  logout(): void {
    localStorage.removeItem('token');
    this.authenticate.next(false);
  }

  // save the token in localStorage and change the navbar state
  saveToken(token: string): void {
    console.log('saveToken:' + token);
    localStorage.setItem('token', token);
    this.authenticate.next(true);
  }

  // return if the user is authenticate
  isAuthenticated(): boolean {
    let isAuth: boolean;
    if (localStorage.getItem('token')) {
      isAuth = true;
    } else {
      isAuth = false;
    }
    //console.log('Is Authenticated:' + isAuth);
    return isAuth;
  }
}
