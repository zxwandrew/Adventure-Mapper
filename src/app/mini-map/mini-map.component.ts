import { Component, Output, EventEmitter, Input, OnInit} from '@angular/core';
import Map = require('esri/Map');
import MapView = require('esri/views/MapView');
import Extent = require('esri/geometry/Extent');
import Point = require('esri/geometry/Point');
import Query = require('esri/tasks/support/Query');
import PictureMarkerSymbol = require('esri/symbols/PictureMarkerSymbol');
import SimpleFillSymbol = require('esri/symbols/SimpleFillSymbol');
import Color = require('esri/Color');

@Component({
  selector: 'esri-mini-map',
  templateUrl: 'mini-map.component.html',
  styleUrls: ['mini-map.component.css']
})
export class MiniMapComponent implements OnInit {
  @Input() map:Map
  @Input() mapKey:number
  @Input() geometry:any
  view:MapView
  divName:string;

  constructor() { }

  ngOnInit() {
    this.divName = "map-div"+this.mapKey
  }

  ngAfterViewInit() {
    if(this.geometry.type == "point"){
      this.view = new MapView({
        container: this.divName,
        map: this.map,
        zoom: 15,
        center: [this.geometry.longitude, this.geometry.latitude]
      });
      this.view.ui.remove('zoom');

      this.queryThisFeature(0).then(this.highlightFeature);
    }else if(this.geometry.type == "polygon"){
      this.view = new MapView({
        container: this.divName,
        map: this.map,
        zoom: 15,
        center: [this.geometry.extent.center.x, this.geometry.extent.center.y]
      });
      this.view.ui.remove('zoom');
      this.queryThisFeature(1).then(this.highlightFeature);
    }
  }

  ngOnDestroy() {
    if(this.geometry.type == "point"){
      this.queryThisFeature(0).then(this.unhighlightFeature);
    }else if(this.geometry.type == "polygon"){
      this.queryThisFeature(1).then(this.unhighlightFeature);
    }

  }

  queryThisFeature(layerIndex:number){
    let query = new Query();
    query.objectIds=[this.mapKey];
    return this.map.layers.getItemAt(layerIndex).queryFeatures(query);
  }

  highlightFeature(results:any){
    if(results.features[0].geometry.type == "point"){
      results.features[0].symbol = new PictureMarkerSymbol({
        url: "http://www.iconsfind.com/wp-content/uploads/2016/01/20160111_5693c117ae35e.png",
        width: 30,
        height: 30
      });
    }else if(results.features[0].geometry.type == "polygon"){
      results.features[0].symbol = new SimpleFillSymbol({
          color: new Color([ 255,165, 0, 0.9 ]),
          style: "solid"
        });
    }
  }

  unhighlightFeature(results:any){
    results.features[0].symbol = null;
  }

}
