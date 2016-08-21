import { Component, ViewChild } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

import { MapComponent, MapService } from './map';
import Map = require('esri/Map');

import { AttractionComponent } from './attraction/attraction.component';

import {AdventureService } from './adventure/adventure.service'
import { Adventure } from './adventure/adventure.model'

@Component({
    directives: [MapComponent, AttractionComponent],
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.css'],
    providers: [AdventureService, MapService]
})
export class AppComponent {
  @ViewChild(MapComponent) mapComponent:MapComponent;
  title = 'Map Title';
  items: FirebaseListObservable<any[]>;
  adventure: Observable<Adventure>;
  map: Map;

  constructor(private adventureService: AdventureService, private mapService: MapService){
    // this.items = af.database.list('items');
    // af.database.list('adventure/1').subscribe(adv => console.log(adv))
    // af.database.list('items').subscribe(items => console.log(items));
  }

  ngOnInit(){
    this.map = this.mapService.createMap();
    this.adventure = this.adventureService.get(1);
    console.log(this.adventure.subscribe(adventure => console.log(adventure)));
  }
}
