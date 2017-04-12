import { Component } from '@angular/core';

@Component({
  selector: 'rb-body',
  template: `
<!-- Submenu -->
<rb-submenu></rb-submenu>

<!-- router-outlet -->
<router-outlet></router-outlet>
  `
})
export class BodyComponent {
}
