import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalComponent } from './modal.component';
import { ModalHeaderComponent } from './modal-header.component';
import { ModalBodyComponent } from './modal-body.component';
import { ModalFooterComponent } from './modal-footer.component';
import { ModalAutofocusDirective } from './modal-autofocus.directive';

/*
export * from './modal.component';
export * from './modal-header.component';
export * from './modal-body.component';
export * from './modal-footer.component';
export * from './modal-instance';
*/

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
