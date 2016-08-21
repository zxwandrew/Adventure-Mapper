import { Component, ElementRef, Output, EventEmitter, Input } from '@angular/core';
import Map = require('esri/Map');
import MapView = require('esri/views/MapView');
import Extent = require('esri/geometry/Extent');
import Point = require('esri/geometry/Point');

// import { MapService } from './map.service';

@Component({
  selector: 'esri-map',
  templateUrl: 'map.component.html',
  styleUrls: ['map.component.css']
})
export class MapComponent{
  @Input() map:Map
  view:MapView

  ngOnInit(){
    this.view = new MapView({
      container: "map-div",
      map: this.map,
      zoom: 4,
      center: [15, 65]
    });

  }

  ngAfterViewInit() {

  }

  centerMap(center:any){
    if(center.minlong == center.maxlong || center.minlat == center.maxlat){
      let pt = new Point({
        longitude: center.minlong,
        latitude: center.minlat
      });
      this.view.center = pt;
      this.view.zoom = 16;
    }else{
      console.log("here");
      this.view.extent = new Extent({
        xmin: center.minlong,
        ymin: center.minlat,
        xmax: center.maxlong,
        ymax: center.maxlat,
        spatialReference: 4326
      }).expand(3);
    }
  }
}
