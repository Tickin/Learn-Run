import { User } from './user';

export class Admin{
    id : string;
    pw : string;
    users:User[];
    
    isAdmin:boolean;
}