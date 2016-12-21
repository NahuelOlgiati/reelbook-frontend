import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { RbBlockUI } from '../../third-party/primeng/blockui.component';
import { RbFileUpload } from '../../third-party/primeng/fileupload.component';

@Component({
    selector: 'rb-artist-create',
    templateUrl: './artist-create.component.html',
    styleUrls: ['./artist-create.component.scss']
})
export class ArtistCreateComponent implements OnInit, AfterViewInit {

    @ViewChild('blockUI')
    blockUI: RbBlockUI;
    @ViewChild('fileUpload')
    fileUpload: RbFileUpload;
    myForm: FormGroup;
    uploadedFiles: any[] = [];

    blockedDocument: boolean = true;

    constructor(private fb: FormBuilder) { }

    ngOnInit(): any {
        this.myForm = this.fb.group({
            description: ['', Validators.required]
        });
    }

    ngAfterViewInit(): void {
        this.blockUI.block();
    }

    onUpload(event) {
        for (let file of event.files) {
            this.uploadedFiles.push(file);
        }
    }

    onBeforeUpload(event) {
        console.log(event);
        event.xhr.open('POST', this.fileUpload.url, true);
        event.xhr.setRequestHeader('Accept', 'text/html');
        event.formData.append('description', this.myForm.controls['description'].value);
    }

    upload() {
        this.fileUpload.upload();
    }
}