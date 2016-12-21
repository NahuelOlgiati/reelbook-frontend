import { Component, NgModule, OnDestroy, AfterViewInit, Input, Output, ViewEncapsulation, EventEmitter, QueryList, ContentChildren, ElementRef, Renderer} from '@angular/core';
import { CommonModule } from "@angular/common";
import { DomSanitizer } from '@angular/platform-browser';
import { BlockUI } from 'primeng/components/blockui/blockui';
import { PrimeTemplate } from 'primeng/components/common/shared';
import { DomHandler } from 'primeng/components/dom/domhandler';

@Component({
    selector: 'rb-blockUI',
    template: `
<div class="ui-blockui ui-widget-overlay" [ngClass]="{'ui-blockui-document':!target}" [ngStyle]="{display: blocked ? 'block' : 'none'}">
    <div class="loading-wrapper">

        <svg viewBox="0 0 120 120" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <symbol id="s--circle">
            <circle r="10" cx="20" cy="20"></circle>
        </symbol>
        <g class="g-circles g-circles">
            <g class="g--circle">
            <use xlink:href="#s--circle" class="u--circle" />
            </g>
            <g class="g--circle">
            <use xlink:href="#s--circle" class="u--circle" />
            </g>
            <g class="g--circle">
            <use xlink:href="#s--circle" class="u--circle" />
            </g>
            <g class="g--circle">
            <use xlink:href="#s--circle" class="u--circle" />
            </g>
            <g class="g--circle">
            <use xlink:href="#s--circle" class="u--circle" />
            </g>
            <g class="g--circle">
            <use xlink:href="#s--circle" class="u--circle" />
            </g>
            <g class="g--circle">
            <use xlink:href="#s--circle" class="u--circle" />
            </g>
            <g class="g--circle">
            <use xlink:href="#s--circle" class="u--circle" />
            </g>
            <g class="g--circle">
            <use xlink:href="#s--circle" class="u--circle" />
            </g>
            <g class="g--circle">
            <use xlink:href="#s--circle" class="u--circle" />
            </g>
            <g class="g--circle">
            <use xlink:href="#s--circle" class="u--circle" />
            </g>
            <g class="g--circle">
            <use xlink:href="#s--circle" class="u--circle" />
            </g>
        </g>
        </svg>

    </div>
</div>
    `
})
export class RbBlockUI extends BlockUI implements AfterViewInit, OnDestroy {
    @Input() target: any;

    constructor(public el: ElementRef, public domHandler: DomHandler, private _renderer: Renderer) {
        super(el, domHandler);
    }

    @Input() get blocked(): boolean {
        return this._blocked;
    }

    set blocked(val: boolean) {
        this._blocked = val;

        if (this._mask) {
            if (this._blocked)
                this.block();
            else
                this.unblock();
        }
    }

    ngAfterViewInit() {
        try {
            super.ngAfterViewInit();
        }
        catch (e) {
        }
    }

    block() {
        if(this.target) {
            this.target.getBlockableElement().appendChild(this._mask);
            this.target.getBlockableElement().style.position = 'relative';
        }
        else {
            let wrapper = document.body.children[0].children[0];
            wrapper.className = 'blur';
            this._mask.children[0].style.position = 'absolute';
            document.body.appendChild(this._mask);
        }
        
        this._mask.style.zIndex = String(++DomHandler.zindex);
    }

    ngOnDestroy() {
        super.ngOnDestroy();
    }
}

@NgModule({
    imports: [CommonModule],
    exports: [RbBlockUI],
    declarations: [RbBlockUI]
})
export class RbBlockUIModule { }