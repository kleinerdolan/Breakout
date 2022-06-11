export class Paddle {

  public x: number = 0;
  public y: number = 0;
  private width: number = 150;
  private height: number = 30;
  public speed: number = 10;

  constructor(private ctx: CanvasRenderingContext2D, private GAME_WIDTH: number, private GAME_HEIGHT: number) {
    this.x = this.GAME_WIDTH / 2;
    this.y = this.GAME_HEIGHT - this.height - this.height
  }

  draw() {
    this.ctx.fillStyle = 'black';
    this.ctx.fillRect(this.x - this.width / 2, this.y, this.width, this.height);
  }

  moveLeft() {
    if (this.x - this.width / 2 - this.speed > 0) {
      this.x -= this.speed;
    }
  }

  moveRight(gameWidth: number) {
    if (this.x + this.width / 2 + this.speed < gameWidth) {
      this.x += this.speed;
    }
  }

}
