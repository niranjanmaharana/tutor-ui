import { Component, OnInit } from '@angular/core';
import { ErrorResponseHandler } from 'src/app/util/response.message';
import { StudentService } from 'src/app/services/student.service';
import { Student } from 'src/app/model/student.model';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit {

  page = 1;
  public students: Student[] = [];
  constructor(private studentService: StudentService) { }

  ngOnInit(): void {
    this.studentService.getStudents().subscribe(
      data => {
        this.students = data.data;
      },
      error => {
        ErrorResponseHandler.getResponseMessage(error.status, error.statusText);
      });
  }

}
