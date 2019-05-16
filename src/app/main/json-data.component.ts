
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material';


export class SnackBarOverviewExample {
    constructor(private snackBar: MatSnackBar) { }

    openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
            duration: 2000,
        });
    }
}


export class Data extends Array{

    catName: String;
    initial: String;
    number: Number;
    description: String;
    subCat: [{ Data }];

}