import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ErrorComponent } from './components/error/error.component';
import { LoginComponent } from './components/login/login/login.component';
import { ForgotPasswordComponent } from './components/login/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/login/reset-password/reset-password.component';
import { AuthGuard } from './guards/auth.guard';
import { TableComponent } from './components/table/table.component';
import { ContactComponent } from './components/contact/contact.component';
import { AboutComponent } from './components/about/about.component';
import { PropertyListComponent } from './components/property/property-list/property-list.component';
import { StudentListComponent } from './components/student/student-list/student-list.component';
import { StudentDetailComponent } from './components/student/student-detail/student-detail.component';
import { PropertyDetailComponent } from './components/property/property-detail/property-detail.component';
import { EmailPropertyListComponent } from './components/email-property/email-property-list/email-property-list.component';
import { EmailPropertyComponent } from './components/email-property/email-property/email-property.component';
import { LogComponent } from './components/log/log.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'forgotPassword', component: ForgotPasswordComponent },
  { path: 'reset/:token', component: ResetPasswordComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'logs', component: LogComponent, canActivate: [AuthGuard] },
  { path: 'property', component: PropertyListComponent, canActivate: [AuthGuard] },
  { path: 'property/:id', component: PropertyDetailComponent, canActivate: [AuthGuard] },
  { path: 'email-property', component: EmailPropertyListComponent, canActivate: [AuthGuard] },
  { path: 'email-property/:id', component: EmailPropertyComponent, canActivate: [AuthGuard] },
  { path: 'student', component: StudentListComponent, canActivate: [AuthGuard] },
  { path: 'student/:id', component: StudentDetailComponent, canActivate: [AuthGuard] },
  { path: 'contact', component: ContactComponent, canActivate: [AuthGuard] },
  { path: 'about', component: AboutComponent, canActivate: [AuthGuard] },
  { path: 'table', component: TableComponent, canActivate: [AuthGuard] },
  { path: '**', component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
