import { Injectable } from '@angular/core';
import { Admin } from '../Data/admin';
import { User } from '../Data/User';

@Injectable()
export class LoginService {
  public _admin : Admin=null;
  public _user:User=null;
  constructor() { }
  getAdmin(adm:Admin):void{
    this._admin=adm;
    this._admin.users=new Array<User>();
  }

  setUser(usr:User):void{
    this._user=usr;
  }
  NullUser():void{
    this._user=null;
  }
}
