import { Injectable } from '@angular/core';
import Map = require('esri/Map');
import SimpleRenderer = require('esri/renderers/SimpleRenderer')
import SimpleMarkerSymbol = require('esri/symbols/SimpleMarkerSymbol');
import PictureMarkerSymbol = require('esri/symbols/PictureMarkerSymbol');
import FeatureLayer = require('esri/layers/FeatureLayer');
import Color = require('esri/Color');
import Collection = require('esri/core/Collection');
import Graphic = require('esri/Graphic');
import Point = require('esri/geometry/Point');

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
    title: "<a href=#attraction-{ObjectID}>{ObjectID}. {name}</a>",
    content: "<p>{notes}... <a href=#attraction-{ObjectID}>more</a></p>" +
    "<img src='{image1}' alt='image1' with='100' height='100'>"
  };
  pointsRenderer: SimpleRenderer;


  constructor() { }

  createMap() {
    this.map = new Map({
      basemap: "streets"
    });

    let tempOutlineColor: Color = new Color("#FF0055");
    let tempInnerColor: Color = new Color([211, 255, 0, 0]);
    this.pointsRenderer = new SimpleRenderer({
      symbol: new PictureMarkerSymbol({
        url: "http://www.iconsfind.com/wp-content/uploads/2015/10/20151012_561baa2aa747e.png",
        width: 30,
        height: 30
      })
    });

    let tempGraphics: Collection = new Collection();
    //featurelayer
    this.pointsLayer = new FeatureLayer({
      source: tempGraphics,
      fields: this.pointsFields,
      objectIdField: "ObjectID",
      renderer: this.pointsRenderer,
      spatialReference: { wkid: 4326 },
      geometryType: "point", // Must be set when creating a layer from Graphics
      popupTemplate: this.pointsTemplate
    });
    this.map.add(this.pointsLayer);

    return this.map;
  }

  addGraphic(location: any) {

    let graphic: Graphic = new Graphic({
      geometry: new Point(location.geometry),
      attributes: {
        ObjectID: location.index,
        name: location.name,
        notes: location.notes.substr(0, 150),
        image1: location.images[1],
      }
    });
    this.pointsLayer.source.add(graphic);
  }

}
