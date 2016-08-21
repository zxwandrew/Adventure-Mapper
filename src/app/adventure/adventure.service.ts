import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { Adventure } from './adventure.model'
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Injectable()
export class AdventureService {

  adventure:Observable<Adventure>
  af: AngularFire

  constructor(_af: AngularFire){
    this.af = _af;
  }

  get(index:number): Observable<Adventure>{
    this.adventure = this.af.database.object('adventure/'+index);
    return this.adventure;
  }

}
