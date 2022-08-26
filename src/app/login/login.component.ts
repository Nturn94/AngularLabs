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


  profileForm = new FormGroup({
    username: new FormControl(''),
    userid: new FormControl(''),
    pwd: new FormControl(''),
    userbirthdate: new FormControl(''),
    userage: new FormControl(''),
  });


  userpwd = {username : 'k.su@griffith.edu.au', pwd: '666666'};
  userobj = {userid: 1, username: this.userpwd.username, userbirthdate: null, userage: 100};
  data = [];


  constructor(private authService: AuthService, private router:Router, private http: HttpClient) {   }
  ngOnInit(): void {}

  errormes = "";

  callServer() {
    const headers = new HttpHeaders()
          .set('Authorization', 'my-auth-token')
          .set('Content-Type', 'application/json');

    console.log(this.profileForm.value);

    this.http.post('http://127.0.0.1:3000/ping', JSON.stringify(this.profileForm.value), {
      headers: headers
    })
    .subscribe(data => {
      console.log("hello", data);

      if (data != false){
        console.log(typeof(data));
        const propertyNames = Object.entries(data);
        sessionStorage.setItem('username',propertyNames[0][1]);
        sessionStorage.setItem('userid',propertyNames[2][1]);
        sessionStorage.setItem('userbirthdate',propertyNames[3][1]);
        sessionStorage.setItem('userage',propertyNames[4][1]);
        this.router.navigate(['/account']);

        //redirect account page
      } else if (data === false){
        console.log("Wrong User/password");
        this.errormes = "The login is wrong!";
      }
    });
  }

}






