import { Component, OnInit, Input } from '@angular/core';
import { Attraction } from './attraction.model'
import Map = require('esri/Map');
import { MapComponent, MapService } from '../map';
// import {POPOVER_DIRECTIVES} from "ng2-popover";

@Component({
  selector: 'app-attraction',
  templateUrl: 'attraction.component.html',
  styleUrls: ['attraction.component.css'],
  directives: [MapComponent]
})
export class AttractionComponent implements OnInit {
  @Input() attraction: Attraction;
  @Input() map: Map;
  @Input() attractionId: number;
  popoverDisplay: Boolean = false;

  constructor() { }

  ngOnInit() {
    // console.log(this.attractionID)
    // console.log(this.attraction)
  }

  popoverToggle(){
    this.popoverDisplay = !this.popoverDisplay;
  }

}
