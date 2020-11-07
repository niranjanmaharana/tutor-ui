import { Component, OnInit } from '@angular/core';
import { AppPrprty } from 'src/app/model/app.property.model';
import { PropertyService } from 'src/app/services/property.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorResponseHandler } from 'src/app/util/response.message';

@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.scss']
})
export class PropertyDetailComponent implements OnInit {
  property: AppPrprty = null;
  edit: boolean;
  errorMsg = '';
  message = '';
  prptyId = null;
  propertyForm = this.formBuilder.group({
    prprtyKey: ['', Validators.required],
    prprtyValue: ['', [Validators.required]],
    prprtyDesc: ['', [Validators.required]],
    active: [false, Validators.required]
  });

  status = [{
    key: true,
    value: 'Active'
  }, {
    key: false,
    value: 'Inactive'
  }];

  constructor(private propertyService: PropertyService, private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router) { }

  get f() {
    return this.propertyForm.controls;
  }

  ngOnInit(): void {
    this.prptyId = this.route.snapshot.paramMap.get('id');
    this.edit = this.prptyId > 0;
  }

  onBackToListClick() {
    this.router.navigate(['/property']);
  }

  onResetClick(): void {
    this.propertyForm.reset();
  }

  onSubmit(): void {
    if (!this.propertyForm.valid){
      this.errorMsg = 'Invalid form values! Please input the required values.';
      return;
    }
    this.propertyService.saveProperty(this.propertyForm.value).subscribe(
      data => {
        this.message = 'Property has been saved.';
        this.errorMsg = '';
        this.propertyForm.reset();
      },
      error => {
        this.errorMsg = ErrorResponseHandler.getResponse(error);
        this.message = '';
      });
  }
}
