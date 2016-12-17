import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { SessionManager } from "../shared/manager/core/session.manager";
import { User } from '../shared/model/user';
import { SelectItem } from 'primeng/primeng';
import { environment } from '../../environments/environment';

@Component({
    selector: 'rb-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class MenuComponent implements OnInit{

    cities: SelectItem[];
    selectedCity: string;
    userName : string;
    environmentName = environment.envName;

    constructor(private sessionManager: SessionManager) {
        this.cities = [];
        this.cities.push({ label: 'Artista', value: 'ARTIST' });
        this.cities.push({ label: 'Productora', value: 'PRODUCER' });
        this.selectedCity = 'ARTIST';
        this.userName = this.sessionManager.getUserName();
    }

    ngOnInit() {
        this.sessionManager.userChanged.subscribe((user: User) => {
            this.userName = this.sessionManager.getUserName();
        });
    }

    isAuth() {
        return this.sessionManager.isAuthenticated();
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