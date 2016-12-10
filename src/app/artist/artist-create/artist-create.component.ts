import { Component, OnInit, ViewChild } from '@angular/core';
import { Headers, Http, Response, RequestOptions} from "@angular/http";
import { FormControl, FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
    selector: 'rb-artist-create',
    templateUrl: 'artist-create.component.html',
    styleUrls: ['./artist-create.component.scss']
})
export class ArtistCreateComponent implements OnInit {

    @ViewChild('fileUpload')
    fileUpload: any;
    myForm: FormGroup;
    uploadedFiles: any[] = [];

    constructor(private fb: FormBuilder) { }

    ngOnInit(): any {
        this.myForm = this.fb.group({
            description: ['', Validators.required]
        });
    }

    onUpload(event) {
        for (let file of event.files) {
            this.uploadedFiles.push(file);
        }
    }

    onBeforeUpload(event) {
        event.xhr.setRequestHeader('Accept', 'text/html');
        event.formData.append('description', this.myForm.controls['description'].value);
    }

    upload() {
        this.fileUpload.upload();
    }
}