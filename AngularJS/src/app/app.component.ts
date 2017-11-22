import { Component } from '@angular/core';
import { Token } from './Token';
import { LoginService } from './login/login.service';

import { enableProdMode } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'app';

  private _loginService: LoginService;
  constructor() {
    
    
    
    //console.log(Token.getToken());
  }
}
