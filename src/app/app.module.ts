import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MomentModule } from 'angular2-moment';
import { AgGridModule } from 'ag-grid-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { ControlMessagesComponent } from './components/control-messages/control-messages.component';
import { HomeComponent } from './components/home/home.component';
import { LoaderInterceptor } from './interceptors/loader.interceptor';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { LoaderService } from './services/loader.service';
import { HttpLoaderComponent } from './components/http-loader/http-loader.component';
import { ResetPasswordComponent } from './components/login/reset-password/reset-password.component';
import { TableComponent } from './components/table/table.component';
import { ContactComponent } from './components/contact/contact.component';
import { AboutComponent } from './components/about/about.component';
import { StudentListComponent } from './components/student/student-list/student-list.component';
import { StudentDetailComponent } from './components/student/student-detail/student-detail.component';
import { PropertyListComponent } from './components/property/property-list/property-list.component';
import { PropertyDetailComponent } from './components/property/property-detail/property-detail.component';
import { FormControlComponent } from './components/form-control/form-control.component';
import { ForgotPasswordComponent } from './components/login/forgot-password/forgot-password.component';
import { LoginComponent } from './components/login/login/login.component';
import { EmailPropertyComponent } from './components/email-property/email-property/email-property.component';
import { EmailPropertyListComponent } from './components/email-property/email-property-list/email-property-list.component';
import { LogComponent } from './components/log/log.component';
import { DeleteButtonRendererComponent } from './delete-button-renderer.component';
import { EditButtonRendererComponent } from './edit-button-renderer.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NavigationComponent,
    ControlMessagesComponent,
    HomeComponent,
    LoginComponent,
    HttpLoaderComponent,
    ResetPasswordComponent,
    TableComponent,
    ContactComponent,
    AboutComponent,
    StudentListComponent,
    StudentDetailComponent,
    PropertyListComponent,
    PropertyDetailComponent,
    FormControlComponent,
    ForgotPasswordComponent,
    EmailPropertyComponent,
    EmailPropertyListComponent,
    LogComponent,
    DeleteButtonRendererComponent,
    EditButtonRendererComponent
  ],
  imports: [
    BrowserModule,
    NgIdleKeepaliveModule.forRoot(),
    AgGridModule.withComponents([]),
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
