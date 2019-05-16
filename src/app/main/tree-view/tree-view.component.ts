import { Component, OnInit } from '@angular/core';
import { Data } from '../json-data.component';
import * as json from '../../../assets/icf.json';
import { MatSnackBar } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-tree-view',
  templateUrl: './tree-view.component.html',
  styleUrls: ['./tree-view.component.css']
})


export class TreeViewComponent implements OnInit {

  public data: Data
  public chosenArray: Array<any> = new Array();
  private panelOpenState: string = "0";
  private panelOpenState2: string = "0";
  public chosenPanelExpanded: boolean;

  private searchCatName: Array<any> = new Array();
  searchField = new FormControl();
  filteredOptions: Observable<Object[]>;
  public selectedItem: Array<any> = new Array();
  private selItemDesc: boolean;

  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

  ngOnInit() {
    this.assignData();
    this.http.get('../../../assets/icf.json')
      .subscribe(data => { this.data = JSON.parse(JSON.stringify(data)) });
    this.chosenArray.findIndex(x => x == this.chosenArray);
    this.filteredOptions = this.searchField.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
    this.searchByCatName("")
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.searchCatName.filter(option => option.catName.toLowerCase().includes(filterValue) || option.initial.toLowerCase().includes(filterValue));
  }

  // private searchByCatName(search) {
  //   let arr = this.data;
  //   let foundItems: Array<any> = new Array();
  //   if (search !== "") {
  //     search.toLowerCase();
  //     for (const first in arr) {
  //       if (arr[first] !== undefined && arr[first].catName !== undefined && (arr[first].catName.toLowerCase().includes(search) || arr[first].initial.includes(search))) {
  //         foundItems.push(arr[first])
  //       }
  //       for (const second in arr[first].subCat) {
  //         if (arr[first].subCat[second] !== undefined && arr[first].subCat[second].catName !== undefined && (arr[first].subCat[second].catName.toLowerCase().includes(search) || arr[first].subCat[second].initial.includes(search))) {
  //           foundItems.push(arr[first].subCat[second])
  //         }
  //         for (const third in arr[first].subCat[second].subCat) {
  //           if (arr[first].subCat[second].subCat[third] !== undefined && arr[first].subCat[second].subCat[third].catName !== undefined && (arr[first].subCat[second].subCat[third].catName.toLowerCase().includes(search) || arr[first].subCat[second].subCat[third].initial.includes(search))) {
  //             foundItems.push(arr[first].subCat[second].subCat[third])
  //           }
  //           for (const fourth in arr[first].subCat[second].subCat[third].subCat) {
  //             if (arr[first].subCat[second].subCat[third].subCat[fourth] !== undefined && (arr[first].subCat[second].subCat[third].subCat[fourth].catName.toLowerCase().includes(search) || arr[first].subCat[second].subCat[third].subCat[fourth].initial.includes(search))) {
  //               foundItems.push(arr[first].subCat[second].subCat[third].subCat[fourth])
  //             }
  //             for (const fifth in arr[first].subCat[second].subCat[third].subCat[fourth].subCat) {
  //               if (arr[first].subCat[second].subCat[third].subCat[fourth].subCat[fifth] !== undefined && arr[first].subCat[second].subCat[third].subCat[fourth].subCat[fifth].catName !== undefined && (arr[first].subCat[second].subCat[third].subCat[fourth].subCat[fifth].catName.toLowerCase().includes(search) || arr[first].subCat[second].subCat[third].subCat[fourth].subCat[fifth].initial.includes(search))) {
  //                 foundItems.push(arr[first].subCat[second].subCat[third].subCat[fourth].subCat[fifth])
  //               }
  //               for (const sixth in arr[first].subCat[second].subCat[third].subCat[fourth].subCat[fifth].subCat) {
  //                 if (arr[first].subCat[second].subCat[third].subCat[fourth].subCat[fifth].subCat[sixth] !== undefined && arr[first].subCat[second].subCat[third].subCat[fourth].subCat[fifth].subCat[sixth].catName !== undefined && (arr[first].subCat[second].subCat[third].subCat[fourth].subCat[fifth].subCat[sixth].catName.toLowerCase().includes(search) || arr[first].subCat[second].subCat[third].subCat[fourth].subCat[fifth].subCat[sixth].initial.includes(search))) {
  //                   foundItems.push(arr[first].subCat[second].subCat[third].subCat[fourth].subCat[fifth].subCat[sixth])
  //                 }
  //               }
  //             }
  //           }
  //         }
  //       }
  //     }
  //   }
  //   this.searchCatName = [];
  //   this.searchCatName = foundItems;
  //   console.log(foundItems)
  // }

