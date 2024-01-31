import { Component, AfterViewInit, ViewChild, OnInit } from '@angular/core';
import { PrismService } from '../../Prism.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-renderer',
  templateUrl: './renderer.component.html',
  styleUrls: ['./renderer.component.scss']
})
export class RendererComponent implements AfterViewInit {

  private studentData: any = {}; 

  fullName: string;



  @ViewChild('formio') formIO: any;



  fetchStudentData() {
    this.http.get<any>(
      'https://directcoreapi.bau.edu.lb/eventapi/Student/202100579'
    )
      .subscribe((response) => {
        const student = response[0]; 

        this.studentData.pidm = student.pidm;
        this.studentData.studentID = student.studentID;
        this.studentData.fullName = student.fullName;
        this.studentData.faculty = student.faculty;
        this.studentData.campus = student.campus;
        this.studentData.program = student.program;


        this.fullName = this.studentData.fullName;

        console.log(this.fullName);



      });
  }

  onSubmit2() {

    const formData = new FormData();
    formData.append('name', this.formIO.value.name);
    formData.append('radio', this.formIO.value.radio);
    formData.append('select', this.formIO.value.select);
    const headers = new HttpHeaders()
      .set('enctype', 'multipart/form-data');

    this.http.post(
      'https://misgen6.bau.edu.lb:8000/testform', 
      formData, { headers })
      .subscribe(response => {
        console.log(response);
      });
  }


  onSubmit1(User: { name: string, radio: string, select: number}) {

    console.log(User);
    this.http.post<{ name: string }>(
      // '',

      'https://misgen6.bau.edu.lb:8000/testform',

      User)
      .subscribe((res) => {
        console.log(res);
      });
  }


onSubmit($event: any) {

  this.onSubmit1($event);

  // console.log("submitted")

  // console.log(this.formIO.form);

  // setTimeout(() => {
  //   window.location.href = 'https://icas.bau.edu.lb:8443/cas/login?service=https://mis.bau.edu.lb/web/v12/iconnectv12/cas/sso.aspx';
  // }, 1000); 
}




  constructor(public prism: PrismService, private http: HttpClient) { }
  ngAfterViewInit() {
    this.fetchStudentData();

    setTimeout(() => {
      this.prism.init();
    }, 1000); 
  }

}
