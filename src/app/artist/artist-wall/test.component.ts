import { Component, ViewChild } from '@angular/core';
import { ImageCropperComponent, CropperSettings, Bounds } from 'ng2-img-cropper';

@Component({
    selector: 'crop-test',
    template: `
        <div class="row">
        <div class="col-md-9">
            <h3>source</h3>
            <img-cropper [image]="data1" [settings]="cropperSettings1" (onCrop)="cropped($event)"></img-cropper>
        </div>
        <h3>result</h3>
        <div class="col-md-3">
            <span *ngIf="data1.image" >
                <img [src]="data1.image"
                    [width]="cropperSettings1.croppedWidth"
                    [height]="cropperSettings1.croppedHeight">
            </span>
        </div>
        </div> 
    `
})
export class TestComponent {

    @ViewChild('cropper')
    public cropper: ImageCropperComponent;

    public data1: any;
    public cropperSettings1: CropperSettings;

    constructor() {
        this.cropperSettings1 = new CropperSettings();
        this.cropperSettings1.width = 200;
        this.cropperSettings1.height = 200;

        this.cropperSettings1.croppedWidth = 200;
        this.cropperSettings1.croppedHeight = 200;

        this.cropperSettings1.canvasWidth = 500;
        this.cropperSettings1.canvasHeight = 300;

        this.cropperSettings1.minWidth = 100;
        this.cropperSettings1.minHeight = 100;

        this.cropperSettings1.rounded = false;
        this.cropperSettings1.responsive = true;

        this.cropperSettings1.cropperDrawSettings.strokeColor = 'rgba(255,255,255,1)';
        this.cropperSettings1.cropperDrawSettings.strokeWidth = 2;

        this.cropperSettings1.keepAspect = true;
        this.cropperSettings1.preserveSize = false;

        this.data1 = {};
    }

    public cropped(bounds: Bounds) {
        console.log(bounds);
    }
}