import { Component, OnInit } from '@angular/core';
import { User } from '../Data/user';
import { USERS } from '../Data/user-mock'
import { LoginService } from '../login/login.service'
import { Servers } from '../servers';
import { Token } from '../Token';

@Component({
  selector: 'app-user-manage',
  templateUrl: './user-manage.component.html',
  styleUrls: ['./user-manage.component.css']
})
export class UserManageComponent implements OnInit {
  //public _loginService: LoginService;
  constructor(public _loginService: LoginService) {
    if (this._loginService._admin.users.length === 0) {
      this._loginService._admin.users = new Array<User>();
      USERS.forEach(value => {
        let _id = value['id'];
        let _name = value['name'];
        let _state = value['state'];
        let _personalVM = value['personalVM'];
        let tmpUser: User = new User(_id, _name, _state, _personalVM);
        this._loginService._admin.users.push(tmpUser);
      })
    }
  }

  ngOnInit() {
  }

  userDelete() {
    let userList = this._loginService._admin.users;

    console.log(this._loginService._admin.users);
    for (let i = 0; i < userList.length; i++) {
      if (userList[i].isDeleted === true)
        this._loginService._admin.users.splice(i, 1);
    }
  }
  userCreate() {
  }

  setVM(usr: User): void {
    this._loginService.setUser(usr);

  }
}
