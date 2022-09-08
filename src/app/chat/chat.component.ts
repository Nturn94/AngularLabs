import { Component, OnInit } from '@angular/core';
import { SocketService } from '../services/socket.service';
import { FormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';

const SERVER_URL = 'http://localhost:3000';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  // private socket;
  messagecontent:string|null="";
  messages:string[]= [];
  rooms=[];
  roomslist:string="";
  roomnotice:string="";
  currentroom:string="";
  isinRoom= false;
  newroom : string="";
  numusers: number=0;
  ioConnection:any;



  constructor(private socketService: SocketService) { }

  ngOnInit() {


    this.socketService.initSocket();
    this.socketService.getMessage((msg: any) =>{this.rooms=JSON.parse((msg))});
    this.socketService.reqroomList();
    this.socketService.getroomList((msg: any) => { this.rooms = JSON.parse(msg)});
    this.socketService.notice((msg: any) =>{ this.roomnotice = msg});
    this.socketService.joined((msg: any) => { this.currentroom = msg
    if(this.currentroom != ""){
      this.isinRoom = true;
    }else{
      this.isinRoom = false;
    }
  });
    // this.initToConnection();

  }


// private initToConnection(){
//   this.socketService.initSocket();
//   this.ioConnection = this.socketService.onMessage()
//     .subscribe((message:string) => {
//     //console.log('message inc:'+message);
//     this.messages.push(message);
//   });
// }

joinroom(){
    this.socketService.joinroom(this.roomslist);
    this.socketService.reqnumusers(this.roomslist);
    this.socketService.getnumusers((res: any)=>{ this.numusers = res});
    // this.socketService.getMessage();
    // console.log("0987", this.messages);

  }


clearnotice(){
    this.roomnotice = "";
  }

leaveroom(){
    this.socketService.leaveroom(this.currentroom);
    this.socketService.reqnumusers(this.currentroom);
    this.socketService.getnumusers((res: any) => {this.numusers = res});
    this.roomslist = "";
    this.currentroom = "";
    this.isinRoom = false;
    this.numusers = 0;
    this.roomnotice = "";
    this.messages = [];
  }

createroom(){
  console.log(this.createroom);
  this.socketService.createroom(this.newroom);
  this.socketService.reqroomList();
  this.newroom = "";
}

chat(){
  if(this.messagecontent){
    this.socketService.sendMessage(this.messagecontent);
    console.log("5678", this.messagecontent);
    this.messagecontent = null;
  }else{
    console.log("No Message");
  }
  }

// chat(){
//   if(this.messagecontent){
//     //console.log(this.messagecontent);
//     this.socketService.send(this.messagecontent);
//     this.messagecontent=null;
//   }else{
//     console.log("no message");
//   }
// }

}

