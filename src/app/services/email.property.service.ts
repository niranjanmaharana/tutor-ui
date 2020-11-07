import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResponseEntity } from '../model/response.entity';
import { Configuration } from '../util/config';
import { EmailProperty } from '../model/email.property.model';

@Injectable({
    providedIn: 'root'
})
export class EmailPropertyService {
    constructor(private http: HttpClient) { }

    getProperties() {
        return this.http.get<ResponseEntity>(Configuration.getApiUrl() + '/email-property/');
    }

    getProperty(id) {
        return this.http.get<ResponseEntity>(Configuration.getApiUrl() + '/email-property/' + id);
    }

    saveProperty(property: EmailProperty) {
        if (property.id && property.id > 0) {
            return this.http.put<ResponseEntity>(Configuration.getApiUrl() + '/email-property/', property);
        } else {
            return this.http.post<ResponseEntity>(Configuration.getApiUrl() + '/email-property/', property);
        }
    }

    deleteProperty(id: number) {
        return this.http.delete<ResponseEntity>(Configuration.getApiUrl() + '/email-property/' + id);
    }
}
