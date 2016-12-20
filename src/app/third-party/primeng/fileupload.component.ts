import { Component, NgModule, OnInit, AfterContentInit, Input, Output, EventEmitter, QueryList, ContentChildren } from '@angular/core';
import { CommonModule } from "@angular/common";
import { SharedModule } from 'primeng/components/common/shared';
import { ButtonModule } from 'primeng/components/button/button';
import { MessagesModule } from 'primeng/components/messages/messages';
import { ProgressBarModule } from 'primeng/components/progressbar/progressbar';
import { DomSanitizer } from '@angular/platform-browser';
import { FileUpload } from 'primeng/components/fileupload/fileupload';
import { PrimeTemplate } from 'primeng/components/common/shared';

@Component({
    selector: 'rb-fileUpload',
    template: `
        <div [ngClass]="'ui-fileupload ui-widget'" [ngStyle]="style" [class]="styleClass">
            <div class="ui-fileupload-buttonbar ui-widget-header ui-corner-top">
                <button type="button" [label]="chooseLabel" icon="fa-plus" pButton class="ui-fileupload-choose" (click)="onChooseClick($event, fileinput)" [disabled]="disabled"> 
                    <input #fileinput type="file" (change)="onFileSelect($event)" [multiple]="multiple" [accept]="accept" [disabled]="disabled">
                </button>
                <button type="button" [label]="uploadLabel" icon="fa-upload" pButton (click)="upload()" [disabled]="!hasFiles()"></button>
                <button type="button" [label]="cancelLabel" icon="fa-close" pButton (click)="clear()" [disabled]="!hasFiles()"></button>
            </div>
            <div [ngClass]="{'ui-fileupload-content ui-widget-content ui-corner-bottom':true,'ui-fileupload-highlight':dragHighlight}" 
                (dragenter)="onDragEnter($event)" (dragover)="onDragOver($event)" (dragleave)="onDragLeave($event)" (drop)="onDrop($event)">
                <p-progressBar [value]="progress" [showValue]="false" *ngIf="hasFiles()"></p-progressBar>
                
                <p-messages [value]="msgs"></p-messages>
                
                <div class="ui-fileupload-files" *ngIf="hasFiles()">
                    <div *ngIf="!fileTemplate">
                        <div class="ui-fileupload-row" *ngFor="let file of files">
                            <div><img [src]="file.objectURL" *ngIf="isImage(file)" [width]="previewWidth" /></div>
                            <div>{{file.name}}</div>
                            <div>{{formatSize(file.size)}}</div>
                            <div><button type="button" icon="fa-close" pButton (click)="remove(i)"></button></div>
                        </div>
                    </div>
                    <div *ngIf="fileTemplate">
                        <template ngFor [ngForOf]="files" [ngForTemplate]="fileTemplate"></template>
                    </div>
                </div>
                
                <p-templateLoader [template]="contentTemplate"></p-templateLoader>
            </div>
        </div>
    `
})
export class RbFileUpload extends FileUpload implements OnInit, AfterContentInit {
    @Input() name: string;

    @Input() url: string;

    @Input() multiple: boolean;

    @Input() accept: string;

    @Input() disabled: boolean;

    @Input() auto: boolean;

    @Input() maxFileSize: number;

    @Input() invalidFileSizeMessageSummary: string = '{0}: Invalid file size, ';

    @Input() invalidFileSizeMessageDetail: string = 'maximum upload size is {0}.';

    @Input() style: string;

    @Input() styleClass: string;

    @Input() previewWidth: number = 50;

    @Input() chooseLabel: string = 'Choose';

    @Input() uploadLabel: string = 'Upload';

    @Input() cancelLabel: string = 'Cancel';

    @Output() onBeforeUpload: EventEmitter<any> = new EventEmitter();

    @Output() onBeforeSend: EventEmitter<any> = new EventEmitter();

    @Output() onUpload: EventEmitter<any> = new EventEmitter();

    @Output() onError: EventEmitter<any> = new EventEmitter();

    @Output() onClear: EventEmitter<any> = new EventEmitter();

    @Output() onSelect: EventEmitter<any> = new EventEmitter();

    @ContentChildren(PrimeTemplate) templates: QueryList<any>;

    constructor(private sanitizer2: DomSanitizer) {
        super(sanitizer2);
    }

    ngOnInit() {
        super.ngOnInit();
    }

    ngAfterContentInit(): void {
        super.ngAfterContentInit();
    }
}

@NgModule({
    imports: [CommonModule, SharedModule, ButtonModule, ProgressBarModule, MessagesModule],
    exports: [RbFileUpload, SharedModule, ButtonModule, ProgressBarModule, MessagesModule],
    declarations: [RbFileUpload]
})
export class RbFileUploadModule { }