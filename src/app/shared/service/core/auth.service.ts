import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Observable } from 'rxjs/Observable';
import { Router } from "@angular/router";
import { User } from "../../model/user";
import { ModelResponse } from "../../model/core/model-response";
import { Session } from "../../model/session";
import 'rxjs/Rx';

@Injectable()
export class AuthService {

    private headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    private options = new RequestOptions({ headers: this.headers });

    constructor(private http: Http, private router: Router) { }

    signupUser(user: User): Observable<ModelResponse<User>> {
        const body = 'email=' + user.email + '&userName=' + user.userName + '&firstName=' + user.firstName + '&lastName=' + user.lastName + '&password=' + user.password;
        return this.http.post('/rest/authentication/signup', body, this.options)
            .map((res: ModelResponse<User>) => {console.log(res);
             return res.json()});
    }

    signinUser(user: User): Observable<ModelResponse<Session>> {
        const body = 'userName=' + user.userName + '&password=' + user.password;
        return this.http.post('/rest/authentication/signin', body, this.options)
            .map((res: ModelResponse<Session>) => res.json());
    }
}
