export class Map {
  name: string
  id: number
  image: string
  selected: boolean;

  constructor(name: string, id: number, image: string) {
    this.name = name;
    this.id = id;
    this.image = image;
    this.selected = false;
  }
}
