import { Injectable, EventEmitter } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from "@angular/http";
import { User } from '../../shared/model/user';
import { ModelResponse } from '../../shared/model/core/model-response';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class UserManager {

  private user: User;
  public userChanged = new EventEmitter<User>();

  constructor() { }

  fetch(): User {
    return this.user;
  }

  get(): User {
    return this.user;
  }

  set(user: User): void {
    this.user = user;
    this.userChanged.emit(user);
  }
}