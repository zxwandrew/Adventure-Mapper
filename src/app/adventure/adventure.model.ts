import {Attraction} from "../attraction/attraction.model"

export class Adventure {
  constructor(
    public attractions: Attraction[],
    public author: string,
    public notes: string,
    public id: number,
    public maxlat: number,
    public maxlong: number,
    public minlat: number,
    public minlong: number,
    public name: string
  ) { }
};
