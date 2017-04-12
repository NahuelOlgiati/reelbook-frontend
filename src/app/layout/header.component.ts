import { Component } from '@angular/core';

@Component({
  selector: 'rb-header',
  template: `
<header id="header" class="alt">
  <a [routerLink]="['home']" class="logo"><strong>Reelbook</strong> <span>by Olgiati</span></a>
  <nav>
    <rb-logout></rb-logout>
    <a href="#menu">Menu</a>
  </nav>
</header>
  `,
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
}
