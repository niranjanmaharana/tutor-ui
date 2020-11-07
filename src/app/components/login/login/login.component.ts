import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ErrorResponseHandler } from 'src/app/util/response.message';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  error = '';
  formLoading = false;
  returnUrl: string;

  constructor(private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute, public auth: AuthService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['niranjan', Validators.required],
      password: ['Niranjan95_', Validators.required]
    });
    this.auth.logout();
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
  }

  get f() {
    return this.loginForm.controls;
  }

  onLoginClick() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.error = '';
    this.formLoading = false;
    this.auth.login(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        data => {
          if (this.returnUrl === '' || this.returnUrl === '/') {
            this.returnUrl = '/home';
          }
          this.router.navigateByUrl(this.returnUrl);
        },
        error => {
          this.error = ErrorResponseHandler.getLoginErrorResponse(error);
        });
    this.formLoading = false;
  }

  onLogoutClick() {
    this.auth.logout();
  }
}
