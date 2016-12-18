import { Injectable, EventEmitter } from '@angular/core';
import { User } from '../../model/user';
import { ModelResponse } from '../../model/core/model-response';
import { SessionService } from '../../service/core/session.service';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class SessionManager {

  private user: User;
  public userChanged = new EventEmitter<User>();
  public tokenChanged = new EventEmitter<string>();

  constructor(private sessionService: SessionService) { }

  authenticate(token: string): void {
    this.saveToken(token);
    this.fetchUser();
  }

  saveToken(token: string): void {
    localStorage.setItem('token', token);
    this.tokenChanged.emit(localStorage.getItem('token'))
  }

  fetchUser(): void {
    this.sessionService.getUser()
      .map((res: ModelResponse<User>) => {
        this.setUser(res.model);
      }
      ).subscribe();
  }

  logout(): void {
    localStorage.removeItem('token');
    this.setUser(undefined);
    this.tokenChanged.emit(localStorage.getItem('token'))
  }

  isAuthenticated(): boolean {
    let isAuth: boolean;
    if (localStorage.getItem('token')) {
      isAuth = true;
    } else {
      isAuth = false;
    }
    return isAuth;
  }

  getUser(): User {
    return this.user;
  }

  setUser(user: User): void {
    this.user = user;
    this.userChanged.emit(user);
  }

  getUserName(): string {
    if (this.user) {
      return this.user.userName;
    } else {
      return '';
    }
  }
}