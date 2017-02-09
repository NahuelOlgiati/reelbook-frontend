import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalComponent } from '../../core/modal/modal.component';

@Component({
  selector: 'rb-modal-demo',
  templateUrl: './modal-demo.component.html',
  styleUrls: ['./modal-demo.component.scss']
})
export class ModalDemoComponent {
  @ViewChild('modal')
  modal: ModalComponent;
  items: String[] = ['item1', 'item2', 'item3'];
  selected: String;
  output: String;
  model: Person = new Person();

  index: Number = 0;
  backdropOptions = [true, false, 'static'];
  cssClass: String = '';

  animation: Boolean = true;
  keyboard: Boolean = true;
  backdrop: String | Boolean = true;
  css: Boolean = false;

  constructor(private router: Router) { }

  closed() {
    this.output = '(closed) ' + this.selected;
  }

  dismissed() {
    this.output = '(dismissed)';
  }

  opened() {
    this.output = '(opened)';
  }

  navigate() {
    this.router.navigateByUrl('/home');
  }

  open() {
    this.modal.open();
  }
}

export class Person {
  firstName: String;
  lastName: String;
}