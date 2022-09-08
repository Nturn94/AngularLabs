import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccountComponent } from './account/account.component';
import { LoginComponent } from './login/login.component';
import { TestingComponent } from './testing/testing.component';
// import { RootComponent } from './root/root.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';
import { ChatComponent } from './chat/chat.component';
import { CommonModule } from '@angular/common';
import { SocketService } from './services/socket.service';
import { MSPComponent } from './msp/msp.component';


@NgModule({
  declarations: [
    AppComponent,
    AccountComponent,
    LoginComponent,
    TestingComponent,
    ChatComponent,
    MSPComponent
    // RootComponent,
    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      {path: 'account', component: AccountComponent},
      {path: 'login', component: LoginComponent},
      {path: 'testing', component: TestingComponent},
      {path: 'chat', component: ChatComponent},
      {path: 'msp', component: MSPComponent},
    ]),
    ReactiveFormsModule,
    CommonModule,

  ],
  providers: [SocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
