import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  users = [
    {'login': 'nathan@1', 'pass': 'nathan'},
     {'login':'jake@2', "pass":"jake"},
     {'login':'sarah@3', "pass":"sarah"}];


  constructor(private route:Router) {   }

   buttonClicked(){
     var email = (<HTMLInputElement>document.getElementById("email")).value;
     var upwd = (<HTMLInputElement>document.getElementById("upwd")).value;
     for(let i = 0; i <this.users.length;i++){
       if(email == this.users[i].login && upwd == this.users[i].pass){
         this.route.navigate(['/account']);
      }
    }
    // if (email == "jay@1" && upwd == "jay"){
    //   this.route.navigate(['/account']);
    // }
  
    // else if (email == "admin@2" && upwd == "admin"){
    //   this.route.navigate(['/account']);
    // }
  
    // else if (email == "anon@3" && upwd == "anon"){
    //   this.route.navigate(['/account']);
    // }
  
    // else{
  
    // }
  
  
  }

  ngOnInit(): void {
  }

}


// if password == yes redirect to account page





