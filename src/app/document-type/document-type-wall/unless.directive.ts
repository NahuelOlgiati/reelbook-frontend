import { Directive, TemplateRef, ViewContainerRef, Input } from '@angular/core';

/**
    @Example:<div *unless="false" class="ZARAZA">Conditional Text</div>
*/
@Directive({
    selector: '[unless]'
})
export class UnlessDirective {
    @Input() set unless(condition: boolean) {
        console.log(this.vcRef.element.nativeElement.class);
        
        if (!condition) {
            this.vcRef.createEmbeddedView(this.templateRef);
        } else {
            this.vcRef.clear();
        }
    }

    constructor(private templateRef: TemplateRef<any>, private vcRef: ViewContainerRef) {
        console.log(this.vcRef.element.nativeElement.class);
    }
}