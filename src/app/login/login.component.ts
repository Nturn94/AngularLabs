import { Component, ViewChild, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Users } from '../models/users';
import { LoginService } from '../login.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type' : 'application/json'})
};




import { Router } from '@angular/router';
import { User } from '../auth/user';
import { Observable } from 'rxjs';

// interface result {
//   status?: string;
//   data?: any;
// }


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  public user: Users;
  

  constructor(private loginService: LoginService, private router:Router, private http: HttpClient) { 
    this.user = new Users();
    }
  ngOnInit(): void {}

  validateLogin() {
    if(this.user.email && this.user.password) {
      this.loginService.validateLogin(this.user).subscribe(result => {
        
        if((result as any).status === 'success') {
          this.router.navigate(['/account']);
        } else {
          alert('Wrong username password');
          console.log(result);
        }
      }, error => {
        console.log('error is ', error);
      });
    } else {
        alert('enter user name and password');
    }

  }
}






