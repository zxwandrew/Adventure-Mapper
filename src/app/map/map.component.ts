import { Component, ElementRef, Output, EventEmitter, Input } from '@angular/core';
import Map = require('esri/Map');
import MapView = require('esri/views/MapView');

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
    // this.map = new Map({
    //   basemap: "streets"
    // });
    console.log(this.map)

    this.view = new MapView({
      container: "map-div",
      map: this.map,
      zoom: 4,
      center: [15, 65]
    });

  }

  ngAfterViewInit() {

  }
  //
  // @Output() mapLoaded = new EventEmitter();
  //
  // map: any;
  // options: Object;
  // itemId: string;
  //
  // constructor(private elRef:ElementRef, private _mapService:MapService) {}
  //
  // ngOnInit() {
  //   // create the map
  //   this._mapService.createMap(this.itemId, this.elRef.nativeElement.firstChild, this.options).then((response) => {
  //     // get a reference to teh map and expose response to app
  //     this.map = response.map;
  //     this.mapLoaded.next(response);
  //   });
  // }
  //
  // setBasemap(basemapName) {
  //   this._mapService.clearBasemap(this.map);
  //   this.map.setBasemap(basemapName);
  // }
  //
  // // destroy map
  // ngOnDestroy() {
  //   if (this.map) {
  //     this.map.destroy();
  //   }
  // }
}
