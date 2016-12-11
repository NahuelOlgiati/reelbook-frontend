import { Injectable, EventEmitter } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from "@angular/http";
import { User } from '../../model/user';
import { ModelResponse } from '../../model/core/model-response';
import { SessionService } from '../../service/core/session.service';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class SessionManager {

  private user: User;
  public userChanged = new EventEmitter<User>();

  constructor(private sessionService: SessionService) { }

  fetch(): void {
    this.sessionService.getUser()
      .map((res: ModelResponse<User>) => {
        this.setUser(res.model);
      }
      ).subscribe();
  }

  getUser(): User {
    return this.user;
  }

  setUser(user: User): void {
    this.user = user;
    this.userChanged.emit(user);
  }

  getUserName(): string {
    if(this.user){
      return this.user.userName;
    }else {
      return '';
    }
  }
}