import { ModelResponse, User, AuthenticationService } from '../../app.backend';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Response } from '@angular/http';
import { GrowlMessageService } from '../../shared/service/core/growl-message.service';

@Component({
  template: `
<section id="signup" class="major">
    <div class="inner">
        <header class="major">
            <h2>Please sign up to use all features</h2>
        </header>
        <form [formGroup]="myForm" (ngSubmit)="onSignup()">
            <div class="field">
                <label for="email">E-Mail</label>
                <input formControlName="email" type="email" id="email" #email class="form-control">
                <span *ngIf="!email.pristine && email.errors != null && email.errors['noEmail']">Invalid mail address</span>
            </div>
            <div class="field">
                <label for="userName">User name</label>
                <input formControlName="userName" type="text" id="userName" class="form-control">
            </div>
            <div class="field">
                <label for="firstName">First name</label>
                <input formControlName="firstName" type="text" id="firstName" class="form-control">
            </div>
            <div class="field">
                <label for="lastName">Last name</label>
                <input formControlName="lastName" type="text" id="lastName" class="form-control">
            </div>
            <div class="field">
                <label for="password">Password</label>
                <input formControlName="password" type="password" id="password" class="form-control">
            </div>
            <div class="field">
                <label for="confirm-password">Confirm Password</label>
                <input formControlName="confirmPassword" type="password" id="confirm-password" #confirmPassword class="form-control">
                <span *ngIf="!confirmPassword.pristine && confirmPassword.errors != null && confirmPassword.errors['passwordsNotMatch']">Passwords do not match</span>
            </div>
            <ul class="actions">
                <li><input type="submit" [disabled]="!myForm.valid" value="Sing Up" class="special" /></li>
            </ul>
        </form>
    </div>
</section>
`,
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  myForm: FormGroup;
  error = false;
  errorMessage = '';

  constructor(private fb: FormBuilder, private authenticationService: AuthenticationService, private growlMessageService: GrowlMessageService) { }

  onSignup() {
    this.authenticationService.signup(this.myForm.value)
      .map((res: Response) => res.json())
      .map((res: ModelResponse<User>) => {
        if (res.success) {
          this.growlMessageService.notifyError([{ severity: 'info', summary: 'Info Message', detail: 'Signup Sucess' }]);
        } else {
          this.growlMessageService.notifyError([{ severity: 'error', summary: 'ErrorInfo Message', detail: 'Signup Unsuccessful' }]);
        }
      }).subscribe();
  }

  ngOnInit(): any {
    this.myForm = this.fb.group({
      email: ['', Validators.compose([
        Validators.required,
        this.isEmail
      ])],
      userName: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
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
