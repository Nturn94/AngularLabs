import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io } from 'socket.io-client';
import { nextTick } from 'process';


const SERVER_URL = "http://localhost:3000/chat";

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: any;
  constructor() { }
  
  initSocket(): void {
    this.socket = io(SERVER_URL);
  }

  joinroom(selroom: any):void{
    this.socket.emit("joinRoom", selroom);
  }

  leaveroom(selroom: any):void {
    this.socket.emit("leaveRoom",selroom);
  }

  joined(next: any){
    this.socket.on('joined', (res: any)=>next(res));
  }
  createroom(newroom: any){
    this.socket.emit('newroom', newroom);
  }

  reqnumusers(selroom: any){
    this.socket.emit("numusers", selroom);
  }

  getnumusers(next: any){
    this.socket.on('numusers', (res: any)=>next(res));
  }

  reqroomList(){
    this.socket.emit('roomslist', (res: any)=>nextTick(res));
  }
  getroomList(next: any){
    this.socket.on('roomslist', (res: any)=>next(res));
  }
  
  notice(next: any){
    this.socket.on('notice', (res: any)=>next(res));
  }
  
  sendMessage(message: String): void {
    this.socket.emit('message', message);
  }


  onMessage(): Observable<any> {
    let observable = new Observable(observer=>{
      this.socket.on('message', (data:string) => observer.next(data));
    });
    return observable;
  }

  // public send(message: string): void {
  //   //console.log("sock.serv: "+message);
  //   this.socket.emit('message', message);
  // }

  getMessage(next: any){
    this.socket.on('message', (message: any)=>next(message));
  }

  
  // getMessage(next: any){
  //   this.socket.on('message', (message: any)=>next(message));
  // }

  
}
