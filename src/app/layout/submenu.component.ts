import { Component, OnInit, AfterViewInit, NgZone, ElementRef } from '@angular/core';
import { Route, ActivatedRoute } from '@angular/router';

declare var jQuery: any;

@Component({
  selector: 'rb-submenu',
  template: `
  <ul class="links">
    <li *ngFor="let subRoute of subRoutes">
    <a [routerLink]="['/'.concat(route.path).concat('/').concat(subRoute.path)]">{{subRoute.data.label}}</a>
    </li>
  </ul>

  <input *ngFor="let subRoute of subRoutes" [routerLink]="['/'.concat(route.path).concat('/').concat(subRoute.path)]" class="special" type="button" [value]="subRoute.data.label">

  <!-- One -->
  <section *ngFor="let subRoute of subRoutes; let i = index;" class="tiles">
    <article>
      <span class="image">
										<img [src]="['../../assets/images/pic0' + ((i % 6) + 1) + '.jpg']" alt="" />
			</span>
      <header class="major">
        <h3><a [routerLink]="['/'.concat(route.path).concat('/').concat(subRoute.path)]" class="link">{{subRoute.data.label}}</a></h3>
      </header>
    </article>
  </section>

  <!-- Secondary router-outlet -->
  <router-outlet></router-outlet>
  `
})
export class SubMenuComponent implements OnInit, AfterViewInit {

  route: Route;
  subRoutes: Route[];
  colors: String[] = ['#6fc3df', '#8d82c4', '#ec8d81', '#e7b788', '#8ea9e8', '#87c5a4'];

  constructor(private activatedRoute: ActivatedRoute, private ngZone: NgZone, private el: ElementRef) { }

  ngOnInit() {
    this.route = this.activatedRoute.routeConfig;
    this.subRoutes = this.activatedRoute.routeConfig.children;
  }

  ngAfterViewInit() {

    this.ngZone.runOutsideAngular(() => {

      const $tiles = jQuery(this.el.nativeElement).find('.tiles > article');

      $tiles.each(function () {
        let $this = jQuery(this);
        let $image = $this.find('.image');
        let $img = $image.find('img');
        let $link = $this.find('.link');
        let x;

        // Set image.
        $this.css('background-image', 'url(' + jQuery($img).attr('src') + ')');

        // Set position.
        if (x = $img.data('position')) {
          $image.css('background-position', x);
        }


        // Hide original.
        $image.hide();

        // Link.
        if ($link.length > 0) {

          let $x = $link.clone()
            .text('')
            .addClass('primary')
            .appendTo($this);

          $link = $link.add($x);

          $link.on('click', function (event) {

            // Prevent default.
            event.stopPropagation();
            event.preventDefault();

            // Start transitioning.
            $this.addClass('is-transitioning');

          });

        }

      });
    });

  }

}
