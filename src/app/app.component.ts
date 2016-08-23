import { Component, ViewChild } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { PageScroll } from 'ng2-page-scroll';
import Extent = require('esri/geometry/Extent');

import { MapComponent, MapService } from './map';
import Map = require('esri/Map');

import { AttractionComponent } from './attraction/attraction.component';

import {AdventureService } from './adventure/adventure.service'
import { Adventure } from './adventure/adventure.model'

import { Attraction } from './attraction/attraction.model'

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
  extent: Extent;
  attractions: Attraction[];

  constructor(private adventureService: AdventureService, private mapService: MapService){
    // this.items = af.database.list('items');
    // af.database.list('adventure/1').subscribe(adv => console.log(adv))
    // af.database.list('items').subscribe(items => console.log(items));
  }

  ngOnInit(){
    this.map = this.mapService.createMap();
    this.adventure = this.adventureService.get(1);

    this.adventure.subscribe(adventure => {
      this.extent = new Extent(adventure.extent);
      this.attractions = adventure.attractions;
      this.attractions.forEach((attraction, i)=>{
        // if(attraction == null){
        //   attractions.splice(i);
        // }else{
        //   attraction.index = i;
        // }
        attraction.index = i;
      });

      this.centerMap(this.extent);
      this.addGraphic();
    });
  }

  centerMap(){
    this.mapComponent.centerMap(this.extent);
  }

  addGraphic(){
    this.attractions.forEach((attraction, i)=>{
      this.mapService.addGraphic(attraction)
    })
  }

  ngAfterViewInit(){
  }
}
