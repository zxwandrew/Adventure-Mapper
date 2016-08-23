import { Component, Output, EventEmitter, Input, OnInit} from '@angular/core';
import Map = require('esri/Map');
import MapView = require('esri/views/MapView');
import Extent = require('esri/geometry/Extent');
import Point = require('esri/geometry/Point');
import Query = require('esri/tasks/support/Query');
import PictureMarkerSymbol = require('esri/symbols/PictureMarkerSymbol');

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
    if(this.geometry.type == "Point"){
      this.view = new MapView({
        container: this.divName,
        map: this.map,
        zoom: 15,
        center: [this.geometry.coordinates[0][0], this.geometry.coordinates[0][1]]
      });
      this.view.ui.remove('zoom');

      //should be moved out
      let query = new Query();
      query.objectIds=[this.mapKey];
      this.map.layers.getItemAt(0).queryFeatures(query).then(function(results){
        console.log(results.features);
        results.features[0].symbol = new PictureMarkerSymbol({
          url: "http://www.iconsfind.com/wp-content/uploads/2016/01/20160111_5693c117ae35e.png",
          width: 30,
          height: 30
        });
      });
    }
  }

  ngOnDestroy() {
    let query = new Query();
    query.objectIds=[this.mapKey];
    this.map.layers.getItemAt(0).queryFeatures(query).then(function(results){
      console.log(results.features);
      results.features[0].symbol = null;
    });
  }

}
