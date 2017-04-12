import { ModelResponse, RestSession, AuthenticationService } from '../../app.backend';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GrowlMessageService } from '../../shared/service/core/growl-message.service';
import { SessionManager } from '../../shared/manager/core/session.manager';
import { Response } from '@angular/http';

@Component({
  selector: 'rb-signin',
  template: `
<div>
    <div class="social-buttons">
        <rb-facebook-signin></rb-facebook-signin>
        <a href="#" class="button btn-tw small fit"><i class="fa fa-twitter"></i> Twitter</a>
    </div>
    or
    <form [formGroup]="myForm" (ngSubmit)="onSignin()">
        <div class="form-group">
            <input formControlName="userName" placeholder="User Name" type="text" id="userName" class="form-control">
        </div>
        <div class="form-group">
            <input formControlName="password" id="password" placeholder="Password" type="password" class="form-control">
            <div class="help-block text-right"><a href="">Forget the password ?</a></div>
        </div>
        <div class="form-group">
            <input type="submit" [disabled]="!myForm.valid" value="Sing in" class="button special fit" />
        </div>
    </form>
</div>
  `
})
export class SigninComponent implements OnInit {
  myForm: FormGroup;
  error = false;
  errorMessage = '';

  constructor(private fb: FormBuilder, private authenticationService: AuthenticationService, private sessionManager: SessionManager, private growlMessageService: GrowlMessageService) { }

  onSignin() {
    this.authenticationService.signin(this.myForm.value)
      .map((res: Response) => res.json())
      .map((res: ModelResponse<RestSession>) => {
        if (res.success) {
          this.sessionManager.authenticate(res.model);
          this.growlMessageService.notifyError([{ severity: 'info', summary: 'Info Message', detail: 'Signin Sucess' }]);
        }
      }).subscribe();
  }

  ngOnInit(): any {
    this.myForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
}
