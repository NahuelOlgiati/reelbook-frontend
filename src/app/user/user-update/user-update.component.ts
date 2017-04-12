import { ModelResponse, User, UserService } from '../../app.backend';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RbFileUpload } from '../../third-party/primeng/fileupload.component';
import { GrowlMessageService } from '../../shared/service/core/growl-message.service';
import { Response } from '@angular/http';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'rb-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.scss']
})
export class UserUpdateComponent implements OnInit {

  @ViewChild('fileUpload')
  fileUpload: RbFileUpload;

  myForm: FormGroup;
  description: string;

  constructor(private fb: FormBuilder, private userService: UserService,
    private domSanitizer: DomSanitizer, private growlMessageService: GrowlMessageService, private router: Router, private activated: ActivatedRoute) { }

  ngOnInit(): any {
    this.myForm = this.fb.group({
      userID: ['', Validators.required],
      email: ['', Validators.compose([
        Validators.required,
        this.isEmail
      ])],
      userName: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required]
    });
    this.userService.getCurrent()
      .map((response: Response) => response.json())
      .map((res: ModelResponse<User>) => res.model)
      .subscribe((user: User) => {
        this.myForm.setValue(
          {
            userID: user.userID,
            email: user.email,
            userName: user.userName,
            firstName: user.firstName,
            lastName: user.lastName
          });
      });
    /*this.getStream();*/
    //this.router.config.forEach(x => console.log(x));


console.log(this.activated.routeConfig.children);
console.log(this.activated.snapshot);
console.log(this.activated.snapshot.children);
/*
    console.log(this.router);
    console.log(this.router.config);
    console.log(this.activated);
    */
    this.activated.children.forEach(x => console.log(x));
  }

  isEmail(control: FormControl): { [s: string]: boolean } {
    if (!control.value.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
      return { noEmail: true };
    }
  }

  onUserUpdate() {
    this.userService.update(this.myForm.value)
      .map((response: Response) => response.json())
      .map((res: ModelResponse<User>) => {
        if (res.success) {
          this.growlMessageService.notifyError([{ severity: 'info', summary: 'Info Message', detail: 'User update Sucess' }]);
        } else {
          this.growlMessageService.notifyError([{ severity: 'error', summary: 'ErrorInfo Message', detail: 'User Update Unsuccessful' }]);
        }
      }).subscribe();
  }

  onUpload(event) {
    for (let file of event.files) {
      //      this.uploadedFiles.push(file);
    }
  }

  onBeforeUpload(event) {
    console.log(event);
    event.xhr.open('POST', this.fileUpload.url, true);
    event.xhr.setRequestHeader('Accept', 'text/html');
    event.formData.append('token', localStorage.getItem('token'));
  }

  upload() {
    this.fileUpload.upload();
  }

  /*
    x: any;

    getStream() {
      this.userService.stream()
        .subscribe(
        (x: any) => {
          this.x = x; console.log(x);
        }
        );
    }

    sani(): SafeUrl {
      return this.domSanitizer.bypassSecurityTrustUrl('data:video/mp4;' + this.x);
    }
    */
}
