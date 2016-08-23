import {Attraction} from "../attraction/attraction.model"
import Extent = require('esri/geometry/Extent');

export class Adventure {
  constructor(
    public attractions: Attraction[],
    public author: string,
    public notes: string,
    public id: number,
    public extent: Extent
  ) { }
};
