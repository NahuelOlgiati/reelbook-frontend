import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { GrowlMessageService } from '../../shared/service/core/growl-message.service';
import { AuthService } from "../../shared/service/core/auth.service";

@Component({
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
    myForm: FormGroup;
    error = false;
    errorMessage = '';

    constructor(private fb: FormBuilder, private authService: AuthService, private growlMessageService: GrowlMessageService) { }

    // signin the new user if signup successfully
    signin() {
        console.log('Entrando Signup signin');
        this.authService.signinUser(this.myForm.value)
            .subscribe(
            res => {
                if (res.success) {
                    this.growlMessageService.notifyError([{ severity: 'info', summary: 'Info Message', detail: 'Signin Sucess' }]);
                } else {
                    this.growlMessageService.notifyError([{ severity: 'error', summary: 'ErrorInfo Message', detail: 'Signin Unsuccessful' }]);
                }
            }
            )
    }

    // create the new user
    onSignup() {
        console.log('Entrando Signup onSignup');
        this.authService.signupUser(this.myForm.value)
            .subscribe(
            res => {
                console.log('Signup Finish: ' + res.success);
                if (res.success) {
                    this.signin();
                } else {
                    this.growlMessageService.notifyError([{ severity: 'error', summary: 'ErrorInfo Message', detail: 'Signup Unsuccessful' }]);
                }
            }
            )
    }

    ngOnInit(): any {
        this.myForm = this.fb.group({
            email: ['', Validators.compose([
                Validators.required,
                this.isEmail
            ])],
            userName: ['', Validators.required],
            password: ['', Validators.required],
            confirmPassword: ['', Validators.compose([
                Validators.required,
                this.isEqualPassword.bind(this)
            ])],
        });
    }

    isEmail(control: FormControl): { [s: string]: boolean } {
        if (!control.value.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
            return { noEmail: true };
        }
    }

    isEqualPassword(control: FormControl): { [s: string]: boolean } {
        if (!this.myForm) {
            return { passwordsNotMatch: true };

        }
        if (control.value !== this.myForm.controls['password'].value) {
            return { passwordsNotMatch: true };
        }
    }
}
