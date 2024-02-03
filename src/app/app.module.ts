import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AuthInterceptor } from './services/auth.interceptor';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { UsersModule } from './users/users.module';
import { LoadingBallComponent } from './shared/loading-ball/loading-ball.component';
import { PostsModule } from './posts/posts.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ImageSliderComponent } from './image-slider/image-slider.component';
import { CardPageComponent } from './card-page/card-page.component';
import { AccordionModule } from 'primeng/accordion';
import { CompanyComponent } from './company/company/company.component';
import { PostsAddComponent } from './company/posts-add/posts-add.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { DialogModule } from 'primeng/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CalendarModule } from 'primeng/calendar';
import { FooterComponent } from './footer/footer.component';
import { MenuModule } from 'primeng/menu';
import { ToastModule } from 'primeng/toast';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';

import { SharedModule } from './shared/shared.module';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { PostsEditComponent } from './company/posts-edit/posts-edit.component';
import { AUTH_STATE_NAME, AuthEffects } from './auth/state/auth.effects';
import { appReducer } from './store/app.state';
import { AuthReducer } from './auth/state/auth.reducer';
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    LoadingBallComponent,
    ImageSliderComponent,
    CardPageComponent,
    CompanyComponent,
    PostsAddComponent,
    FooterComponent,
    PostsEditComponent,
  ],
  imports: [
    StoreModule.forFeature(AUTH_STATE_NAME, AuthReducer),
    StoreModule.forRoot(AuthReducer),
    EffectsModule.forRoot([AuthEffects]),
    SharedModule,
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    PostsModule,
    UsersModule,
    BrowserAnimationsModule,
    DialogModule,
    ButtonModule,
    AccordionModule,
    AvatarModule,
    AvatarGroupModule,
    ReactiveFormsModule,
    InputTextModule,
    InputTextareaModule,
    CalendarModule,
    DividerModule,
    ToastModule,
    MenuModule,
    DropdownModule,
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: !isDevMode(),
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
