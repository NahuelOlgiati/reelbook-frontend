import { Component, ViewEncapsulation } from "@angular/core";
import { AuthService } from "../shared/service/core/auth.service";
import { SelectItem } from 'primeng/primeng';

@Component({
    selector: 'rb-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class MenuComponent {

    cities: SelectItem[];
    selectedCity: string;

    constructor(private authService: AuthService) {
        this.cities = [];
        this.cities.push({ label: 'Artista', value: 'ARTIST' });
        this.cities.push({ label: 'Productora', value: 'PRODUCER' });
        this.selectedCity = 'ARTIST';
    }

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