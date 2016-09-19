import { Component} from "@angular/core";
import { GrowlMessageService } from '../../shared/growl-message/growl-message.service';
import { Router } from '@angular/router';
import { AuthService } from "./auth.service";

@Component({
    selector: 'rb-logout',
    template: `
        <ul class="nav navbar-nav navbar-right">
            <li><a *ngIf="isAuth()" (click)="onLogout()" style="cursor: pointer;">Logout</a></li>
        </ul>`
})
export class LogoutComponent {
    constructor(private router : Router, private authService: AuthService, private growlMessageService: GrowlMessageService) { }

    isAuth() {
        return this.authService.isAuthenticated();
    }

    onLogout() {
        this.authService.logout();
        this.router.navigate(['signin']);
        this.growlMessageService.notifyError([{ severity: 'info', summary: 'Info Message', detail: 'Logout Sucess' }]);
    }
}
