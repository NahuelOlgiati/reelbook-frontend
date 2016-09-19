import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";

import { PanelModule } from 'primeng/components/panel/panel';
import { AutoCompleteModule } from 'primeng/components/autocomplete/autocomplete';
import { DataTableModule } from 'primeng/components/datatable/datatable';
import { TabViewModule } from 'primeng/components/tabview/tabview';
import { CarouselModule } from 'primeng/components/carousel/carousel';
import { GrowlModule } from 'primeng/components/growl/growl';

import { DocumentTypeListComponent } from './document-type-list/document-type-list.component';
import { DocumentTypeItemComponent } from './document-type-item/document-type-item.component';

@NgModule({
    declarations: [
        DocumentTypeListComponent,
        DocumentTypeItemComponent
    ],
    imports: [CommonModule, PanelModule, AutoCompleteModule, DataTableModule, TabViewModule, CarouselModule, GrowlModule],
    exports: [DocumentTypeListComponent]
})
export class DocumentTypeModule { }