import { Component, ElementRef, Output, EventEmitter, Input } from '@angular/core';
import Map = require('esri/Map');
import MapView = require('esri/views/MapView');
import Extent = require('esri/geometry/Extent');
import Point = require('esri/geometry/Point');

@Component({
  selector: 'esri-map',
  templateUrl: 'map.component.html',
  styleUrls: ['map.component.css']
})
export class MapComponent{
  @Input() map:Map
  @Input() mapKey:string
  @Input() mapExtent:Extent
  view:MapView
  divName:string;

  ngOnInit(){
    this.divName = "map-div"+this.mapKey
  }

  ngAfterViewInit() {
    this.view = new MapView({
      container: this.divName,
      map: this.map,
      zoom: 4,
      extent: this.mapExtent
    });
  }

  centerMap(extent:Extent){
    if(extent.xmax== extent.xmin || extent.ymax == extent.ymin){
      let pt = new Point({
        longitude: extent.xmax,
        latitude: extent.ymax
      });
      this.view.center = pt;
      this.view.zoom = 16;
    }else{
      console.log("here");
      this.view.extent = extent.expand(3);
    }
  }
}
