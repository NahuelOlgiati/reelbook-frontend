import { Component, ViewChild, Type } from '@angular/core';
import { ImageCropperComponent, CropperSettings, Bounds } from 'ng2-img-cropper';

@Component({
    selector: 'test-app',
    template: `
<div class="page-header">
  <h1>angular2-img-cropper <small>samples</small></h1>
</div>
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
export class TestComponent extends Type {

    //Cropper 1 data
    public data1: any;
    public cropperSettings1: CropperSettings;

    //Cropper 2 data
    public data2: any;
    public cropperSettings2: CropperSettings;
    @ViewChild('cropper', undefined)
    public cropper: ImageCropperComponent;


    constructor() {
        super();

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

        this.cropperSettings1.cropperDrawSettings.strokeColor = 'rgba(255,255,255,1)';
        this.cropperSettings1.cropperDrawSettings.strokeWidth = 2;

        this.cropperSettings1.keepAspect = true;
        this.cropperSettings1.preserveSize = false;

        this.data1 = {};


        //Cropper settings 2
        this.cropperSettings2 = new CropperSettings();
        this.cropperSettings2.width = 200;
        this.cropperSettings2.height = 200;
        this.cropperSettings2.keepAspect = false;

        this.cropperSettings2.croppedWidth = 200;
        this.cropperSettings2.croppedHeight = 200;

        this.cropperSettings2.canvasWidth = 500;
        this.cropperSettings2.canvasHeight = 300;

        this.cropperSettings2.minWidth = 100;
        this.cropperSettings2.minHeight = 100;

        this.cropperSettings2.rounded = true;
        this.cropperSettings2.minWithRelativeToResolution = false;

        this.cropperSettings2.cropperDrawSettings.strokeColor = 'rgba(255,255,255,1)';
        this.cropperSettings2.cropperDrawSettings.strokeWidth = 2;
        this.cropperSettings2.noFileInput = true;

        this.data2 = {};

    }

    public cropped(bounds: Bounds) {
        console.log(bounds);
    }

    /**
     * Used to send image to second cropper
     * @param $event
     */
    public fileChangeListener($event: any) {
        var image: any = new Image();
        var file: File = $event.target.files[0];
        var myReader: FileReader = new FileReader();
        var that = this;
        myReader.addEventListener('loadend', function (loadEvent: any) {
            image.src = loadEvent.target.result;
            that.cropper.setImage(image);
        });

        myReader.readAsDataURL(file);
    }
}