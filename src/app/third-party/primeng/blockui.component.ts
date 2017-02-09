import { Component, NgModule, OnDestroy, AfterViewInit, Input, ElementRef, Renderer } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlockUI } from 'primeng/components/blockui/blockui';
import { DomHandler } from 'primeng/components/dom/domhandler';

@Component({
  selector: 'rb-blockUI',
  template: `
<div class="ui-blockui ui-widget-overlay" [ngClass]="{'ui-blockui-document':!target}" [ngStyle]="{display: blocked ? 'block' : 'none'}">
    <svg class="spinner-container" viewBox="0 0 44 44">
        <circle class="path" cx="22" cy="22" r="20" fill="none" stroke-width="4"></circle>
    </svg>
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
    } catch (e) {
      throw new Error(e);
    }
  }

  block() {
    if (this.target) {
      if (this.target.getBlockableElement) {
        this.target.getBlockableElement().appendChild(this._mask);
        this.target.getBlockableElement().style.position = 'relative';
      } else if (this.target instanceof HTMLElement) {
        const element = <HTMLElement>this.target;
        element.appendChild(this._mask);
        element.style.position = 'relative';
      } else {
        throw new Error('Invalid Target for BlockUI');
      }
    } else {
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
  declarations: [RbBlockUI],
  providers: [DomHandler]
})
export class RbBlockUIModule { }