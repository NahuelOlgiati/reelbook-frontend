import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { GrowlMessageService } from '../../shared/growl-message/growl-message.service';
import { AuthService } from "./auth.service";

@Component({
    template: `
        <h3>Please sign up to use all features</h3>
        <form [formGroup]="myForm" (ngSubmit)="onSignup()">
            <div class="form-group">
                <label for="email">E-Mail</label>
                <input formControlName="email" type="email" id="email" #email class="form-control">
                <span *ngIf="!email.pristine && email.errors != null && email.errors['noEmail']">Invalid mail address</span>
            </div>
            <div class="form-group">
                <label for="username">User name</label>
                <input formControlName="username" type="text" id="username" class="form-control">
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input formControlName="password" type="password" id="password" class="form-control">
            </div>
            <div class="form-group">
                <label for="confirm-password">Confirm Password</label>
                <input formControlName="confirmPassword" type="password" id="confirm-password" #confirmPassword class="form-control">
                <span *ngIf="!confirmPassword.pristine && confirmPassword.errors != null && confirmPassword.errors['passwordsNotMatch']">Passwords do not match</span>
            </div>
            <button type="submit" [disabled]="!myForm.valid" class="btn btn-primary">Sign Up</button>
        </form>
    `
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
                    this.authService.saveToken(res.body);
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
            username: ['', Validators.required],
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
