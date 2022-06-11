export class Paddle {

  public x: number = 0;
  public y: number = 0;
  private width: number = 150;
  private height: number = 30;
  public currentSpeed: number = 0;
  public SPEED: number = 20;

  constructor(private ctx: CanvasRenderingContext2D, private GAME_WIDTH: number, private GAME_HEIGHT: number) {
    this.x = this.GAME_WIDTH / 2;
    this.y = this.GAME_HEIGHT - this.height - this.height
  }

  draw() {
    this.ctx.fillStyle = '#B4772F';
    this.move()
    this.ctx.fillRect(this.x - this.width / 2, this.y, this.width, this.height);
  }

  move() {
    if (this.x - this.width / 2 + this.currentSpeed > 0 && this.x + this.width / 2 + this.currentSpeed < this.GAME_WIDTH) {
      this.x += this.currentSpeed;
    }
  }

  getTopEdge(): number {
    return this.y;
  }

  getBottomEdge(): number {
    return this.y + this.height;
  }

  getRightEdge(): number {
    return this.x + this.width / 2;
  }

  getLeftEdge(): number {
    return this.x - this.width / 2;
  }

}
