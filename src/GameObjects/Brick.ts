export class Brick {

  public x: number = 0;
  public y: number = 0;
  public width: number = 100;
  public height: number = 30;
  public hitpoints: number = 3;

  constructor(private ctx: CanvasRenderingContext2D, x: number, y: number, hitpoints: number) {
    this.x = x;
    this.y = y;
    this.hitpoints = hitpoints;
  }

  draw() {
    this.ctx.fillStyle = this.getColor();
    this.ctx.shadowColor = 'black';
    this.ctx.shadowBlur = 3;
    this.ctx.shadowOffsetX = 2;
    this.ctx.shadowOffsetY = 2;
    this.ctx.fillRect(this.x - this.width / 2, this.y, this.width, this.height);
    this.ctx.shadowColor='rgba(0,0,0,0)';
  }

  getColor(): string {
    switch (this.hitpoints) {
      case 8:
        return '#182DF5';
      case 7:
        return '#B818F5';
      case 6:
        return '#F50C0E';
      case 5:
        return '#F5720C';
      case 4:
        return '#F6C000';
      case 3:
        return '#B3F518';
      case 2:
        return '#18F556';
      case 1:
        return '#18DAF5';
      default:
        return 'white';
    }
  }


  getBottomEdge(): number {
    return this.y + this.height;
  }

  getTopEdge(): number {
    return this.y;
  }

  getRightEdge(): number {
    return this.x + this.width / 2;
  }

  getLeftEdge(): number {
    return this.x - this.width / 2;
  }

}
