import { Component, OnInit } from '@angular/core';
import { Data } from './json-data.component';
import * as json from "../../assets/icf.json";

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

  public assignData() {
    let sample = JSON.parse(JSON.stringify(this.getJson()));
    this.data = sample.default;
  }

  private getJson() {
    let data = json;
    return data
  }

  ngOnInit() {
    this.assignData();

  }
  
}