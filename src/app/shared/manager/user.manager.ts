import { Injectable, EventEmitter } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from "@angular/http";
import { User } from '../../shared/model/user';
import { ModelResponse } from '../../shared/model/core/model-response';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class UserManager {

  private users: User[];
  public usersChanged = new EventEmitter<User[]>();

  constructor() { }

  getList(): User[] {
    return this.users;
  }

  setList(list: User[]): void {
    this.users = list;
  }
}