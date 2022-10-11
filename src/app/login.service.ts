import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Users } from './models/users';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }


  validateLogin(user: Users){
    return this.http.post('http://127.0.0.1:3000/api/user/login',{
        email : user.email,
        password : user.password
    })
}
}
