import { Component, OnInit, Input } from '@angular/core';
import { Attraction } from './attraction.model'
import Map = require('esri/Map');
import { MapComponent, MapService } from '../map';

@Component({
  selector: 'app-attraction',
  templateUrl: 'attraction.component.html',
  styleUrls: ['attraction.component.css'],
  directives: [MapComponent]
})
export class AttractionComponent implements OnInit {
  @Input() attraction: Attraction;
  @Input() map: Map;
  attractionId: number;
  popoverDisplay: Boolean = false;

  constructor() { }

  ngOnInit() {
    if(this.attraction != null){
      this.attractionId = this.attraction.index;
    }
  }

  popoverToggle(){
    this.popoverDisplay = !this.popoverDisplay;
  }

}
