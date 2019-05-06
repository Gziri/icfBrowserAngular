import { Component, OnInit } from '@angular/core';
import { Data } from '../json-data.component';
import * as json from '../../../assets/icf.json';
import { MatSnackBar } from '@angular/material';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tree-view',
  templateUrl: './tree-view.component.html',
  styleUrls: ['./tree-view.component.css']
})


export class TreeViewComponent implements OnInit {

  private data: Data = new Data();
  private chosenArray: Array<any> = new Array();
  private panelOpenState: string = "0";
  private panelOpenState2: string = "0";
  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }
  private chosenPanelExpanded: boolean;

  ngOnInit() {
    this.assignData();
    this.http.get('../../../assets/icf.json')
      .subscribe(data => { this.data = JSON.parse(JSON.stringify(data)) });
    this.chosenArray.findIndex(x => x == this.chosenArray);

  }

  public arrayUpdate() {
    return this.chosenArray.length
  }

  private addToArray(item) {
    if (this.chosenArray.indexOf(item) === -1) {
      this.chosenArray.push(item)
    } else setTimeout(() => {
      this.openSnackBar("Item already added", "Close")
    }, 200);
  }

  private scrollToChosenArray(item) {
    if (this.chosenArray.indexOf(item) === -1) {
      this.addToArray(item)
    }
    setTimeout(() => {
      document.getElementById('chosenArray').scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" })
      this.chosenPanelExpanded = true;
    }, 100);

  }


  private deleteArrayItem(item) {
    this.chosenArray.splice(this.chosenArray.indexOf(item), 1);
    if (this.chosenArray.length == 0) {
      this.chosenPanelExpanded = false;
    }
  }

  private deleteChosenArray() {
    this.chosenArray = new Array();
    this.chosenPanelExpanded = false;
  }

  private resetArrayItem(item) {
    item.qualifier = '';
    this.chosenArray.splice(this.chosenArray.indexOf(item), 1);
    if (this.chosenArray.length == 0) {
      this.chosenPanelExpanded = false;
    }
    setTimeout(() => {
      this.openSnackBar("Item reseted", "Close");
    }, 200);
  }

  private resetChosenArray() {
    for (let i of this.chosenArray) {
      i.qualifier = ''
    }
    this.chosenArray = new Array();
    this.chosenPanelExpanded = false;
    setTimeout(() => {
      this.openSnackBar("List reseted", "Close")
    }, 200);
  }

  private assignData() {
    let sample = JSON.parse(JSON.stringify(this.getJson()));
    this.data = sample.default;
  }

  private getJson() {
    let data = json;
    return data
  }

  private copyToClipboard(item) {
    document.addEventListener('copy', (e: ClipboardEvent) => {
      e.clipboardData.setData('text/plain', (item));
      e.preventDefault();
      document.removeEventListener('copy', null);
    });
    document.execCommand('copy');
    setTimeout(() => {
      this.openSnackBar('Copied to clipboard', "Close");
    }, 200);
  }


  private openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

  private log(log) {
    console.log(log)
  }


}
