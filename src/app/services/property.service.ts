import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResponseEntity } from '../model/response.entity';
import { AppPrprty } from '../model/app.property.model';
import { Configuration } from '../util/config';

@Injectable({
    providedIn: 'root'
})
export class PropertyService {
    constructor(private http: HttpClient) { }

    getProperties() {
        return this.http.get<ResponseEntity>(Configuration.getApiUrl() + '/property/');
    }

    saveProperty(property: AppPrprty) {
        return this.http.post<ResponseEntity>(Configuration.getApiUrl() + '/property/', property);
    }
}
