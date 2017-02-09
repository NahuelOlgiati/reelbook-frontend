import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalComponent } from './modal.component';
import { ModalHeaderComponent } from './modal-header.component';
import { ModalBodyComponent } from './modal-body.component';
import { ModalFooterComponent } from './modal-footer.component';
import { ModalAutofocusDirective } from './modal-autofocus.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ModalComponent,
    ModalHeaderComponent,
    ModalBodyComponent,
    ModalFooterComponent,
    ModalAutofocusDirective
  ],
  exports: [
    ModalComponent,
    ModalHeaderComponent,
    ModalBodyComponent,
    ModalFooterComponent,
    ModalAutofocusDirective
  ]
})
export class ModalModule {
}
