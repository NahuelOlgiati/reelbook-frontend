import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // TODO Must Remove

// 3er Party
import { GrowlModule } from 'primeng/components/growl/growl';

// Components
import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header.component';
import { MenuComponent } from './layout/menu.component';
import { FooterComponent } from './layout/footer.component';
import { ProtectedComponent } from './protected/protected.component';
import { ModalDemoComponent } from './protected/modal-demo/modal-demo.component';
import { YoutubeResponseComponent } from './youtube/youtube-response.component';
import { DriveResponseComponent } from './drive/drive-response.component';

// Provider
import { CustomHttpProvider } from './shared/service/core/custom-http.provider';

// Guard
import { AuthGuard } from './shared/service/core/auth.guard';

// Services
import { GrowlMessageService } from './shared/service/core/growl-message.service';
import { SessionManager } from './shared/manager/core/session.manager';
import { ArtistWallManager } from './artist/artist-wall/artist-wall.manager';
import { OauthManager } from './shared/manager/core/oauth.manager';

// Modules
import { CoreModule } from './core/core.module';
import { AppBackendModule } from './app.backend';
import { AppRouterModule } from './app.routing';
import { HomeModule } from './home/home.module';
import { ArtistModule } from './artist/artist.module';
import { UserModule } from './user/user.module';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MenuComponent,
    FooterComponent,
    ProtectedComponent,
    ModalDemoComponent,
    YoutubeResponseComponent,
    DriveResponseComponent
  ],
  imports: [BrowserModule, FormsModule, ReactiveFormsModule,
    GrowlModule,
    AppBackendModule, AppRouterModule, CoreModule, HomeModule, ArtistModule, UserModule],
  providers: [
    CustomHttpProvider,
    AuthGuard,
    SessionManager,
    GrowlMessageService,
    ArtistWallManager,
    OauthManager
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
