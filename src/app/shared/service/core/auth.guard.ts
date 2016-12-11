import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs/Rx";
import { SessionManager } from "../../manager/core/session.manager";
import { GrowlMessageService } from './growl-message.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private sessionManager: SessionManager, private growlMessageService: GrowlMessageService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    let isAuthenticated = this.sessionManager.isAuthenticated();
    if (!isAuthenticated) {
      this.growlMessageService.notifyError([{ severity: 'error', summary: 'Error Message', detail: 'Must Signin' }]);
    }
    return isAuthenticated;
  }
}