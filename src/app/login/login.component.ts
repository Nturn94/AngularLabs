import { Component, ViewChild, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../auth.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type' : 'application/json'})
};



import { Router } from '@angular/router';

const BACKEND_URL = "http://localhost:3000";



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  //   email2:string = ""
  //   pwd:string = ""
  // users = [
  //   {'login': 'nathan@1', 'pass': 'nathan'},
  //    {'login':'jake@2', "pass":"jake"},
  //    {'login':'sarah@3', "pass":"sarah"}];

  profileForm = new FormGroup({
    username: new FormControl(''),
    userid: new FormControl(''),
    pwd: new FormControl(''),
    userbirthdate: new FormControl(''),
    userage: new FormControl(''),
  });


  userpwd = {username : 'k.su@griffith.edu.au', pwd: '666666'};
  userobj = {userid: 1, username: this.userpwd.username, userbirthdate: null, userage: 100};

  // username = "";
  // userid = "";
  // pwd = "";
  // userbirthdate = "";
  // userage = "";


  constructor(private authService: AuthService, private router:Router, private http: HttpClient) {   }
  ngOnInit(): void {}

  callServer() {
    const headers = new HttpHeaders()
          .set('Authorization', 'my-auth-token')
          .set('Content-Type', 'application/json');

    console.log(this.profileForm.value);

    this.http.post('http://127.0.0.1:3000/ping', JSON.stringify(this.profileForm.value), {
      headers: headers
    })
    .subscribe(data => {
      console.log(data);

      if (data === true){
        this.router.navigate(['/account']);
        //redirect account page
      } else if (data === false){
        console.log("Wrong User/password");
      }
    });
  }

}

//    buttonClicked(){


//      var email = (<HTMLInputElement>document.getElementById("email")).value;
//      var upwd = (<HTMLInputElement>document.getElementById("upwd")).value;
//      for(let i = 0; i <this.users.length;i++){
//        if(email == this.users[i].login && upwd == this.users[i].pass){
//          this.route.navigate(['/account']);
//       }
//     }
//     // if (email == "jay@1" && upwd == "jay"){
//     //   this.route.navigate(['/account']);
//     // }
  
//     // else if (email == "admin@2" && upwd == "admin"){
//     //   this.route.navigate(['/account']);
//     // }
  
//     // else if (email == "anon@3" && upwd == "anon"){
//     //   this.route.navigate(['/account']);
//     // }
  
//     // else{
  
//     // }
  
  
//   }

  

// }


// if password == yes redirect to account page





