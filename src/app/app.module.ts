import { NgModule } from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // TODO Must Remove

// 3er Party
import { GrowlModule } from 'primeng/components/growl/growl';

// Components
import { AppComponent }   from './app.component';
import { HeaderComponent } from "./layout/header.component";
import { MenuComponent } from "./layout/menu.component";
import { FooterComponent } from "./layout/footer.component";
import { ProtectedComponent } from "./protected/protected.component";
import { ModalDemoComponent } from "./protected/modal-demo/modal-demo.component";

// Provider
import { CustomHttpProvider } from "./core/custom-http/custom-http.provider";

// Guard
import { AuthGuard } from "./core/auth/auth.guard";

// Services
import { GrowlMessageService } from './service/growl-message.service';
import { AuthService } from "./core/auth/auth.service";
import { DocumentTypeService } from './document-type/document-type.service';
import { ArtistService } from './artist/artist.service';

// Modules
import { CoreModule } from './core/core.module';
import { AppRouterModule } from "./app.routing";
import { HomeModule } from "./home/home.module";
import { DocumentTypeModule } from './document-type/document-type.module';
import { ArtistModule } from './artist/artist.module';


@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        MenuComponent,
        FooterComponent,
        ProtectedComponent,
        ModalDemoComponent
    ],
    imports: [BrowserModule, FormsModule, ReactiveFormsModule, AppRouterModule, GrowlModule, CoreModule, HomeModule, DocumentTypeModule, ArtistModule],
    providers: [
        CustomHttpProvider,
        AuthGuard,
        AuthService,
        GrowlMessageService,
        DocumentTypeService,
        ArtistService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }