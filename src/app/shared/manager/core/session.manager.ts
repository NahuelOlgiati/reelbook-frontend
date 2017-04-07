import { RestSession, User, ModelResponse, RestSessionService } from '../../../app.backend';
import { Injectable, EventEmitter } from '@angular/core';
import { Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

@Injectable()
export class SessionManager {

  private session: RestSession;
  public sessionChanged = new EventEmitter<RestSession>();

  private user: User;
  public userChanged = new EventEmitter<User>();

  constructor(private restSessionService: RestSessionService) { }

  authenticate(session: RestSession): void {
    localStorage.setItem('token', session.token);
    this.setUser(session.user);
    this.setSession(session);
  }

  fetchSession(): void {
    this.restSessionService.getSession()
      .map((res: Response) => res.json())
      .map((res: ModelResponse<RestSession>) => this.setSession(res.model)).subscribe();
  }

  fetchUser(): void {
    this.restSessionService.getUser({ 'token': localStorage.getItem('token') })
      .map((res: Response) => res.json())
      .map((res: ModelResponse<User>) => {
        this.setUser(res.model);
      }
      ).subscribe();
  }

  refreshUser(): void {
    this.restSessionService.refreshUser({ 'token': localStorage.getItem('token') })
      .map((res: Response) => res.json())
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

  getSession(): RestSession {
    return this.session;
  }

  setSession(session: RestSession): void {
    // TODO localstorage
    this.session = session;
    this.sessionChanged.emit(session);
    if (session) {
      this.userChanged.emit(session.user);
    } else {
      this.userChanged.emit(undefined);
    }
  }

  getUser(): User {
    if (this.user) {
      return this.user;
    } else {
      return JSON.parse(localStorage.getItem('user'));
    }
  }

  setUser(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
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
