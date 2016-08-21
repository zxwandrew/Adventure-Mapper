import { Component, ViewChild } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

import { MapComponent } from './map';
import { AttractionComponent } from './attraction/attraction.component';

import {AdventureService } from './adventure/adventure.service'
import { Adventure } from './adventure/adventure.model'

@Component({
    directives: [MapComponent, AttractionComponent],
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.css'],
    providers: [AdventureService]
})
export class AppComponent {
  @ViewChild(MapComponent) mapComponent:MapComponent;
  title = 'Map Title';
  items: FirebaseListObservable<any[]>;
  adventure: Observable<Adventure>;

  constructor(private adventureService: AdventureService){
    // this.items = af.database.list('items');
    // af.database.list('adventure/1').subscribe(adv => console.log(adv))
    // af.database.list('items').subscribe(items => console.log(items));
  }

  ngOnInit(){
    this.adventure = this.adventureService.get(1);
    console.log(this.adventure.subscribe(adventure => console.log(adventure)));
  }
}
