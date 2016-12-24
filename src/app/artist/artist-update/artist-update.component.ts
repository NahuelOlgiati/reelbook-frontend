import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from "@angular/http";
import { FormControl, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ArtistService } from '../../shared/service/artist.service';
import { GrowlMessageService } from '../../shared/service/core/growl-message.service';
import { ModelResponse } from '../../shared/model/core/model-response';
import { Artist } from '../../shared/model/artist';

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
        let artistID = this.activatedRoute.snapshot.params['id'];
        this.artistService.get(artistID)
            .map((res: ModelResponse<Artist>) => res.model)
            .subscribe((artist: Artist) => {
                this.myForm.setValue({ artistID: artistID, description: artist.description });
            });

    }

    onArtisUpdate() {
        this.artistService.update(this.myForm.value)
            .map((res: ModelResponse<Artist>) => {
                if (res.success) {
                    this.growlMessageService.notifyError([{ severity: 'info', summary: 'Info Message', detail: 'User update Sucess' }]);
                } else {
                    this.growlMessageService.notifyError([{ severity: 'error', summary: 'ErrorInfo Message', detail: 'User Update Unsuccessful' }]);
                }
            }).subscribe()
    }
}