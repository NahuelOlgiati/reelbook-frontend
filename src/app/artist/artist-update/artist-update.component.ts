import { ModelResponse, Artist, ArtistService } from '../../app.backend';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GrowlMessageService } from '../../shared/service/core/growl-message.service';
import { Response } from '@angular/http';

@Component({
  selector: 'rb-artist-update',
  templateUrl: './artist-update.component.html',
  styleUrls: ['./artist-update.component.scss']
})
export class ArtistUpdateComponent implements OnInit {

  myForm: FormGroup;
  description: string;

  constructor(private fb: FormBuilder, private artistService: ArtistService, private growlMessageService: GrowlMessageService) { }

  ngOnInit(): any {
    this.myForm = this.fb.group({
      artistID: ['', Validators.required],
      description: ['', Validators.required]
    });
    this.artistService.current()
      .map((response: Response) => response.json())
      .map((res: ModelResponse<Artist>) => res.model)
      .subscribe((artist: Artist) => {
        this.myForm.setValue({ artistID: artist.artistID, description: artist.description });
      });
  }

  onArtisUpdate() {
    this.artistService.update(this.myForm.value)
      .map((response: Response) => response.json())
      .map((res: ModelResponse<Artist>) => {
        if (res.success) {
          this.growlMessageService.notifyError([{ severity: 'info', summary: 'Info Message', detail: 'User update Sucess' }]);
        } else {
          this.growlMessageService.notifyError([{ severity: 'error', summary: 'ErrorInfo Message', detail: 'User Update Unsuccessful' }]);
        }
      }).subscribe();
  }
}