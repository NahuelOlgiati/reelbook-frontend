import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // TODO Must Remove

// 3er Party
import { GrowlModule } from 'primeng/components/growl/growl';
import { SelectButtonModule } from 'primeng/components/selectbutton/selectbutton';

// Components
import { AppComponent } from './app.component';
import { HeaderComponent } from "./layout/header.component";
import { MenuComponent } from "./layout/menu.component";
import { FooterComponent } from "./layout/footer.component";
import { ProtectedComponent } from "./protected/protected.component";
import { ModalDemoComponent } from "./protected/modal-demo/modal-demo.component";

// Provider
import { CustomHttpProvider } from "./shared/service/core/custom-http.provider";

// Guard
import { AuthGuard } from "./shared/service/core/auth.guard";

// Services
import { GrowlMessageService } from './shared/service/core/growl-message.service';
import { AuthService } from "./shared/service/core/auth.service";
import { SessionService } from "./shared/service/core/session.service";
import { DocumentTypeService } from './document-type/document-type.service';
import { ArtistService } from './shared/service/artist.service';
import { ArtistWallManager } from './artist/artist-wall/artist-wall.manager';
import { UserService } from './shared/service/user.service';
import { UserManager } from './shared/manager/user.manager';

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
    imports: [BrowserModule, FormsModule, ReactiveFormsModule,
        GrowlModule, SelectButtonModule,
        AppRouterModule, CoreModule, HomeModule, DocumentTypeModule, ArtistModule],
    providers: [
        CustomHttpProvider,
        AuthGuard,
        AuthService,
        SessionService,
        GrowlMessageService,
        DocumentTypeService,
        ArtistService,
        ArtistWallManager,
        UserService,
        UserManager
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }