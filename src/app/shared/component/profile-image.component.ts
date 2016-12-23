import { Component, NgModule, ViewChild, Output, EventEmitter } from '@angular/core';
import { CommonModule } from "@angular/common";
import { ImageCropperModule, ImageCropperComponent, CropperSettings, Bounds } from 'ng2-img-cropper';

@Component({
    selector: 'rb-profile-image',
    template: `
<div class="container">
  <div class="row" [ngStyle]="{display: selectionMode ? 'none' : 'block'}">
    <div class="col-md-3">
        <img *ngIf="!data.image" class="img-responsive" src="../../assets/images/profile.png">
        <img *ngIf="data.image" class="img-responsive" [src]="data.image" [width]="cropperSettings.croppedWidth" [height]="cropperSettings.croppedHeight">
        <ul class="actions">
            <li><label for="custom-input"><a class="button special" for="custom-input">Elegir</a></label></li>
        </ul>
    </div>
  </div>
  <div class="row" [ngStyle]="{display: selectionMode ? 'block' : 'none'}">
    <div class="col-md-3">
        <input id="custom-input" type="file" style="visibility:hidden;" (change)="fileChangeListener($event)">
        <img class="img-responsive" [src]="data.image" [width]="cropperSettings.croppedWidth" [height]="cropperSettings.croppedHeight">
    </div>
    <div class="col-md-9">
        <img-cropper #cropper [image]="data" [settings]="cropperSettings"></img-cropper>
        <ul class="actions">
            <li><a class="button special" (click)="selectionMode=false;">Aceptar</a></li>
            <li><a class="button" (click)="selectionMode=false;data.image=undefined;">Cerrar</a></li>
        </ul>
    </div>
  </div>
</div>
    `
})
export class ProfileImageComponent {

    @ViewChild('cropper')
    public cropper: ImageCropperComponent;

    @Output()
    onImageChoosed: EventEmitter<any> = new EventEmitter();

    public data: any;
    public cropperSettings: CropperSettings;
    public selectionMode: Boolean = false;

    constructor() {
        this.cropperSettings = new CropperSettings();
        this.cropperSettings.noFileInput = true;

        this.cropperSettings.width = 200;
        this.cropperSettings.height = 200;

        this.cropperSettings.croppedWidth = 200;
        this.cropperSettings.croppedHeight = 200;

        this.cropperSettings.canvasWidth = 250;
        this.cropperSettings.canvasHeight = 250;

        this.cropperSettings.minWidth = 100;
        this.cropperSettings.minHeight = 100;

        this.cropperSettings.rounded = false;
        this.cropperSettings.responsive = true;

        this.cropperSettings.cropperDrawSettings.strokeColor = 'rgba(255,255,255,1)';
        this.cropperSettings.cropperDrawSettings.strokeWidth = 2;

        this.cropperSettings.keepAspect = true;
        this.cropperSettings.preserveSize = false;

        this.data = {};
    }

    fileChangeListener($event) {
        this.selectionMode = true;
        var image: any = new Image();
        var file: File = $event.target.files[0];
        var myReader: FileReader = new FileReader();
        var that = this;
        myReader.onloadend = function (loadEvent: any) {
            image.src = loadEvent.target.result;
            that.cropper.setImage(image);
        };
        myReader.readAsDataURL(file);
        this.onImageChoosed.emit();
    }

}

@NgModule({
    declarations: [ProfileImageComponent],
    imports: [CommonModule, ImageCropperModule],
    exports: [ProfileImageComponent]
})
export class ProfileImageModule { }