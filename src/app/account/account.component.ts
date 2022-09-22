import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from '../user.service';




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

  userlist: any = [];
  data: any = "";

  email:String|null = "";
  password:String|null = "";
  Rank:String|null = "";

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


  constructor(private router: Router, private http: HttpClient, private userS: UserService) {

    
   }
  
  

  ngOnInit(): void {

    this.userS.getData().subscribe(data => {
      this.userlist = data; 
      console.log(this.userlist);
    });

    



}

CreateUser(email:string, password:string, Rank:string){
  this.userS.CreateUser(email, password, Rank).subscribe(data => {
    console.log(this.data);
    window.location.reload();
});
}

DeleteUser(email:string){
  this.userS.DeleteUser(email).subscribe(data => {
    console.log(this.data);
    window.location.reload();
});
}
}
