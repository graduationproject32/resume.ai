import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthInterceptorService } from './auth-interceptor.service';
import { LoggingInterceptorService } from './logging-interceptor.service';
import { HomeComponent } from './home/home.component';
import { AssesmentComponent } from './assesment/assesment.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { ResultsComponent } from './results/results.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';
import { CarouselComponent } from './home/carousel/carousel.component';
//import ngx file drop
import { NgxFileDropModule } from 'ngx-file-drop';
import { UploadComponent } from './upload/upload.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AssesmentComponent,
    LoginComponent,
    SignupComponent,
    ResultsComponent,
    NavbarComponent,
    CarouselComponent,
    UploadComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule,
    NgxUsefulSwiperModule,
    NgxFileDropModule,
  ],
  providers: [
    // Add the interceptor to the providers array.
    // The order of the interceptors is important.
    // The interceptors are executed in the order they are added to the providers array.
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoggingInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
