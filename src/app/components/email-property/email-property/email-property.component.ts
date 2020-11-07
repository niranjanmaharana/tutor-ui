import { Component, OnInit } from '@angular/core';
import { EmailProperty } from 'src/app/model/email.property.model';
import { EmailPropertyService } from 'src/app/services/email.property.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorResponseHandler } from 'src/app/util/response.message';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-email-property',
  templateUrl: './email-property.component.html',
  styleUrls: ['./email-property.component.scss']
})
export class EmailPropertyComponent implements OnInit {
  property: EmailProperty = null;
  edit: boolean;
  errorMsg = '';
  message = '';
  prptyId = null;
  propertyForm = this.formBuilder.group({
    id: [this.prptyId],
    purpose: ['', Validators.required],
    emailHost: ['', Validators.required],
    emailPort: ['', [Validators.required]],
    protocol: ['', Validators.required],
    auth: [false, Validators.required],
    starttls: [false, [Validators.required]],
    defaultEncoding: ['UTF-8', Validators.required],
    username: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    emailFrom: ['', [Validators.required, Validators.email]]
  });

  status = [{
    key: true,
    value: 'Active'
  }, {
    key: false,
    value: 'Inactive'
  }];

  constructor(private propertyService: EmailPropertyService, private formBuilder: FormBuilder,
              private route: ActivatedRoute, private router: Router) { }

  get f() {
    return this.propertyForm.controls;
  }

  ngOnInit(): void {
    this.prptyId = this.route.snapshot.paramMap.get('id');
    this.edit = this.prptyId > 0;
    if (this.prptyId > 0) {
      this.propertyService.getProperty(this.prptyId).subscribe(
        data => {
          this.property = data.data;
          this.pathFormValues();
        },
        error => {
          Swal.fire('Error', ErrorResponseHandler.getResponseMessage(error.status, error.statusText), 'error');
        });
    }
  }

  pathFormValues() {
    this.propertyForm.patchValue({
      id: this.property.id,
      purpose: this.property.purpose,
      emailHost: this.property.emailHost,
      emailPort: this.property.emailPort,
      protocol: this.property.protocol,
      auth: this.property.auth,
      starttls: this.property.starttls,
      defaultEncoding: this.property.defaultEncoding,
      username: this.property.username,
      password: this.property.password,
      emailFrom: this.property.emailFrom
    });
  }

  onBackToListClick() {
    this.router.navigate(['/email-property']);
  }

  onSameAsUsernameChange() {
    this.f.emailFrom.setValue(this.f.username.value);
  }

  onResetClick(): void {
    this.propertyForm.reset();
  }

  onSubmit(): void {
    if (!this.propertyForm.valid) {
      this.errorMsg = 'Invalid form values! Please input the required values.';
      return;
    }
    this.propertyService.saveProperty(this.propertyForm.value).subscribe(
      data => {
        Swal.fire('Saved', 'Property saved successfully.', 'success');
        if (!this.edit) {
          this.propertyForm.reset();
        }
      },
      error => {
        this.errorMsg = ErrorResponseHandler.getResponse(error);
        this.message = '';
      });
  }

}
