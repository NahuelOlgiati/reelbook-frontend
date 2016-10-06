import { Component, ViewChild, ViewEncapsulation } from "@angular/core";
import { Router } from '@angular/router';
import { ModalComponent } from '../../core/modal/modal.component';

@Component({
    selector: 'rb-modal-demo',
    templateUrl: 'modal-demo.component.html'
})
export class ModalDemoComponent {
    @ViewChild('modal')
    modal: ModalComponent;
    items: string[] = ['item1', 'item2', 'item3'];
    selected: string;
    output: string;
    model: Person = new Person();

    index: number = 0;
    backdropOptions = [true, false, 'static'];
    cssClass: string = '';

    animation: boolean = true;
    keyboard: boolean = true;
    backdrop: string | boolean = true;
    css: boolean = false;

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
    firstName: string;
    lastName: string;
}