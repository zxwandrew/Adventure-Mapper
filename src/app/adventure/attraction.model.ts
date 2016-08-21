export class Attraction {
  constructor(
    public images: string[],
    public lat: number,
    public long: number,
    public name: string,
    public notes: string,
  ) { }
};
