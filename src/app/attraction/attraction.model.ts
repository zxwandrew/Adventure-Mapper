export class Attraction {
  constructor(
    public index: number,
    public images: string[],
    public geometry: any,
    public name: string,
    public notes: string,
  ) { }
};
