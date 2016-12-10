import { Component} from "@angular/core";
import { GrowlMessageService } from '../../shared/service/core/growl-message.service';
import { AuthService } from "../../shared/service/core/auth.service";

@Component({
    selector: 'rb-logout',
    template: `<a *ngIf="isAuth()" (click)="onLogout()" style="cursor: pointer;" class="icon fa-power-off"></a>`
})
export class LogoutComponent {
    constructor(private authService: AuthService, private growlMessageService: GrowlMessageService) { }

    isAuth() {
        return this.authService.isAuthenticated();
    }

    onLogout() {
        this.authService.logout();
        this.growlMessageService.notifyError([{ severity: 'info', summary: 'Info Message', detail: 'Logout Sucess' }]);
    }
}
