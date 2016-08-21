import { Injectable } from '@angular/core';
import Map = require('esri/Map');
import SimpleRenderer = require('esri/renderers/SimpleRenderer')
import SimpleMarkerSymbol = require('esri/symbols/SimpleMarkerSymbol');
import FeatureLayer = require('esri/layers/FeatureLayer');
import Color = require('esri/Color');
import Collection = require('esri/core/Collection');
import Graphic = require('esri/Graphic');
import Point = require('esri/geometry/Point');
// import {PageScroll} from 'ng2-page-scroll';

@Injectable()
export class MapService {
  map: Map
  pointsLayer: FeatureLayer
  pointsFields: any = [
    {
      name: "ObjectID",
      alias: "ObjectID",
      type: "oid"
    }, {
      name: "name",
      alias: "name",
      type: "string"
    }, {
      name: "notes",
      alias: "notes",
      type: "string"
    }, {
      name: "image1",
      alias: "image1",
      type: "string"
    }];
    // Set up popup template for the layer
 pointsTemplate: any = {
    title: "<a href=#attraction-{ObjectID}>{ObjectID}</a>",
    content: "<h2>{name}</h2>"+
    "<p>{notes}... more</p>"+
    "<img src='{image1}' alt='image1' with='100' height='100'>"
  };

  pointsRenderer: SimpleRenderer;


  constructor() { }

  createMap(){
    this.map = new Map({
      basemap: "streets"
    });

    let tempOutlineColor: Color = new Color("#FF0055");
    let tempInnerColor: Color = new Color([211, 255, 0, 0]);
    this.pointsRenderer = new SimpleRenderer({
      symbol: new SimpleMarkerSymbol({
          style: "circle",
          size: 20,
          color: tempInnerColor,
          outline: {
            width: 1,
            color: tempOutlineColor,
            style: "solid"
          }
        })
    });

    let tempGraphics: Collection = new Collection();
    //featurelayer
    this.pointsLayer = new FeatureLayer({
      source: tempGraphics,
      fields: this.pointsFields, // This is required when creating a layer from Graphics
      objectIdField: "ObjectID", // This must be defined when creating a layer from Graphics
      renderer: this.pointsRenderer, // set the visualization on the layer
      spatialReference: { wkid: 4326 },
      geometryType: "point", // Must be set when creating a layer from Graphics
      popupTemplate: this.pointsTemplate
    });
    this.map.add(this.pointsLayer);

    return this.map;
  }

  addGraphic(index: number, location:any){
    // console.log(location);
    let graphic: Graphic = new Graphic({
      geometry: new Point({
        longitude: location.long,
        latitude: location.lat
      }),
      attributes: {
        ObjectID: index,
        name: location.name,
        notes: location.notes.substr(0,150),
        image1: location.images[1],
      }
    });
    this.pointsLayer.source.add(graphic);
  }

}
