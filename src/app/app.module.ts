import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { MomentModule } from 'angular2-moment';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { LoaderInterceptor } from './interceptors/loader.interceptor';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { LoaderService } from './services/loader.service';
import { HttpLoaderComponent } from './components/http-loader/http-loader.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { TableComponent } from './components/table/table.component';
import { StudentComponent } from './components/student/student.component';
import { StudentListComponent } from './components/student/student-list/student-list.component';
import { StudentDetailComponent } from './components/student/student-detail/student-detail.component';
import { ContactComponent } from './components/contact/contact.component';
import { AboutComponent } from './components/about/about.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NavigationComponent,
    HomeComponent,
    LoginComponent,
    HttpLoaderComponent,
    ResetPasswordComponent,
    TableComponent,
    StudentComponent,
    StudentListComponent,
    StudentDetailComponent,
    ContactComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    NgIdleKeepaliveModule.forRoot(),
    MomentModule,
    NgxPaginationModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    LoaderService,
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
