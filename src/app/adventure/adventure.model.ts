import {Attraction} from "./attraction.model"

export class Adventure {
  constructor(
    public attractions: Attraction[],
    public author: string,
    public notes: string,
    public id: number,
  ) { }
};