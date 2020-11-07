import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuUtilityService } from './services/menu-utility.service';
import { AuthService } from './services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { EditButtonRendererComponent } from './edit-button-renderer.component';
import { DeleteButtonRendererComponent } from './delete-button-renderer.component';
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  frameworkComponents: any;
  api: any;
  title = 'Angular Bootstap Template';
  returnUrl: string;

  columnDefs = [
    { headerName: 'Make', field: 'make', editable: true },
    { headerName: 'Model', field: 'model', editable: true },
    { headerName: 'Price', field: 'price', editable: true },
    {
      headerName: 'Edit',
      cellRenderer: 'editButtonRenderer',
      cellRendererParams: {
        onClick: this.onEditButtonClick.bind(this),
        label: 'Edit'
      },
    },
    // {
    //   headerName: 'Save',
    //   cellRenderer: 'buttonRenderer',
    //   cellRendererParams: {
    //     onClick: this.onSaveButtonClick.bind(this),
    //     label: 'Save'
    //   },
    // },
    {
      headerName: 'Delete',
      cellRenderer: 'deleteButtonRenderer',
      cellRendererParams: {
        onClick: this.onDeleteButtonClick.bind(this),
        label: 'Delete'
      },
    },
  ];

  rowData = [
    { make: 'Toyota', model: 'Celica', price: 35000 },
    { make: 'Ford', model: 'Mondeo', price: 32000 },
    { make: 'Porsche', model: 'Boxter', price: 72000 }
  ];

  onEditButtonClick(params) {
    this.api.startEditingCell({
      rowIndex: params.rowIndex,
      colKey: 'make'
    });
  }

  onSaveButtonClick(params) {
    this.api.stopEditing();
  }

  onDeleteButtonClick(params) {
    debugger;
    this.api.updateRowData({ remove: [params.data] });
  }

  onGridReady(params) {
    this.api = params.api;
  }

  constructor(public menu: MenuUtilityService, public auth: AuthService, private route: ActivatedRoute, private http: HttpClient) {
    this.frameworkComponents = {
      editButtonRenderer: EditButtonRendererComponent,
      deleteButtonRenderer: DeleteButtonRendererComponent
    };
  }

  ngOnInit() {
    $('[data-toggle="tooltip"]').tooltip();
    this.auth.refreshSessionToken();
  }

  onContinueSessionClick() {
    this.auth.continueSession();
  }

  onLogoutSessionClick() {
    this.auth.invalidateSession();
  }
}
