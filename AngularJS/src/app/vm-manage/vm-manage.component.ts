import { Component, OnInit } from '@angular/core';
import { VM } from '../Data/vm';
import { State } from '../data/vm';
import { Location }                 from '@angular/common';
import { Router } from '@angular/router';
import { VdiToken } from '../vdiToken';

import { Compute_Instance } from './Compute_Instance';
import { LoginService } from '../login/login.service';

@Component({
    selector: 'app-vm-manage',
    templateUrl: './vm-manage.component.html',
    styleUrls: ['./vm-manage.component.css']
})
export class VmManageComponent implements OnInit {


    constructor( private _loginService:LoginService
    ,private location:Location
    ,private vdiToken:VdiToken
    ,private router:Router) {  }

    ngOnInit() {

    }

    showVdi(){
        let self = this;
        this.vdiToken._promise().then(function (text) {
          VdiToken.id = 'http://164.125.70.14:16080/' + ((text as Response).json()['console']['url'] as string).substring(27);
          console.log(VdiToken.id);
          self.router.navigate(['/vdi']);
        }, function (error) {
          console.log(error);
        });
    }

    backButton(){
        this._loginService._user=null;
        this.location.back();
    }
}
