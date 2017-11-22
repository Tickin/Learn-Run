import { Injectable } from '@angular/core';
import { Lecture } from '../Data/lecture';
import { LECTURES } from '../Data/lecture-mock';

@Injectable()
export class LectureClassService {
  getLecture(){
    return Lecture;
  }

  getLectureByUser(name : string):Lecture[]{
    let ans:Array<Lecture>;
    let lect:Array<Lecture>=LECTURES;
    for(var i=0;i<lect.length;i++){
      if(name!=lect[i].name){
        ans.push(lect[i]);
      }
    }
    return ans;

  }
}
