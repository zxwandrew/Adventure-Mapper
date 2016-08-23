import { Injectable } from '@angular/core';
import Map = require('esri/Map');
import SimpleRenderer = require('esri/renderers/SimpleRenderer')
import SimpleMarkerSymbol = require('esri/symbols/SimpleMarkerSymbol');
import SimpleFillSymbol = require('esri/symbols/SimpleFillSymbol');
import PictureMarkerSymbol = require('esri/symbols/PictureMarkerSymbol');
import FeatureLayer = require('esri/layers/FeatureLayer');
import Color = require('esri/Color');
import Collection = require('esri/core/Collection');
import Graphic = require('esri/Graphic');
import Point = require('esri/geometry/Point');
import Polygon = require('esri/geometry/Polygon');

@Injectable()
export class MapService {
  map: Map
  pointsLayer: FeatureLayer
  polygonsLayer: FeatureLayer
  fields: any = [
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
  popupTemplate: any = {
    title: "<a href=#attraction-{ObjectID}>{ObjectID}. {name}</a>",
    content: "<p>{notes}... <a href=#attraction-{ObjectID}>more</a></p>" +
    "<img src='{image1}' alt='image1' with='100' height='100'>"
  };
  pointsRenderer: SimpleRenderer;
  polygonsRenderer: SimpleRenderer;

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

    this.polygonsRenderer = new SimpleRenderer({
      symbol: new SimpleFillSymbol({
        color: new Color([ 51,51, 204, 0.9 ]),
        style: "solid"
      })
    });

    let tempPointsGraphics: Collection = new Collection();
    //featurelayer
    this.pointsLayer = new FeatureLayer({
      source: tempPointsGraphics,
      fields: this.fields,
      objectIdField: "ObjectID",
      renderer: this.pointsRenderer,
      spatialReference: { wkid: 4326 },
      geometryType: "point",
      popupTemplate: this.popupTemplate
    });
    this.map.add(this.pointsLayer);

    let tempPolygonGraphics: Collection = new Collection();
    this.polygonsLayer = new FeatureLayer({
      source: tempPolygonGraphics,
      fields: this.fields,
      objectIdField: "ObjectID",
      renderer: this.polygonsRenderer,
      spatialReference: { wkid: 4326 },
      geometryType: "polygon",
      popupTemplate: this.popupTemplate
    });
    this.map.add(this.polygonsLayer);

    return this.map;
  }

  addGraphic(location: any) {
    if(location.geometry.type == 'point'){
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
    }else if(location.geometry.type == 'polygon'){
      let graphic: Graphic = new Graphic({
        geometry: new Polygon(location.geometry),
        attributes: {
          ObjectID: location.index,
          name: location.name,
          notes: location.notes.substr(0, 150),
          image1: location.images[1],
        }
      });
      this.polygonsLayer.source.add(graphic);
    }
  }
}
