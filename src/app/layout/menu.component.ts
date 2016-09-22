import { Component, ViewEncapsulation } from "@angular/core";

@Component({
    selector: 'rb-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss'],
    encapsulation: ViewEncapsulation.None,
    host: {class:'rb'}
})
export class MenuComponent {
}