import {Injectable} from '@angular/core';
import {VMList1} from './mock-vm';
import {VM} from './Vm';
// 임시 데이터 가져오기
@Injectable()

@Injectable()
export class VMListService {
	public _VMList : VM[] = VMList1;
    constructor(){}
}