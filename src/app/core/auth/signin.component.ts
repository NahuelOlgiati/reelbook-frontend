import { ModelResponse, RestSession, AuthenticationService } from '../../app.backend';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GrowlMessageService } from '../../shared/service/core/growl-message.service';
import { SessionManager } from '../../shared/manager/core/session.manager';
import { Response } from '@angular/http';

@Component({
  selector: 'rb-signin',
  templateUrl: './signin.component.html'
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
