import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Artist } from '../../shared/model/artist';
import { PagedModelResponse } from '../../shared/model/core/paged-model-response';
import { ArtistWallManager } from './artist-wall.manager';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
    selector: 'rb-artist-wall',
    templateUrl: './artist-wall.component.html',
    styleUrls: ['./artist-wall.component.scss']
})
export class ArtistWallComponent implements OnInit {

    artists: Artist[];
    artistsSelection: number[] = [];
    deploySelection: boolean = false;
    rowCount: number = 0;

    constructor(private artistWallManager: ArtistWallManager, private sanitizer: DomSanitizer) { }

    ngOnInit() {
        this.artistWallManager.artistsChanged.subscribe((artists: Artist[]) => {
            this.artists = this.artistWallManager.getList();
            this.rowCount = this.artistWallManager.getRowCount();
        });
        this.artistWallManager.artistsSelectionChanged.subscribe((selection: number[]) => {
            this.artistsSelection = selection;
        });
        this.artistWallManager.fetch(' ', 0, 8);
    }

    onSelect(artist: Artist) {
        if (this.isActive(artist)) {
            this.artistWallManager.removeFromSelection(artist);
        } else {
            this.artistWallManager.addToSelection(artist);
        }
    }

    isActive(artist: Artist): Boolean {
        return this.artistWallManager.isOnSelection(artist);
    }

    getModelSelection(): Artist[] {
        return this.artistWallManager.getModelSelection();
    }

    paginate(event) {
        this.artistWallManager.fetch(' ', (event.rows * event.page), event.rows);
    }

    imgBase64(caca: any): SafeUrl{
        return this.sanitizer.bypassSecurityTrustUrl('data:image/jpg;base64,' + caca);
    }
}