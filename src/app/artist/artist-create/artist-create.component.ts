import { Component, OnInit, ViewChild } from '@angular/core';
import { Headers, Http, Response, RequestOptions} from "@angular/http";
import { FormControl, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Artist } from '../../shared/model/artist';
import { PagedModelResponse } from '../../shared/model/paged-model-response';
import { ArtistService } from '../artist.service';
import { ArtistManager } from '../artist.manager';
import { GrowlMessageService } from '../../service/growl-message.service';
import { AuthService } from "../../core/auth/auth.service";

@Component({
    selector: 'rb-artist-create',
    templateUrl: 'artist-create.component.html'
})
export class ArtistCreateComponent implements OnInit {

    @ViewChild('fileUpload')
    fileUpload: any;
    myForm: FormGroup;
    uploadedFiles: any[] = [];

    constructor(private fb: FormBuilder, private authService: AuthService, private growlMessageService: GrowlMessageService) { }

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