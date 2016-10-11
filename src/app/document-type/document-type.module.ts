import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PanelModule } from 'primeng/components/panel/panel';
import { AutoCompleteModule } from 'primeng/components/autocomplete/autocomplete';
import { DataTableModule } from 'primeng/components/datatable/datatable';
import { DataGridModule } from 'primeng/components/datagrid/datagrid';
import { DialogModule } from 'primeng/components/dialog/dialog';
import { PaginatorModule } from 'primeng/components/paginator/paginator';
import { TabViewModule } from 'primeng/components/tabview/tabview';
import { CarouselModule } from 'primeng/components/carousel/carousel';
import { GrowlModule } from 'primeng/components/growl/growl';
import { FileUploadModule } from 'primeng/components/fileupload/fileupload';

import { DocumentTypeListComponent } from './document-type-list/document-type-list.component';
import { DocumentTypeItemComponent } from './document-type-item/document-type-item.component';
import { DocumentTypeWallComponent } from './document-type-wall/document-type-wall.component';
import { DocumentTypeTagSearchComponent } from './document-type-tag-search/document-type-tag-search.component';

import { HighlightDirective } from './document-type-wall/highlight.directive';
import { UnlessDirective } from './document-type-wall/unless.directive';

@NgModule({
    declarations: [
        DocumentTypeListComponent,
        DocumentTypeItemComponent,
        DocumentTypeWallComponent,
        DocumentTypeTagSearchComponent,
        HighlightDirective,
        UnlessDirective
    ],
    imports: [CommonModule, FormsModule, ReactiveFormsModule, PanelModule, AutoCompleteModule, DataTableModule, DataGridModule, DialogModule, PaginatorModule, TabViewModule, CarouselModule, GrowlModule, FileUploadModule],
    exports: [DocumentTypeListComponent, DocumentTypeWallComponent]
})
export class DocumentTypeModule { }