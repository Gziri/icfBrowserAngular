import { Component, OnInit, Injectable, Input } from '@angular/core';
import { Data, SnackBarOverviewExample } from '../json-data.component';
import * as json from '../../../assets/icf.json';
import { MatSnackBar } from '@angular/material';
import { Subject } from 'rxjs';
import { Observable } from "rxjs";
import { HttpClient } from '@angular/common/http';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-tree-view',
  templateUrl: './tree-view.component.html',
  styleUrls: ['./tree-view.component.scss']
})

@Input() @Injectable()
export class TreeViewComponent implements OnInit {

  private data: Data = new Data();
  private chosenArray: Array<any> = new Array();
  private panelOpenState: string = "0";
  private panelOpenState2: string = "0";
  private itemExist;

  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

  ngOnInit() {
    this.assignData();
    this.http.get('../../../assets/icf.json')
      .subscribe(data => { this.data = JSON.parse(JSON.stringify(data)); console.log(this.data) });
    this.itemExist = this.chosenArray.findIndex(x => x == this.chosenArray)
  }



  private addToArray(item) {
    if (this.chosenArray.indexOf(item) === -1) {
      this.chosenArray.push(item)
    } else this.openSnackBar("Item already added", "Close")
    console.log(this.chosenArray)
  }
  private deleteArrayItem(item) {
    this.chosenArray.splice(this.chosenArray.indexOf(item), 1);
  }
  private clearChosenArray() {
    this.chosenArray = []
  }

  public assignData() {
    let sample = JSON.parse(JSON.stringify(this.getJson()));
    this.data = sample.default;
  }

  private getJson() {
    let data = json;
    return data
  }

  copyToClipboard(item) {
    document.addEventListener('copy', (e: ClipboardEvent) => {
      e.clipboardData.setData('text/plain', (item));
      e.preventDefault();
      document.removeEventListener('copy', null);
    });
    document.execCommand('copy');
    this.openSnackBar('Copied to clipboard', 'Close');
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

  private log(log) {
    console.log(log)
  }

}
