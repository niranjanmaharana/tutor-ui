import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { EmailProperty } from 'src/app/model/email.property.model';
import { ErrorResponseHandler } from 'src/app/util/response.message';
import { LogService } from './log.service';
import { Log } from 'src/app/model/log.model';
import { LogType } from 'src/app/model/log.type.model';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.scss']
})
export class LogComponent implements OnInit {
  public page = 1;
  public logs: Log[] = [];
  public logger: Log;
  public showDesc = false;
  public logTypeForm: FormGroup = null;
  public logTypes: LogType[] = [{
    key: 0,
    value: 'Info',
    type: 'success'
  }, {
    key: 1,
    value: 'Error',
    type: 'danger'
  }, {
    key: 3,
    value: 'Debug',
    type: 'warning'
  }];

  constructor(private logService: LogService, public fb: FormBuilder) { }

  ngOnInit(): void {
    this.loadLogs(-1);
    this.logTypeForm = this.fb.group({
      logTypeCd: [-1]
    });
  }

  loadLogs(logTypeCd: number) {
    this.logService.getLogs(logTypeCd).subscribe(
      data => {
        this.logs = data.data;
      },
      error => {
        Swal.fire('Error', ErrorResponseHandler.getResponseMessage(error.status, error.statusText), 'error');
      });
  }

  getLogTypeValue(logTypeCd: number, property: string) {
    const logType: LogType = this.getLogType(logTypeCd);
    return logType && logType[property] ? logType[property] : '';
  }

  getLogType(logTypeCd: number): LogType {
    for (const lt of this.logTypes) {
      if (lt.key === logTypeCd) {
        return lt;
      }
    }
    return null;
  }

  onLogTypeChange(): void {
    console.log(this.logTypeForm.controls.logTypeCd.value);
    this.loadLogs(this.logTypeForm.controls.logTypeCd.value);
  }

  onShowDescClick(record: Log) {
    debugger;
    this.logger = Object.assign({}, record);
    this.showDesc = true;
  }
}
