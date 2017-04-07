import { Component, ViewChild, NgModule } from '@angular/core';
import { ImageCropperComponent, CropperSettings, ImageCropperModule } from 'ng2-img-cropper';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'rb-img-cropper',
    template: `
        <div class="file-upload">
            <label for="custom-input" class="special">Select Image</label>
            <input id="custom-input" type="file" style="visibility:hidden;" (change)="fileChangeListener($event)">
        </div>
        <img-cropper #cropper [image]="data" [settings]="cropperSettings"></img-cropper>
        <br>
        <span class="result rounded" *ngIf="data.image" >
            <img [src]="data.image" [width]="cropperSettings.croppedWidth" [height]="cropperSettings.croppedHeight">
        </span>
    `
})
export class ImgCropperComponent {

    @ViewChild('cropper')
    public cropper: ImageCropperComponent;

    public data: any;
    public cropperSettings: CropperSettings;

    constructor() {
        this.cropperSettings = new CropperSettings();
        this.cropperSettings.noFileInput = true;

        this.cropperSettings.width = 200;
        this.cropperSettings.height = 200;

        this.cropperSettings.croppedWidth = 200;
        this.cropperSettings.croppedHeight = 200;

        this.cropperSettings.canvasWidth = 500;
        this.cropperSettings.canvasHeight = 300;

        this.cropperSettings.minWidth = 100;
        this.cropperSettings.minHeight = 100;

        this.cropperSettings.rounded = false;
        this.cropperSettings.dynamicSizing = true;

        this.cropperSettings.cropperDrawSettings.strokeColor = 'rgba(255,255,255,1)';
        this.cropperSettings.cropperDrawSettings.strokeWidth = 2;

        this.cropperSettings.keepAspect = true;
        this.cropperSettings.preserveSize = false;

        this.data = {};
    }

    fileChangeListener($event) {
        var image: any = new Image();
        var file: File = $event.target.files[0];
        var myReader: FileReader = new FileReader();
        var that = this;
        myReader.onloadend = function (loadEvent: any) {
            image.src = loadEvent.target.result;
            that.cropper.setImage(image);

        };

        myReader.readAsDataURL(file);
    }

}

@NgModule({
    declarations: [ImgCropperComponent],
    imports: [CommonModule, ImageCropperModule],
    exports: [ImgCropperComponent]
})
export class ImgCropperModule { }