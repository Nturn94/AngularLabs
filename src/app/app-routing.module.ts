import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';

import { LoginComponent } from './login/login.component';
import { AccountComponent } from './account/account.component';
import { TestingComponent } from './testing/testing.component';

const routes: Routes = [

  {path: 'login', component: LoginComponent },
  {path: 'account', component: AccountComponent },
  {path: 'testing', component: TestingComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

 }


// function Beep(){
//   router.navigate(['account']);
// }