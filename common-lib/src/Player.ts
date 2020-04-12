export class Player {
  public name: string;
  public id: number | null;

  constructor(name: string, id: number | null = null) {
    this.name = name;
    this.id = id;
  }
}
