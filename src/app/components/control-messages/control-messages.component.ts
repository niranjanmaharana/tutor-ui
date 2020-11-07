import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ValidationService } from 'src/app/services/validation-service.service';

@Component({
  selector: 'app-control-messages',
  template: `<div class='text-danger' *ngIf="errorMsg">{{errorMsg}}</div>`,
  styleUrls: ['./control-messages.component.scss']
})
export class ControlMessagesComponent implements OnInit {
  @Input() control: FormControl;
  constructor() { }

  ngOnInit() {
  }

  get errorMsg() {
    for (const prprtyNm in this.control.errors) {
      if (this.control.errors.hasOwnProperty(prprtyNm) && this.control.touched) {
        return ValidationService.getValidatorErrorMessage(prprtyNm, this.control.errors[prprtyNm]);
      }
    }
    return null;
  }
}
