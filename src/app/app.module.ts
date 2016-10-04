import { NgModule } from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';

// 3er Party
import { GrowlModule } from 'primeng/components/growl/growl';

// Components
import { AppComponent }   from './app.component';
import { HeaderComponent } from "./layout/header.component";
import { MenuComponent } from "./layout/menu.component";
import { FooterComponent } from "./layout/footer.component";
import { ProtectedComponent } from "./protected/protected.component";

// Provider
import { CustomHttpProvider } from "./core/custom-http/custom-http.provider";

// Guard
import { AuthGuard } from "./core/auth/auth.guard";

// Services
import { GrowlMessageService } from './service/growl-message.service';
import { AuthService } from "./core/auth/auth.service";
import { DocumentTypeService } from './document-type/document-type.service';

// Modules
import { CoreModule } from './core/core.module';
import { AppRouterModule } from "./app.routing";
import { HomeModule } from "./home/home.module";
import { DocumentTypeModule } from './document-type/document-type.module';


@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        MenuComponent,
        FooterComponent,
        ProtectedComponent
    ],
    imports: [BrowserModule, AppRouterModule, GrowlModule, CoreModule, HomeModule, DocumentTypeModule],
    providers: [
        CustomHttpProvider,
        AuthGuard,
        AuthService,
        GrowlMessageService,
        DocumentTypeService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }