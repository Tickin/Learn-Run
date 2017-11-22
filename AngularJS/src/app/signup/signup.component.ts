import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {Admin} from '../data/admin';
import {ADMINS} from '../data/admin-mock';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  admin: Admin = { id: '', pw: '', users: null, isAdmin: false };
  psTest:string;
  constructor(private router: Router) { }

  ngOnInit() {
  }


  clear(){
    this.router.navigate(['./login']);
    
  }

  login(){
    alert("가입되었습니다");
    this.clear();
  }
}
