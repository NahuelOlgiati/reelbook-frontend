import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs/Rx";
import { AuthService } from "./auth.service";
import { GrowlMessageService } from '../../shared/growl-message/growl-message.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private growlMessageService: GrowlMessageService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    let isAuthenticated = this.authService.isAuthenticated();
    if (!isAuthenticated){
      this.growlMessageService.notifyError([{ severity: 'error', summary: 'Error Message', detail: 'Must Signin' }]);
    }
    return isAuthenticated;
  }
}
