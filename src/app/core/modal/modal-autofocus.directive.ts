import { Directive, ElementRef, Optional } from '@angular/core';
import { ModalComponent } from './modal.component';

@Directive({
  selector: '[rb-modal-autofocus]'
})
export class ModalAutofocusDirective {

  constructor(private el: ElementRef, @Optional() private modal: ModalComponent) {
    if (modal) {
      this.modal.onOpen.subscribe(() => this.el.nativeElement.focus());
    }
  }

}