import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Observable } from 'rxjs/Observable';
import { Router } from "@angular/router";
import 'rxjs/Rx';
import { User } from "../../model/user";

@Injectable()
export class AuthService {

    private BASE_URL = 'http://localhost:8080/rest';
    private headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    private options = new RequestOptions({ headers: this.headers });

    constructor(private http: Http, private router: Router) { }

    signupUser(user: User) {
        const body = 'email=' + user.email + '&userName=' + user.userName + '&password=' + user.password;
        return this.http.post(this.BASE_URL + '/authentication/signup', body, this.options)
            .map((res: Response) => res.json())
            .catch(error => {
                console.log('Falló signupUser Mapeo');
                console.log(error);
                return Observable.throw(error.json());
            });
    }

    signinUser(user: User) {
        const body = 'userName=' + user.userName + '&password=' + user.password;
        return this.http.post(this.BASE_URL + '/authentication/signin', body, this.options)
            .map(res => res.json())
            .catch(error => {
                console.log('Falló signinUser Mapeo');
                return Observable.throw(error.json());
            });
    }
}
