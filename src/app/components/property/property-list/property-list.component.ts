import { Component, OnInit } from '@angular/core';
import { AppPrprty } from 'src/app/model/app.property.model';
import { ErrorResponseHandler } from 'src/app/util/response.message';
import { PropertyService } from 'src/app/services/property.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.scss']
})
export class PropertyListComponent implements OnInit {
  page = 1;
  public properties: AppPrprty[] = [];
  loading = false;

  constructor(private propertyService: PropertyService, private router: Router) { }

  ngOnInit(): void {
    this.propertyService.getProperties().subscribe(
      data => {
        this.properties = data.data;
      },
      error => {
        ErrorResponseHandler.getResponseMessage(error.status, error.statusText);
      });
  }

  onAddClick(): void {
    this.router.navigate(['/property/0']);
  }
}
