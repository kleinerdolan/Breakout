export class Ball {

  public x: number = 0;
  public y: number = 0;
  private width: number = 10;
  private height: number = 10;
  public xSpeed: number = 0;
  public ySpeed: number = 0;
  private speedBoosterTimer = 0;

  constructor(private ctx: CanvasRenderingContext2D, private GAME_WIDTH: number, private GAME_HEIGHT: number) {
    this.x = this.GAME_WIDTH / 2;
    this.y = this.GAME_HEIGHT / 2;
    this.xSpeed = 3;
    this.ySpeed = 3;
  }

  getBottomEdge(): number {
    return this.y + this.height;
  }

  getTopEdge(): number {
    return this.y;
  }

  getRightEdge(): number {
    return this.x + this.width;
  }

  getLeftEdge(): number {
    return this.x;
  }

  draw() {
    this.ctx.fillStyle = 'black';
    this.move();
    this.ctx.fillRect(this.x - this.width / 2, this.y, this.width, this.height);
  }

  move() {
    if (this.speedBoosterTimer > 0) {
      this.x += this.xSpeed * 5;
      this.y += this.ySpeed * 5;
      this.speedBoosterTimer -= 1;
    } else {
      this.x += this.xSpeed;
      this.y += this.ySpeed;
    }
  }

  speedBoost(): void {
    this.speedBoosterTimer = 10;
  }

}
