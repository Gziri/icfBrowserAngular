import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import * as testjson from '../../../assets/nevrologia.json';

@Component({
  selector: 'app-box-view',
  templateUrl: './box-view.component.html',
  styleUrls: ['./box-view.component.css']
})
export class BoxViewComponent implements OnInit {
  public test;
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.assignData();
    this.http.get('../../../assets/nevrologia.json')
      .subscribe(test => { this.test = JSON.parse(JSON.stringify(test)) });

  }
  private assignData() {
    let sample = JSON.parse(JSON.stringify(this.getJson()));
    this.test = sample.default;
    console.log(this.test)
  }

  private getJson() {
    let data = testjson;
    return data
  }


}
