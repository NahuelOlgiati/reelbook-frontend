import { Component, NgModule, OnDestroy, AfterViewInit, Input, Output, ViewEncapsulation, EventEmitter, QueryList, ContentChildren, ElementRef } from '@angular/core';
import { CommonModule } from "@angular/common";
import { DomSanitizer } from '@angular/platform-browser';
import { BlockUI } from 'primeng/components/blockui/blockui';
import { PrimeTemplate } from 'primeng/components/common/shared';
import { DomHandler } from 'primeng/components/dom/domhandler';

@Component({
    selector: 'rb-blockui',
    template: `
        <div class="ui-blockui ui-widget-overlay" [ngClass]="{'ui-blockui-document':!target}" [ngStyle]="{display: blocked ? 'block' : 'none'}"></div>
    `
})
export class RbBlockui extends BlockUI implements AfterViewInit, OnDestroy {
    @Input() target: any;

    constructor(public el: ElementRef, public domHandler: DomHandler) {
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

    ngOnDestroy() {
        super.ngOnDestroy();
    }
}

@NgModule({
    imports: [CommonModule],
    exports: [RbBlockui],
    declarations: [RbBlockui]
})
export class RbBlockuiModule { }