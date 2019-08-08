import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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

  public JSONData: Data;
  public localChosen = [JSON.parse(sessionStorage.getItem('chosenItems')) || []];
  public chosenItems: Array<any> = new Array();
  public chosenArray: Array<any> = new Array();
  private panelOpenState: string = "0";
  private panelOpenState2: string = "0";
  public chosenPanelExpanded: boolean = false;
  // Favourites saved locally
  public localFav = [JSON.parse(localStorage.getItem('favorites')) || []];
  // Favourite Object IDs
  public favourites: Array<any> = new Array();
  // Favourite Objects used in HTML
  public favObjects: Array<any> = new Array();
  private searchCatName: Array<any> = new Array();
  searchField = new FormControl();
  filteredOptions: Observable<Object[]>;
  public selectedItem: Array<any> = new Array();
  private selItemDesc: boolean;
  private isFavourite: boolean;


  @Input() qualifier: number;
  @Output() ontype = new EventEmitter();


  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

  ngOnInit() {

    this.assignData();
    this.http.get('../../../assets/icf.json')
      .subscribe(data => { this.JSONData = JSON.parse(JSON.stringify(data)) });
    this.chosenArray.findIndex(x => x == this.chosenArray);
    this.filteredOptions = this.searchField.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
    this.searchByCatName("")
    this.checkForFavs()
    this.checkChosen()

  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.searchCatName.filter(option => option.catName.toLowerCase().includes(filterValue) || option.initial.toLowerCase().includes(filterValue));
  }


  private getJson() {
    let JSONData = json;
    return JSONData
  }

  private assignData() {
    let sample = JSON.parse(JSON.stringify(this.getJson()));
    this.JSONData = sample.default;

  }

  // Check for favourites
  private checkForFavs() {
    if (this.localFav[0].length > 0) {
      this.favourites = this.localFav[0];
      this.getFavorites()
      this.chosenPanelExpanded = true;
    } else {
      this.favourites = new Array();
    }

  }
  // Check For ChosenItems
  private checkChosen() {
    if (this.localChosen[0].length > 0) {
      this.chosenItems = this.localChosen[0];
      this.getChosen();
      this.chosenPanelExpanded = true;
    } else {
      this.chosenItems = new Array();
    }
  }
  // Search by Category Name
  public searchByCatName(search) {
    let arr: Array<Data> = new Array(this.JSONData);
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

  // Reset search 
  private resetSearch() {
    this.searchField.setValue("")
    this.selectedItem = []
  }

  // Add searched items to chosen array
  public addSelected(item) {
    let arr: Array<Data> = new Array(this.JSONData);
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
    } else this.selItemDesc = false
    // console.log(foundItems)
  }

  // Add items to chosen array
  private addToArray(item) {

    if (this.chosenItems.indexOf(item.id) === -1) {
      this.chosenArray.push(item)
      this.chosenItems.push(item.id)
      sessionStorage.setItem('chosenItems', JSON.stringify(this.chosenItems))
    } else setTimeout(() => {
      this.openSnackBar("Item already added", "Close")
    }, 200);
  }



  private storeQualifier(item) {
    let qualifier = item.qualifier
    this.chosenItems.push(item, qualifier)

    sessionStorage.setItem('chosenItems', JSON.stringify(this.chosenItems))
  }

  //Add to Favourites / Remove From Favourites (Favourites button)

  private addRemoveFavourite(item) {
    if (!this.checkIfFavourite(item)) {
      this.addToFavs(item)
    } else {
      this.removeFavouriteItem(item)
    }
  }

  // Add to Favourites Array
  private addToFavs(item) {
    if (this.favourites.indexOf(item.id) === -1) {
      this.favourites.push(item.id)
      localStorage.setItem('favorites', JSON.stringify(this.favourites));
      this.getFavorites()
    } else setTimeout(() => {
      this.openSnackBar("Item already added", "Close")
    }, 200);
  }

  // Remove Item From Favourites Array
  private removeFavouriteItem(item) {
    const index = this.favourites.indexOf(item.id);
    if (this.favourites.length > 1) {
      if (index > -1) {
        this.favourites.splice(index, 1);
      }
      localStorage.setItem('favorites', JSON.stringify(this.favourites));
      this.getFavorites()
    } else {
      this.clearFavs()
    }
  }
  private checkIfFavourite(item) {
    if (this.favourites.includes(item.id)) {
      return true
    } else {
      return false
    }
  }

  // Load Favourites List
  private getFavorites() {
    let arr = Array(this.JSONData);
    let favo = [];
    for (let i of this.favourites) {
      arr.forEach(element => {
        element.forEach(aElement => {
          if (aElement !== "" && aElement !== undefined) {
            if (aElement.id == i) {
              favo.push(aElement)
            }
            if (aElement.subCat !== "" && aElement.subCat !== undefined) {
              aElement.subCat.forEach(bElement => {
                if (bElement.id == i) {
                  favo.push(bElement)
                }
                if (bElement.subCat !== "" && bElement.subCat !== undefined) {
                  bElement.subCat.forEach(cElement => {
                    if (cElement.id == i) {
                      favo.push(cElement)
                    }
                    if (cElement.subCat !== "" && cElement.subCat !== undefined) {
                      cElement.subCat.forEach(dElement => {
                        if (dElement.id == i) {
                          favo.push(dElement)
                        }
                        if (dElement.subcat !== "" && dElement.subcat !== undefined) {
                          dElement.subCat.forEach(eElement => {
                            if (eElement.id == i) {
                              favo.push(eElement)
                            }
                            if (eElement.subCat !== "" && eElement.subCat !== undefined)
                              eElement.subCat.forEach(fElement => {
                                if (fElement.id == i) {
                                  favo.push(fElement)
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
      this.favObjects = favo
    }
  }

  // Load Favourites List
  private getChosen() {
    let arr = Array(this.JSONData);
    let favo = [];
    for (let i of this.chosenItems) {
      arr.forEach(element => {
        element.forEach(aElement => {
          if (aElement !== "" && aElement !== undefined) {
            if (aElement.id == i) {
              favo.push(aElement)
            }
            if (aElement.subCat !== "" && aElement.subCat !== undefined) {
              aElement.subCat.forEach(bElement => {
                if (bElement.id == i) {
                  favo.push(bElement)
                }
                if (bElement.subCat !== "" && bElement.subCat !== undefined) {
                  bElement.subCat.forEach(cElement => {
                    if (cElement.id == i) {
                      favo.push(cElement)
                    }
                    if (cElement.subCat !== "" && cElement.subCat !== undefined) {
                      cElement.subCat.forEach(dElement => {
                        if (dElement.id == i) {
                          favo.push(dElement)
                        }
                        if (dElement.subcat !== "" && dElement.subcat !== undefined) {
                          dElement.subCat.forEach(eElement => {
                            if (eElement.id == i) {
                              favo.push(eElement)
                            }
                            if (eElement.subCat !== "" && eElement.subCat !== undefined)
                              eElement.subCat.forEach(fElement => {
                                if (fElement.id == i) {
                                  favo.push(fElement)
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
      this.chosenArray = favo
    }
  }
  // Clear Favourites From Local Storage
  private clearFavs() {
    localStorage.removeItem('favorites')
    this.favObjects = new Array();
    this.favourites = new Array();
    if (this.favObjects.length == 0 && this.chosenArray.length == 0) {
      this.chosenPanelExpanded = false;
    }
  }
  // Scroll to Chosen Items List on Top
  private scrollToChosenArray(item) {
    if (this.chosenArray.indexOf(item) === -1) {
      this.addToArray(item)
    }
    setTimeout(() => {
      document.getElementById('chosenArray').scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" })
      this.chosenPanelExpanded = true;
    }, 100);

  }

  // Delete Item From Chosen Items Array
  private deleteArrayItem(item) {
    this.chosenArray.splice(this.chosenArray.indexOf(item), 1);
    if (this.chosenItems.length > 1) {
      this.chosenItems.splice(this.chosenArray.indexOf(item.id), 1);
      sessionStorage.setItem('chosenItems', JSON.stringify(this.chosenItems))
    } else {
      this.chosenItems = new Array();
      sessionStorage.removeItem('chosenItems')
    }
    if (this.chosenArray.length == 0 && this.favObjects.length == 0) {
      this.chosenPanelExpanded = false;
    }
  }
  // Delete Chosen Array
  private deleteChosenArray() {
    this.chosenArray = new Array();
    this.chosenItems = new Array();
    sessionStorage.removeItem('chosenItems')
    if (this.favObjects.length == 0) {
      this.chosenPanelExpanded = false;
    }
  }
  // Reset Chosen Array Item
  private resetArrayItem(item) {
    item.qualifier = '';
    this.chosenArray.splice(this.chosenArray.indexOf(item), 1);
    if (this.chosenItems.length > 1) {
      this.chosenItems.splice(this.chosenArray.indexOf(item.id), 1);
    } else {
      this.chosenItems = new Array();
      sessionStorage.removeItem('chosenItems')
    }
    if (this.chosenArray.length == 0 && this.favObjects.length == 0) {
      this.chosenPanelExpanded = false;
    }
    setTimeout(() => {
      this.openSnackBar("Item reseted", "Close");
    }, 200);
  }
  // Reset Chosen Array (All Items)
  private resetChosenArray() {
    for (let i of this.chosenArray) {
      i.qualifier = ''
    }
    this.chosenArray = new Array();
    if (this.favObjects.length == 0) {
      this.chosenPanelExpanded = false;
    }
    this.chosenItems = new Array();
    sessionStorage.removeItem('chosenItems')
    setTimeout(() => {
      this.openSnackBar("List reseted", "Close")
    }, 200);
  }

  // Copy To Clipboard
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
  // Open Snack Bar
  private openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }
  // Just logger for HTML
  private log(log) {
    console.log(log)
  }

  // ADD IDS TO JSON OBJECTS
  public iterator = 0; // this is going to be your identifier

  private addIdentifier(target) {
    target.id = this.iterator;
    this.iterator++;
    console.log(this.iterator)
  }

  private loop(obj) {

    for (var i in obj) {

      var c = obj[i];

      if (typeof c === 'object') {

        if (c.length === undefined) {

          //c is not an array
          this.addIdentifier(c);
        }
        // console.log("deeper")
        this.loop(c);

      }

    }

  }
  private loopButton() {
    console.log(this.JSONData)
    this.loop(this.JSONData); // json is your input object
  }
  private CopyButton() {
    this.copyToClipboard(JSON.stringify(this.JSONData))
  }


  //Old code 

  // private searchByCatName(search) {
  //   let arr = this.JSONData;
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




}
