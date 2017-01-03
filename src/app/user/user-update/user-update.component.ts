import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from "@angular/http";
import { FormControl, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { RbFileUpload } from '../../third-party/primeng/fileupload.component';
import { UserService } from '../../shared/service/user.service';
import { GrowlMessageService } from '../../shared/service/core/growl-message.service';
import { ModelResponse } from '../../shared/model/core/model-response';
import { User } from '../../shared/model/user';

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

    constructor(private fb: FormBuilder, private activatedRoute: ActivatedRoute, private userService: UserService, private growlMessageService: GrowlMessageService) { }

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
        let userID = this.activatedRoute.snapshot.params['id'];
        this.userService.get(userID)
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

    }

    isEmail(control: FormControl): { [s: string]: boolean } {
        if (!control.value.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
            return { noEmail: true };
        }
    }

    onUserUpdate() {
        this.userService.update(this.myForm.value)
            .map((res: ModelResponse<User>) => {
                if (res.success) {
                    this.growlMessageService.notifyError([{ severity: 'info', summary: 'Info Message', detail: 'User update Sucess' }]);
                } else {
                    this.growlMessageService.notifyError([{ severity: 'error', summary: 'ErrorInfo Message', detail: 'User Update Unsuccessful' }]);
                }
            }).subscribe()
    }

    onUpload(event) {
        for (let file of event.files) {
            //this.uploadedFiles.push(file);
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
}