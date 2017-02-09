import { Component } from '@angular/core';
import { GrowlMessageService } from '../../shared/service/core/growl-message.service';
import { SessionManager } from '../../shared/manager/core/session.manager';

@Component({
  selector: 'rb-logout',
  template: `<a *ngIf="isAuth()" (click)="onLogout()" style="cursor: pointer;" class="icon fa-power-off"></a>`
})
export class LogoutComponent {
  constructor(private sessionManager: SessionManager, private growlMessageService: GrowlMessageService) { }

  isAuth() {
    return this.sessionManager.isAuthenticated();
  }

  onLogout() {
    this.sessionManager.logout();
    this.growlMessageService.notifyError([{ severity: 'info', summary: 'Info Message', detail: 'Logout Sucess' }]);
  }
}
