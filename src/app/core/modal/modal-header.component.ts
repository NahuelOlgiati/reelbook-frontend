import { Component, Input } from '@angular/core';
import { ModalComponent } from './modal.component';

@Component({
    selector: 'rb-modal-header',
    template: `
        <div class="modal-header">
            <a *ngIf="showClose" type="button" class="close" data-dismiss="modal" aria-label="Close" (click)="modal.dismiss()"></a>
            <ng-content></ng-content>
        </div>
    `
})
export class ModalHeaderComponent {

    @Input('show-close') showClose: boolean = false;
    
    constructor(private modal: ModalComponent) { }
}