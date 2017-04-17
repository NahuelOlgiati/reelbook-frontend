import { Component, OnInit } from '@angular/core';
import { Route, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'rb-submenu',
  template: `
  <ul class="links">
    <li *ngFor="let subRoute of subRoutes">
    <a [routerLink]="['/'.concat(route.path).concat('/').concat(subRoute.path)]">{{subRoute.data.label}}</a>
    </li>
  </ul>

  <input *ngFor="let subRoute of subRoutes" [routerLink]="['/'.concat(route.path).concat('/').concat(subRoute.path)]" class="special" type="button" [value]="subRoute.data.label">

  <!-- Secondary router-outlet -->
  <router-outlet></router-outlet>
  `,
})
export class SubMenuComponent implements OnInit {

  route: Route;
  subRoutes: Route[];

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.route = this.activatedRoute.routeConfig;
    this.subRoutes = this.activatedRoute.routeConfig.children;
  }
}
