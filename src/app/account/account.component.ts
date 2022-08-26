import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';




@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  public sessionStorage = sessionStorage;

  clickme(username:string, id:string, date:string, age:string){
    sessionStorage.setItem('username', username);
    sessionStorage.setItem('userid', id);
    sessionStorage.setItem('userbirthdate', date);
    sessionStorage.setItem('userage', age);

  }

  dontclickme(){
    sessionStorage.setItem('username', "");
    sessionStorage.setItem('userid', "");
    sessionStorage.setItem('userbirthdate', "");
    sessionStorage.setItem('userage', "");

  }

  constructor(private router: Router) {

    
   }
  
  

  ngOnInit(): void {

    var user = sessionStorage.getItem('username');
    var id = sessionStorage.getItem('userid');
    var birth = sessionStorage.getItem('userbirthdate');
    var age = sessionStorage.getItem('userage');







 
  }
}
