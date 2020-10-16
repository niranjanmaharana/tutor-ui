import { Injectable } from '@angular/core';
import { Student } from '../model/student.model';
import { HttpClient } from '@angular/common/http';
import { map, first } from 'rxjs/operators';
import { ResponseEntity } from '../model/response.entity';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  constructor(private http: HttpClient) {
    this.getStudents();
  }

  getStudents() {
    return this.http.get<ResponseEntity>('../assets/json/students.json');
  }
}
