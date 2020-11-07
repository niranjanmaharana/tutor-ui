import { Component, OnInit } from '@angular/core';
import { EmailProperty } from 'src/app/model/email.property.model';
import { EmailPropertyService } from 'src/app/services/email.property.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorResponseHandler } from 'src/app/util/response.message';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-email-property-list',
  templateUrl: './email-property-list.component.html',
  styleUrls: ['./email-property-list.component.scss']
})
export class EmailPropertyListComponent implements OnInit {
  page = 1;
  public properties: EmailProperty[] = [];

  constructor(private propertyService: EmailPropertyService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadProperties();
  }

  loadProperties() {
    this.propertyService.getProperties().subscribe(
      data => {
        this.properties = data.data;
      },
      error => {
        Swal.fire('Error', ErrorResponseHandler.getResponseMessage(error.status, error.statusText), 'error');
      });
  }

  onAddClick(): void {
    this.router.navigate(['/email-property/0']);
  }

  onEditClick(id): void {
    this.router.navigate(['/email-property', id]);
  }

  onDeleteClick(record: EmailProperty): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.propertyService.deleteProperty(record.id).subscribe(
          data => {
            Swal.fire('Deleted!', '', 'success');
            this.loadProperties();
          },
          error => {
            ErrorResponseHandler.getResponseMessage(error.status, error.statusText);
          });
      }
    });
  }

}
