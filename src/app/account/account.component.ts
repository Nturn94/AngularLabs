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

  
  user:String|null = sessionStorage.getItem('username');
  id:String|null  = sessionStorage.getItem('userid');
  birth:String|null  = sessionStorage.getItem('userbirthdate');
  age:String|null  = sessionStorage.getItem('userage');

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








 
  }
}
