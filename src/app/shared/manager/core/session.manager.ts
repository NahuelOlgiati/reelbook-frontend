import { Injectable, EventEmitter } from '@angular/core';
import { ModelResponse } from '../../model/core/model-response';
import { User } from '../../model/user';
import { Session } from '../../model/session';
import { SessionService } from '../../service/core/session.service';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class SessionManager {

  private user: User;
  public userChanged = new EventEmitter<User>();
  public sessionChanged = new EventEmitter<Session>();

  constructor(private sessionService: SessionService) { }

  authenticate(session: Session): void {
    localStorage.setItem('token', session.token);
    this.setUser(session.user);
    this.sessionChanged.emit(session);
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
    this.sessionChanged.emit(undefined);
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