  public searchByCatName(search) {
    let arr: Array<Data> = new Array(this.data);
    let foundItems: Array<Data> = new Array();
    arr.forEach(element => {
      search.toLowerCase();
      element.forEach(aElement => {
        if (aElement !== "" && aElement !== undefined) {
          if (aElement.catName.toLowerCase().includes(search) || aElement.initial.toLowerCase().includes(search)) {
            foundItems.push(aElement)
          }
          if (aElement.subCat !== "" && aElement.subCat !== undefined) {
            aElement.subCat.forEach(bElement => {
              if (bElement.catName.toLowerCase().includes(search) || bElement.initial.toLowerCase().includes(search)) {
                foundItems.push(bElement)
              }
              if (bElement.subCat !== "" && bElement.subCat !== undefined) {
                bElement.subCat.forEach(cElement => {
                  if (cElement.catName.toLowerCase().includes(search) || cElement.initial.toLowerCase().includes(search)) {
                    foundItems.push(cElement)
                  }
                  if (cElement.subCat !== "" && cElement.subCat !== undefined) {
                    cElement.subCat.forEach(dElement => {
                      if (dElement.catName.toLowerCase().includes(search) || dElement.initial.toLowerCase().includes(search)) {
                        foundItems.push(dElement)
                      }
                      if (dElement.subcat !== "" && dElement.subcat !== undefined) {
                        dElement.subCat.forEach(eElement => {
                          if (eElement.catName.toLowerCase().includes(search) || eElement.initial.toLowerCase().includes(search)) {
                            foundItems.push(eElement)
                          }
                          if (eElement.subCat !== "" && eElement.subCat !== undefined)
                            eElement.subCat.forEach(fElement => {
                              if (fElement.catName.toLowerCase().includes(search) || fElement.initial.toLowerCase().includes(search)) {
                                foundItems.push(fElement)
                              }
                            });
                        });
                      }
                    });
                  }
                });
              }
            });
          }
        }
      });

    });

    this.searchCatName = new Array();
    this.searchCatName = foundItems;
  }

  private resetSearch() {
    this.searchField.setValue("")
    this.selectedItem = []
  }

  public addSelected(item) {
    let arr: Array<Data> = new Array(this.data);
    let foundItems: Array<Data> = new Array();
    // console.log(item)
    item = item.toLowerCase();
    arr.forEach(element => {
      element.forEach(aElement => {
        if (aElement !== "" && aElement !== undefined) {
          if (aElement.catName.toLowerCase().includes(item)) {
            foundItems.push(aElement)
          }
          if (aElement.subCat !== "" && aElement.subCat !== undefined) {
            aElement.subCat.forEach(bElement => {
              if (bElement.catName.toLowerCase().includes(item)) {
                foundItems.push(bElement)
              }
              if (bElement.subCat !== "" && bElement.subCat !== undefined) {
                bElement.subCat.forEach(cElement => {
                  if (cElement.catName.toLowerCase().includes(item)) {
                    foundItems.push(cElement)
                  }
                  if (cElement.subCat !== "" && cElement.subCat !== undefined) {
                    cElement.subCat.forEach(dElement => {
                      if (dElement.catName.toLowerCase().includes(item)) {
                        foundItems.push(dElement)
                      }
                      if (dElement.subcat !== "" && dElement.subcat !== undefined) {
                        dElement.subCat.forEach(eElement => {
                          if (eElement.catName.toLowerCase().includes(item)) {
                            foundItems.push(eElement)
                          }
                          if (eElement.subCat !== "" && eElement.subCat !== undefined)
                            eElement.subCat.forEach(fElement => {
                              if (fElement.catName.toLowerCase().includes(item)) {
                                foundItems.push(fElement)
                              }
                            });
                        });
                      }
                    });
                  }
                });
              }
            });
          }
        }
      });
    });
    this.selectedItem = new Array();
    this.selectedItem.push(foundItems[0])
    if (this.selectedItem[0].description !== "") {
      this.selItemDesc = true
    }else this.selItemDesc = false
    console.log(foundItems)
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
