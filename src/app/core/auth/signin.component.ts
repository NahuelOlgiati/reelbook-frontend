import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { GrowlMessageService } from '../../shared/service/core/growl-message.service';
import { AuthService } from "../../shared/service/core/auth.service";
import { SessionManager } from "../../shared/manager/core/session.manager";
import { ModelResponse } from "../../shared/model/core/model-response";

@Component({
    selector: 'rb-signin',
    templateUrl: './signin.component.html'
})
export class SigninComponent implements OnInit {
    myForm: FormGroup;
    error = false;
    errorMessage = '';

    constructor(private fb: FormBuilder, private authService: AuthService, private sessionManager: SessionManager, private growlMessageService: GrowlMessageService) { }

    onSignin() {
        this.authService.signinUser(this.myForm.value)
            .subscribe((res: ModelResponse<string>) => {
                if (res.success) {
                    this.authService.saveToken(res.model);
                    this.sessionManager.fetch();
                    this.growlMessageService.notifyError([{ severity: 'info', summary: 'Info Message', detail: 'Signin Sucess' }]);
                }
            })
    }

    ngOnInit(): any {
        this.myForm = this.fb.group({
            userName: ['', Validators.required],
            password: ['', Validators.required],
        });
    }
}
