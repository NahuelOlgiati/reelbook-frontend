import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { DomHandler } from 'primeng/components/dom/domhandler';
import { FileUploadModule } from 'primeng/components/fileupload/fileupload';
import { BlockUIModule } from 'primeng/components/blockui/blockui';

import { RbFileUpload } from './fileupload.component';
import { RbBlockui } from './blockui.component';

@NgModule({
    declarations: [
        RbFileUpload,
        RbBlockui
    ],
    imports: [CommonModule, FileUploadModule, BlockUIModule],
    exports: [RbFileUpload, RbBlockui],
    providers: [DomHandler]
})
export class RbPrimengModule { }