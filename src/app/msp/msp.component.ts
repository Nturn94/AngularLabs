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
  tempchannel = Array();
  groups: any = [];
  grouplist:string="";
  newroomname:string="";
  newusername:string="";
  newuserpwd:string="";
  delusersel:string="";
  delgroupsel:string="";
  channellist:string="";
  newchannelname:string="";
  channels:any =[];
  isdiv1 = false;
  isdiv2 = false;
  isdiv3 = false;
  isdiv4 = false;
  togglediv1(){
    this.isdiv2 = false;
    this.isdiv3 = false;
    this.isdiv1 = true;
  } 
  togglediv2(){
    this.isdiv2 = true;
    this.isdiv3 = false;
    this.isdiv1 = false;
  } 
  togglediv3(){
    this.isdiv2 = false;
    this.isdiv3 = true;
    this.isdiv1 = false;
  } 
  togglediv4(){
    this.isdiv2 = false;
    this.isdiv3 = false;
    this.isdiv1 = false;
    this.isdiv4 = true;
  } 



  
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
      this.channels= result.channels;


    });
    

}


AssignUser(){
  const headers = new HttpHeaders()
  headers.append('Content-Type', 'application/json; charset=utf-8');

  var sendgroup = this.grouplist;
  var senduser = this.userlist;
  var combination = sendgroup+" "+senduser;

  console.log(combination);

  return this.http.post('http://127.0.0.1:3000/assign', JSON.stringify(combination), {
    headers: headers
}) .subscribe(data => {
  console.log(data);
});

}

PostNewGroup(){

  const headers = new HttpHeaders()
  headers.append('Content-Type', 'application/json; charset=utf-8');


  console.log("New room name is:", this.newroomname);

  return this.http.post('http://127.0.0.1:3000/newgroup', JSON.stringify(this.newroomname), {
  headers: headers
})    .subscribe(data => {
  console.log(data);
});

}
PostNewUser(){

  const headers = new HttpHeaders()
  headers.append('Content-Type', 'application/json; charset=utf-8');


  console.log("New user name is:", this.newusername+this.newuserpwd);
  var newuser = this.newusername+this.newuserpwd;

  return this.http.post('http://127.0.0.1:3000/newuser', JSON.stringify(newuser), {
  headers: headers
})    .subscribe(data => {
  console.log(data);
});

}
DelUser(){

  const headers = new HttpHeaders()
  headers.append('Content-Type', 'application/json; charset=utf-8');


  console.log("This user is deleted", this.delusersel);

  return this.http.post('http://127.0.0.1:3000/deluser', JSON.stringify(this.delusersel), {
  headers: headers
})    .subscribe(data => {
  console.log(data);
});

}

delgroup(){
  
  const headers = new HttpHeaders()
  headers.append('Content-Type', 'application/json; charset=utf-8');


  console.log("This group is deleted", this.delgroupsel);

  return this.http.post('http://127.0.0.1:3000/delgroup', JSON.stringify(this.delgroupsel), {
  headers: headers
})    .subscribe(data => {
  console.log(data);
});

}
AssignUserToChannel(){
  const headers = new HttpHeaders()
  headers.append('Content-Type', 'application/json; charset=utf-8');

  var sendchannel = this.channellist;
  var senduser = this.userlist;
  var combination = sendchannel+" "+senduser;

  console.log(combination);

  return this.http.post('http://127.0.0.1:3000/assignchannel', JSON.stringify(combination), {
    headers: headers
}) .subscribe(data => {
  console.log(data);
});

}
PostNewChannel(){ //unfinished

}
delChannel(){ //unfinished

}

}


