import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { GrowlMessageService } from '../../service/growl-message.service';

import { AuthService } from "./auth.service";

@Component({
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
    myForm: FormGroup;
    error = false;
    errorMessage = '';

    constructor(private fb: FormBuilder, private authService: AuthService, private growlMessageService: GrowlMessageService) { }

    onSignin() {
        this.authService.signinUser(this.myForm.value)
            .subscribe(
            res => {
                if (res.success) {
                    this.authService.saveToken(res.body);
                    this.growlMessageService.notifyError([{ severity: 'info', summary: 'Info Message', detail: 'Signin Sucess' }]);
                }
            })
    }

    ngOnInit(): any {
        this.myForm = this.fb.group({
            username: ['', Validators.required],
            password: ['', Validators.required],
        });
    }
}
