import { Component, AfterViewInit } from '@angular/core';
import { PrismService } from '../../Prism.service';

@Component({
  selector: 'app-renderer',
  templateUrl: './renderer.component.html',
  styleUrls: ['./renderer.component.scss']
})
export class RendererComponent implements AfterViewInit {



onSubmit($event: any) {

  console.log("submitted")

}

  constructor(public prism: PrismService) { }
  ngAfterViewInit() {
    this.prism.init();
  }

}
