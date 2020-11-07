import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ErrorResponseHandler } from 'src/app/util/response.message';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm: FormGroup;
  submitted = false;
  errorMsg = '';
  message = '';

  constructor(private formBuilder: FormBuilder, private router: Router, public auth: AuthService) { }

  get formControls() {
    return this.forgotPasswordForm.controls;
  }

  ngOnInit() {
    this.forgotPasswordForm = this.formBuilder.group({
      email: ['niranjanmaharana95@gmail.com', Validators.required]
    });
  }

  onSubmitClick() {
    this.submitted = true;
    if (this.forgotPasswordForm.invalid) {
      return;
    }
    this.auth.forgotPassword(this.formControls.email.value).pipe(first()).subscribe(
      data => {
        this.message = 'We have sent an email with reset link. Please follow the steps to reset your password.';
        this.errorMsg = '';
      },
      error => {
        this.errorMsg = ErrorResponseHandler.getResponse(error);
        this.message = '';
      });
  }
}
