import { ModelResponse, AudioVisual, AudioVisualService } from '../../app.backend';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GrowlMessageService } from '../../shared/service/core/growl-message.service';
import { Response } from '@angular/http';

@Component({
  selector: 'rb-audiovisual-update',
  templateUrl: './audiovisual-update.component.html',
  styleUrls: ['./audiovisual-update.component.scss']
})
export class UserAudiovisualUpdateComponent implements OnInit {

  myForm: FormGroup;
  description: string;

  constructor(private fb: FormBuilder, private activatedRoute: ActivatedRoute, private audioVisualService: AudioVisualService, private growlMessageService: GrowlMessageService) { }

  ngOnInit(): any {
    this.myForm = this.fb.group({
      audioVisualID: ['', Validators.required],
      email: ['', Validators.compose([
        Validators.required,
        this.isEmail
      ])],
      Name: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required]
    });
    const ID = this.activatedRoute.snapshot.params['id'];
    /*
    this.audioVisualService.get(ID)
        .map((res: Response) => res.json())
        .map((res: ModelResponse<AudioVisual>) => res.model)
        .subscribe((audioVisual: AudioVisual) => {
            this.myForm.setValue(
                {
                    audioVisualID: audioVisual.audioVisualID,
                    email: audioVisual.email,
                    Name: audioVisual.audioVisualName,
                    firstName: audioVisual.firstName,
                    lastName: audioVisual.lastName
                });
        });
        */
  }

  isEmail(control: FormControl): { [s: string]: boolean } {
    if (!control.value.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
      return { noEmail: true };
    }
  }

  onUserAudiovisual() {
    this.audioVisualService.update(this.myForm.value)
      .map((res: Response) => res.json())
      .map((res: ModelResponse<AudioVisual>) => {
        if (res.success) {
          this.growlMessageService.notifyError([{ severity: 'info', summary: 'Info Message', detail: 'Audiovisual Sucess' }]);
        } else {
          this.growlMessageService.notifyError([{ severity: 'error', summary: 'ErrorInfo Message', detail: 'Audiovisual Unsuccessful' }]);
        }
      }).subscribe();
  }
}