import { Component, OnInit } from '@angular/core';
import { ResetPassword } from 'src/app/model/reset.password.model';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ErrorResponseHandler } from 'src/app/util/response.message';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  password: ResetPassword = null;
  token: string;
  passwordResetForm = null;
  errorMsg = '';
  message = '';

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.passwordResetForm = this.formBuilder.group({
      newPassword: ['Niranjan95_', Validators.required],
      confirmPassword: ['Niranjan95_', [Validators.required]]
    });
    this.token = this.route.snapshot.paramMap.get('token');
  }

  f(): any {
    return this.passwordResetForm.controls;
  }

  onSubmit(): void {
    if (!this.passwordResetForm.valid) {
      this.errorMsg = 'Invalid form values! Please input the required values.';
      return;
    }

    if (this.f().newPassword.value !== this.f().confirmPassword.value) {
      this.message = '';
      this.errorMsg = 'The passwords do not match!';
      return;
    }

    this.password = new ResetPassword(this.token, this.f().newPassword.value);
    this.authService.resetPassword(this.password).subscribe(
      data => {
        this.message = 'Your password has been reset successfully. Please login now with your new password.';
        this.errorMsg = '';
      },
      error => {
        this.errorMsg = ErrorResponseHandler.getResponse(error);
        this.message = '';
      });
  }
}
