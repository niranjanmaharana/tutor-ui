import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-control',
  templateUrl: './form-control.component.html',
  styleUrls: ['./form-control.component.scss']
})
export class FormControlComponent implements OnInit {
  @Input() formGroup: FormGroup;
  @Input() formControls: any;
  @Input() formOptions: any;
  @Input() component: any;

  public collection = [];

  constructor() {
    for (let i = 1; i <= 10; i++) {
      this.collection.push(`Angular: ${i}`);
    }
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.component.onSubmit();
  }

}
