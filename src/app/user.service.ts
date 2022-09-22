import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


interface myData {
  email: string,
  status: boolean,
  rank : string
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getData(){
    return this.http.get<myData>('http://127.0.0.1:3000/api/getusers')
  }

  CreateUser(email:any, password:any, Rank:any){
    return this.http.post<myData>("http://127.0.0.1:3000/api/SaveUser",{
      email,
      password,
      Rank
    
    })
  }

  DeleteUser(email:any){
    return this.http.post<myData>("http://127.0.0.1:3000/api/deleteUser",{
      email
    
    })
  }
}
