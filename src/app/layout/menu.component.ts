import { Component, ViewEncapsulation } from "@angular/core";
import { AuthService } from "../core/auth/auth.service";

@Component({
    selector: 'rb-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class MenuComponent {

    constructor(private authService: AuthService) { }

    isAuth() {
        return this.authService.isAuthenticated();
    }
    
    public avatarDataSquare: any = {
        size: 40,
        background: '#F39C12', // by default it will produce dynamic colors
        fontColor: '#FFFFFF',
        border: "2px solid #d3d3d3",
        isSquare: true,
        text: "Rajan Gunasekaran"
    };
}