export class Attraction {
  constructor(
    public index: number,
    public images: string[],
    public geometry: any,
    public lat: number,
    public long: number,
    public name: string,
    public notes: string,
  ) { }
};
