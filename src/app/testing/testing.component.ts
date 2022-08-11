import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';

// import { BookService } from '../book.service';

// @Component({
//   selector: 'app-testing',
//   templateUrl: './testing.component.html',
//   styleUrls: ['./testing.component.css']
// })
// export class TestingComponent implements OnInit {

//   username ="";
//   password  = "";
//   constructor(private bookService: BookService) { }

//   setItem(){
//     this.bookService.setItem(this.username, this.password);
//     console.log(this.bookService.jsonItems);
//   }

//   ngOnInit() {
//   }

// }


@Component({
  selector: 'app-testing',
  templateUrl: './testing.component.html',
  styleUrls: ['./testing.component.css']
})
export class TestingComponent implements OnInit {
  userid = sessionStorage.getItem('userid');
  username = sessionStorage.getItem('username');
  birthdate = sessionStorage.getItem('userbirthdate');
  userage = sessionStorage.getItem('userage');

  constructor() {}
  ngOnInit() {}

}