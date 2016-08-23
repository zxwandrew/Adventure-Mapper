import { Component, OnInit, Input } from '@angular/core';
import { Attraction } from './attraction.model'
import Map = require('esri/Map');
import { MapComponent, MapService } from '../map';
import Point = require('esri/geometry/Point');
import Polygon = require('esri/geometry/Polygon');

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
  geometry: any = {};

  constructor() { }

  ngOnInit() {
    if(this.attraction != null){
      this.attractionId = this.attraction.index;
      if(this.attraction.geometry.type=="point"){
        this.geometry = new Point(this.attraction.geometry);
      }else if(this.attraction.geometry.type == "polygon"){
        this.geometry = new Polygon(this.attraction.geometry);
      }
    }
  }

  popoverToggle(){
    this.popoverDisplay = !this.popoverDisplay;
  }

}
