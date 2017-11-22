import { Component, OnInit } from '@angular/core';
import { LECTURES } from '../Data/lecture-mock';
import { Lecture } from '../data/lecture';
import { LoginService } from '../login/login.service'
import { Sort, MatSort } from '@angular/material';
import { Router } from '@angular/router';
import { LectureClassService } from './lecture-class.service';
import { VdiToken } from '../vdiToken';
import { Servers } from '../servers'
@Component({
  selector: 'app-lecture-class',
  templateUrl: './lecture-class.component.html',
  styleUrls: ['./lecture-class.component.css']
})
export class LectureClassComponent implements OnInit {
  //lec: Lecture[];
  isAdmin = false;
  isUser = false;

  sortedData;
  constructor(
    _loginservice: LoginService,
    private router: Router,
    public vdiToken: VdiToken,
    public servers: Servers) {
    //this.lec = LECTURES;
    this.isAdmin = _loginservice._admin.isAdmin;
    this.isUser = true;
    this.sortedData = LECTURES;

    this.servers._promise().then(function (text) {
      console.log(text);
      Servers.id = (text as Response).json()['servers'][0]['id'];
      console.log(Servers.id);
    }, function (error) {
      console.log(error);
    });
  }

  ngOnInit() {

  }

  vcs() {
    this.router.navigate(['lecture/vcs']);

  }
  vdi() {
    let self = this;


    //window.setTimeout(this.nothing(),1000);

    this.vdiToken._promise().then(function (text) {
      VdiToken.id = 'http://164.125.70.14:16080/' + ((text as Response).json()['console']['url'] as string).substring(27);
      console.log(text);
      console.log(VdiToken.id);
      self.router.navigate(['/vdi']);
    }, function (error) {
      console.log(error);
    });

  } 
  nothing(): void {

  }












  sortData(sort: Sort) {
    const data = this.sortedData.slice();
    if (!sort.active || sort.direction == '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      let isAsc = sort.direction == 'asc';
      switch (sort.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'profName': return compare(a.prof.name, +b.prof.name, isAsc);
        default: return 0;
      }
    });
  }


}

function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}