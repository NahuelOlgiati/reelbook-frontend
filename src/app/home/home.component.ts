import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'rb-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {class:'rb'}
})
export class HomeComponent {
}
