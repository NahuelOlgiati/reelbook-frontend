import { Directive, HostListener, HostBinding, Input } from '@angular/core';

/**
    @Example:<div [highlight]="'blue'" [defaultColor]="'red'">Some Text</div>
*/
@Directive({
    selector: '[highlight]'
})
export class HighlightDirective {
    @HostListener('mouseenter') mouseover() {
        this.backgroundColor = this.highlightColor;
    };
    @HostListener('mouseleave') mouseleave() {
        this.backgroundColor = this.defaultColor;
    };
    @HostBinding('style.backgroundColor') get setColor() {
      return this.backgroundColor;
    };
    @Input() defaultColor = 'white';
    @Input('highlight') highlightColor = 'green';

    private backgroundColor: string;

    ngOnInit() {
        this.backgroundColor = this.defaultColor;
    }
}
