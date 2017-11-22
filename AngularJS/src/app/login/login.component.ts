import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Admin } from '../Data/admin'
import { ADMINS } from '../Data/admin-mock'
import { LoginService } from './login.service'

import { Response } from '@angular/http';
import { Token } from '../Token';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  admin: Admin = { id: '', pw: '', users: null, isAdmin: false };

  constructor(
    private router: Router,
    private loginService: LoginService,
    public token: Token
  ) { }

  ngOnInit() {
  }


  login(): void {

    let self = this;

    this.token._promise().then(function (text) {
      Token.id = (text as Response).headers.get('X-Subject-Token');
      let chk = self.check();

      if (chk != -1) {
        self.loginService.getAdmin(ADMINS[chk]);
        console.log(self.loginService._admin);
        console.log(Token.id);
        self.router.navigate(['/screen']);

      }
      else {
        self.admin.pw = '';
        alert("아이디, 암호를 다시 확인하여 주세요");
      }
    }, function (error) {
      console.log(error);
    });



  }

  clear(): void {
    let self = this;
    self.router.navigate(['/signup']);

  }

  check(): number {
    let i = 0;
    for (let adm of ADMINS) {
      if (adm.id === this.admin.id && adm.pw === this.admin.pw)
        return i;
      i++;
    }
    return -1;
  }
}
