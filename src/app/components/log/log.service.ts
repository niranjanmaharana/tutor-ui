import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Configuration } from 'src/app/util/config';
import { ResponseEntity } from 'src/app/model/response.entity';

@Injectable({
    providedIn: 'root'
})
export class LogService {
    constructor(private http: HttpClient) { }

    getLogs(logTypeCd: number) {
        return this.http.get<ResponseEntity>(Configuration.getApiUrl() + '/logger' +
            ((logTypeCd && logTypeCd >= 0) ? ('/' + logTypeCd) : ''));
    }
}
