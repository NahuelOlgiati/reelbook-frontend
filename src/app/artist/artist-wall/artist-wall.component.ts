import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Artist } from '../../shared/model/artist';
import { PagedModelResponse } from '../../shared/model/core/paged-model-response';
import { RbBlockUI } from '../../third-party/primeng/blockui.component';
import { ArtistWallManager } from './artist-wall.manager';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
    selector: 'rb-artist-wall',
    templateUrl: './artist-wall.component.html',
    styleUrls: ['./artist-wall.component.scss']
})
export class ArtistWallComponent implements OnInit {

    @ViewChild('blockUI')
    blockUI: RbBlockUI;
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
    }

    ngAfterViewInit(): void {
        this.blockUI._blocked = true;
        this.blockUI.block();
        this.artistWallManager.fetch(' ', 0, 8).subscribe(() => {
            this.blockUI._blocked = false;
            this.blockUI.unblock();
        });
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
        this.blockUI._blocked = true;
        this.blockUI.block();
        this.artistWallManager.fetch(' ', (event.rows * event.page), event.rows)
            .subscribe(() => {
                this.blockUI._blocked = false;
                this.blockUI.unblock();
            });
    }

    imgBase64(caca: any): SafeUrl {
        return this.sanitizer.bypassSecurityTrustUrl('data:image/jpg;base64,' + caca);
    }
}