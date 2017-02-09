import { Component, Input } from '@angular/core';
import { ModalComponent } from './modal.component';

@Component({
  selector: 'rb-modal-footer',
  template: `
        <div class="modal-footer">
            <ng-content></ng-content>
            <button *ngIf="showDefaultButtons" type="button" class="btn btn-default" data-dismiss="modal" (click)="modal.dismiss()">{{dismissButtonLabel}}</button>
            <button *ngIf="showDefaultButtons" type="button" class="btn btn-primary" (click)="modal.close()">{{closeButtonLabel}}</button>
        </div>
    `
})
export class ModalFooterComponent {

  @Input() showDefaultButtons: Boolean = false;
  @Input() dismissButtonLabel: String = 'Dismiss';
  @Input() closeButtonLabel: String = 'Close';

  constructor(public modal: ModalComponent) { }
}
