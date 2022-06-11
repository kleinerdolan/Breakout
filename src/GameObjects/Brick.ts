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
      case 5:
        return '#EF4537';
      case 4:
        return '#579242';
      case 3:
        return '#049E9C';
      case 2:
        return '#9876AA';
      case 1:
        return '#AFB1B3';
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
