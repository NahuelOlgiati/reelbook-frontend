import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ArtistService } from '../../shared/service/artist.service';
import { GrowlMessageService } from '../../shared/service/core/growl-message.service';

@Component({
  selector: 'rb-artist-update',
  templateUrl: './artist-update.component.html',
  styleUrls: ['./artist-update.component.scss']
})
export class ArtistUpdateComponent implements OnInit {

  myForm: FormGroup;
  description: string;

  constructor(private fb: FormBuilder, private activatedRoute: ActivatedRoute, private artistService: ArtistService, private growlMessageService: GrowlMessageService) { }

  ngOnInit(): any {
    this.myForm = this.fb.group({
      artistID: ['', Validators.required],
      description: ['', Validators.required]
    });
    const artistID = this.activatedRoute.snapshot.params['id'];
    this.artistService.get(artistID)
      .map((res: M.ModelResponse<M.Artist>) => res.model)
      .subscribe((artist: M.Artist) => {
        this.myForm.setValue({ artistID: artistID, description: artist.description });
      });

  }

  onArtisUpdate() {
    this.artistService.update(this.myForm.value)
      .map((res: M.ModelResponse<M.Artist>) => {
        if (res.success) {
          this.growlMessageService.notifyError([{ severity: 'info', summary: 'Info Message', detail: 'User update Sucess' }]);
        } else {
          this.growlMessageService.notifyError([{ severity: 'error', summary: 'ErrorInfo Message', detail: 'User Update Unsuccessful' }]);
        }
      }).subscribe();
  }
}