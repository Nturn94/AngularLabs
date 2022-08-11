import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'week4';


  ngOnInit(){
    console.log("Testing if DOM is ready");


    if (typeof(Storage) !== "undefined"){
      console.log("Storage ready");
      localStorage.setItem("lastname", "Smith");
      console.log(localStorage.getItem("Lastname"));
    } else {
      console.log("No storage Support");
    }
  }
}
