import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { FormGroup, FormControl } from '@angular/forms';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type' : 'application/json'})
};


const BACKEND_URL = "http://localhost:3000";

@Component({
  selector: 'app-msp',
  templateUrl: './msp.component.html',
  styleUrls: ['./msp.component.css']
})
export class MSPComponent implements OnInit {

  private statusUrl = 'http://127.0.0.1:3000/rtv';
  title = 'node-express-angular';
  status = 'DOWN';
  users: any=[];
  userlist:string="";
  tempuser = Array();
  groups: any = [];
  grouplist:string="";
  newroomname:string="";

  
getStatus(): Promise<void | any> {
  return this.http.get(this.statusUrl)
              .toPromise()
              .then(response => response)
              .catch(this.error);

}

private error (error: any) {
  let message = (error.message) ? error.message :
  error.status ? `${error.status} - ${error.statusText}` : 'Server error';
  console.error(message);
}



  constructor(private authService: AuthService, private router:Router, private http: HttpClient) { }

  ngOnInit(): void {

    this.getStatus()
    .then((result: any) => {
      // this.status = result.status;
      console.log(result.users, result.groups);
      
      
      for (let i = 0; i < result.users.length; i++) {
        this.tempuser.push(result.users[i].username)
      }
      this.groups = result.groups;
      this.users = this.tempuser;


    });

}

AssignUser(){


  var sendgroup = this.grouplist;
  var senduser = this.userlist;
  var combination = sendgroup+" "+senduser;

  console.log(combination);

  this.http.post('http://127.0.0.1:3000/assign', JSON.stringify(combination), {
})

}

PostNewGroup(){

  console.log("New room name is:", this.newroomname);

  this.http.post('http://127.0.0.1:3000/newgroup', JSON.stringify(this.newroomname), {
  // headers: headers
})    .subscribe(data => {
  console.log(data);
});

}

}


