export class Ball {

  public x: number = 0;
  public y: number = 0;
  public width: number = 10;
  public height: number = 10;
  public xSpeed: number = 0;
  public ySpeed: number = 0;
  private speedBoosterTimer = 0;

  constructor(private ctx: CanvasRenderingContext2D, private GAME_WIDTH: number, private GAME_HEIGHT: number) {
    this.x = this.GAME_WIDTH / 2;
    this.y = this.GAME_HEIGHT / 2;
    this.xSpeed = 4;
    this.ySpeed = 4;
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

  draw() {
    this.ctx.fillStyle = '#F9C26B';
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
    this.speedBoosterTimer = 30;
  }

}
