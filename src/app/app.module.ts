import { NgModule } from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';

// 3er Party
import { GrowlModule } from 'primeng/components/growl/growl';

// Components
import { AppComponent }   from './app.component';
import { HeaderComponent } from "./header.component";
import { MenuComponent } from "./menu.component";
import { FooterComponent } from "./footer.component";
import { HomeComponent } from "./home.component";
import { ProtectedComponent } from "./protected/protected.component";

// Services
import { GrowlMessageService } from './shared/growl-message/growl-message.service';
import { AuthGuard } from "./core/auth/auth.guard";
import { AuthService } from "./core/auth/auth.service";
import { CUSTOM_HTTP_PROVIDER } from "./core/custom-http/custom-http.provider";
import { DocumentTypeService } from './document-type/document-type.service';

// Modules
import { CoreModule } from './core/core.module';
import { AppRouterModule } from "./app.routing";
import { DocumentTypeModule } from './document-type/document-type.module';


@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        MenuComponent,
        FooterComponent,
        HomeComponent,
        ProtectedComponent
    ],
    imports: [BrowserModule, AppRouterModule, GrowlModule, CoreModule, DocumentTypeModule],
    providers: [
        AuthGuard,
        AuthService,
        CUSTOM_HTTP_PROVIDER,
        GrowlMessageService,
        DocumentTypeService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }