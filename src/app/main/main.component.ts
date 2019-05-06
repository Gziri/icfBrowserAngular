import { Component, OnInit } from '@angular/core';
import { Data } from './json-data.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  public data: Data;
  public panelOpenState: string;
  constructor() {
  }

  private detect: Observable<boolean>;

  // public assignData() {
  //   let sample = JSON.parse(JSON.stringify(this.getJson()));
  //   this.data = sample.default;
  // }

  // private getJson() {
  //   let data = json;
  //   return data
  // }

  ngOnInit() {
    // this.assignData();
    this.detectDevice();
  }


  private detectDevice() {
    if (this.detectmob() && window.innerHeight > window.innerWidth) {
      alert('For full experience rotate to Landscape')
    };
    window.addEventListener("orientationchange", function () {
      if ((screen.orientation.type !== "landscape-primary")) {
        alert('For full experience rotate to Landscape')
        console.log(screen.orientation)
      }
    });
  }

  private detectmob() {

    if (navigator.userAgent.match(/Android/i)
      || navigator.userAgent.match(/webOS/i)
      || navigator.userAgent.match(/iPhone/i)
      || navigator.userAgent.match(/iPad/i)
      || navigator.userAgent.match(/iPod/i)
      || navigator.userAgent.match(/BlackBerry/i)
      || navigator.userAgent.match(/Windows Phone/i)
    ) {
      return true;
    }
    else {
      return false;
    }
  }
}