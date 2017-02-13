import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RbFileUpload } from '../../third-party/primeng/fileupload.component';
import { ArtistService } from '../../shared/service/artist.service';
import { GrowlMessageService } from '../../shared/service/core/growl-message.service';

@Component({
  selector: 'rb-artist-create',
  templateUrl: './artist-create.component.html',
  styleUrls: ['./artist-create.component.scss']
})
export class ArtistCreateComponent implements OnInit {

  @ViewChild('fileUpload')
  fileUpload: RbFileUpload;
  myForm: FormGroup;
  uploadedFiles: any[] = [];

  constructor(private fb: FormBuilder, private artistService: ArtistService, private growlMessageService: GrowlMessageService) { }

  ngOnInit(): any {
    this.myForm = this.fb.group({
      description: ['', Validators.required]
    });
  }

  onArtisCreate() {
    this.artistService.create(this.myForm.value)
      .map((res: M.ModelResponse<M.Artist>) => {
        if (res.success) {
          this.growlMessageService.notifyError([{ severity: 'info', summary: 'Info Message', detail: 'User creation Sucess' }]);
        } else {
          this.growlMessageService.notifyError([{ severity: 'error', summary: 'ErrorInfo Message', detail: 'User creation Unsuccessful' }]);
        }
      }).subscribe();
  }

  onUpload(event) {
    for (const file of event.files) {
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