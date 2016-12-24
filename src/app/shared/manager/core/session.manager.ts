import { Injectable, EventEmitter } from '@angular/core';
import { ModelResponse } from '../../model/core/model-response';
import { User } from '../../model/user';
import { Session } from '../../model/session';
import { SessionService } from '../../service/core/session.service';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

@Injectable()
export class SessionManager {

  private session: Session;
  public sessionChanged = new EventEmitter<Session>();

  private user: User;
  public userChanged = new EventEmitter<User>();

  constructor(private sessionService: SessionService) { }

  authenticate(session: Session): void {
    localStorage.setItem('token', session.token);
    this.setUser(session.user);
    this.setSession(session)
  }

  fetchSession(): void {
    this.sessionService.getSession()
      .map((res: ModelResponse<Session>) => {
        this.setSession(res.model)
      }
      ).subscribe();
  }

  fetchUser(): void {
    this.sessionService.getUser()
      .map((res: ModelResponse<User>) => {
        this.setUser(res.model);
      }
      ).subscribe();
  }

  refreshUser(): void {
    this.sessionService.refreshUser()
      .map((res: ModelResponse<User>) => {
        this.setUser(res.model);
      }
      ).subscribe();
  }

  logout(): void {
    localStorage.removeItem('token');
    this.setSession(undefined);
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

  getSession(): Session {
    return this.session;
  }

  setSession(session: Session): void {
    this.session = session;
    this.sessionChanged.emit(session);
    if (session) {
      this.userChanged.emit(session.user);
    }else {
      this.userChanged.emit(undefined);
    }
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

  getFullName(): string {
    if (this.user) {
      return this.user.firstName + ' ' + this.user.lastName;
    } else {
      return '';
    }
  }
}