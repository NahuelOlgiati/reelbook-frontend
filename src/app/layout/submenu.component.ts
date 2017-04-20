import { Component, OnInit, ElementRef } from '@angular/core';
import { Route, ActivatedRoute } from '@angular/router';

declare var jQuery: any;

@Component({
  selector: 'rb-submenu',
  template: `

  <section class="tiles">
    <article *ngFor="let subRoute of subRoutes; let i = index;" [style.background-image]="'url(../../assets/images/pic0' + (((i + random) % 6) + 1) + '.jpg)'">
      <header class="major">
        <h3><a [routerLink]="['/'.concat(route.path).concat('/').concat(subRoute.path)]" class="link">{{subRoute.data.label}}</a></h3>
      </header>
    </article>
  </section>

  <!-- Secondary router-outlet -->
  <router-outlet></router-outlet>
  `
})
export class SubMenuComponent implements OnInit {

  random: number;
  route: Route;
  subRoutes: Route[];

  constructor(private activatedRoute: ActivatedRoute, private el: ElementRef) { }

  ngOnInit() {
    this.random = this.getRandomInt(1, 5);
    this.route = this.activatedRoute.routeConfig;
    this.subRoutes = this.activatedRoute.routeConfig.children;
  }

  getRandomInt(min, max): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
