import { Component, OnInit } from '@angular/core';
import { Servers } from '../servers'
import { Router } from '@angular/router';
import { LoginService } from '../login/login.service';

import { Response } from '@angular/http';

@Component({
  selector: 'app-screen',
  templateUrl: './screen.component.html',
  styleUrls: ['./screen.component.css']
})
export class ScreenComponent implements OnInit {

  constructor(
    private router: Router,
    private servers: Servers,
    public _loginservice:LoginService
    
  ) {
  }

  ngOnInit() {
  }
  user() {
    let self = this;
    
    this.servers._promise().then(function (text) {
      console.log(text);
      Servers.id = (text as Response).json()['servers'][0]['id'];

      console.log(Servers.id);

      self.router.navigate(['/usermanage']);
    }, function (error) {
      console.log(error);
    });
    

   // self.router.navigate(['/usermanage']);

  }
  asd() {
    this.router.navigate(['/lecture']);
  }
}
