import { Component, ElementRef, Input, Output, OnInit, EventEmitter, ChangeDetectionStrategy, OnChanges } from '@angular/core';

@Component({
    selector: 'rb-avatar',
    template: `
        <div style="line-height: 4em;">
            <div *ngIf="props" 
                [style.background-color]="props.background" 
                [style.width] = "props.size" 
                [style.line-height]='props.lineheight' 
                [style.height] = 'props.size' 
                [style.font-size] = 'props.fontSize' 
                [style.border] = 'props.border' 
                [style.border-radius] = 'props.borderradius' 
                [style.text-align] ="props.textalign"
                style="cursor: pointer; display: inline-block" >

                <a (click)="onClick.emit()">
                    <div [style.color]='fontColor'>{{props.letter}}</div>
                </a>

            </div>
        </div>
            `,
    changeDetection: ChangeDetectionStrategy.OnPush

})
export class AvatarComponent implements OnInit, OnChanges 
{
    @Input('avatardata') avatarData: any;
    @Output() onClick: EventEmitter<any> = new EventEmitter();
    letterSrc: string;
    background: string = 'red';
    fontSize: number = 49;
    padding: number = 28;
    letter: string = "?";
    size: number = 100;
    fontColor: string = '#FFFFFF';
    border: string;
    props: Object = null;
    private _el: HTMLElement;

    constructor(el: ElementRef) {
        this._el = el.nativeElement;
    }

    test() {
        this.generateLetter();
    }

    generateLetter() {
        if (!this.avatarData) {
            throw Error("LetterAvatarDirective configdata not provides");
        }
        if (!this.avatarData.text) {
            this.avatarData.text = '?';
        }
        var size = this.avatarData && this.avatarData.size ? this.avatarData.size : 100;
        this.fontColor = this.avatarData.fontColor ? this.avatarData.fontColor : "#FFFFFF";
        var isSquare = this.avatarData && this.avatarData.isSquare ? true : false;
        var border = this.avatarData && this.avatarData.border ? this.avatarData.border : "1px solid #d3d3d3";
        var background = this.avatarData && this.avatarData.background ? this.avatarData.background : null;
        var text = this.avatarData && this.avatarData.text ? this.avatarData.text : null;
        this.background = background;
        var textArray = text.split(' ');
        var letter = textArray[0].substr(0, 1) + '' + (textArray.length > 1 ? textArray[1].substr(0, 1) : '');
        letter = letter.toUpperCase();
        this.fontSize = (39 * size) / 100;
        this.padding = (28 * size) / 100;
        this.letter = letter;
        this.size = size;
        this.props = new Object();
        this.props['size'] = size + 'px';
        this.props['lineheight'] = this.size + 'px';
        this.props['letter'] = letter;
        this.props['fontSize'] = this.fontSize + 'px';
        if (isSquare) {
            this.props['borderradius'] = '0%';
        } else {
            this.props['borderradius'] = '50%';
        }
        this.props['textalign'] = 'center';
        this.props['border'] = border;
        this.props['background'] = background;
        if (this.avatarData.fixedColor && !background) {
            this.props['background'] = background || this.colorize(letter);
        } else {
            this.props['background'] = background || this.getRandomColor();
        }
        return true;
    };

    getRandomColor() {
        var letters = '0123456789ABCDEF'.split('');
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    colorize(str) {
        for (var i = 0, hash = 0; i < str.length; hash = str.charCodeAt(i++) + ((hash << 5) - hash));
        var color = Math.floor(Math.abs((Math.sin(hash) * 10000) % 1 * 16777216)).toString(16);
        return '#' + Array(6 - color.length + 1).join('0') + color;
    }

    ngOnInit() {
        this.generateLetter();
    }

    ngOnChanges(...args: any[]) {
        this.generateLetter();
    }
}