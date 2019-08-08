import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'icf-browser';
  private isLoading: boolean = true;

  ngOnInit() {
    this.timeout()
  }
  timeout() {
    document.addEventListener("DOMContentLoaded", function (event) {
      console.log('timeout')
      setTimeout(() => {
        document.getElementById("overlay").style.display = "none";
      }, 500);
    })
  }

}
