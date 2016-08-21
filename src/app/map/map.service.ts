import { Injectable } from '@angular/core';
import Map = require('esri/Map');

@Injectable()
export class MapService {
  map: Map

  constructor() { }

  createMap(){
    this.map = new Map({
      basemap: "streets"
    });
    return this.map;
  }

}
