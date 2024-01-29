import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { PrismService } from '../../Prism.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { NgForm } from '@angular/forms';
import { NodeGCPerformanceDetail } from 'perf_hooks';

@Component({
  selector: 'app-renderer',
  templateUrl: './renderer.component.html',
  styleUrls: ['./renderer.component.scss']
})
export class RendererComponent implements AfterViewInit {

  @ViewChild('surveyForm', { read: NgForm }) surveyForm: any;

onSubmit($event: any) {

  this.postToFirebase($event);

  console.log("submitted")

  // setTimeout(() => {
  //   window.location.href = 'https://icas.bau.edu.lb:8443/cas/login?service=https://mis.bau.edu.lb/web/v12/iconnectv12/cas/sso.aspx';
  // }, 1000); 

}

postToFirebase(User: { name: string, radio: string, select: string}) {

  console.log(User);
  this.http.post<{ name: string }>(
    'https://library-14e9e-default-rtdb.firebaseio.com/forms',
    User)
    .subscribe((res) => {
      console.log(res);

    });
}



  constructor(public prism: PrismService, private http: HttpClient) { }
  ngAfterViewInit() {
    this.prism.init();
  }

}
