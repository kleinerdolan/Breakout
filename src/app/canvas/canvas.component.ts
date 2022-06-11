import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {Paddle} from "../../GameObjects/Paddle";
import {Ball} from "../../GameObjects/Ball";
import {Brick} from "../../GameObjects/Brick";

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss']
})
export class CanvasComponent implements OnInit {

  GAME_WIDTH = 1080;
  GAME_HEIGHT = 720;

  collisionCooldown = 0;

  @ViewChild('canvas', {static: true})
  canvas!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D;

  paddle!: Paddle;
  ball!: Ball;
  bricks: Brick[] = [];

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'ArrowRight') {
      this.paddle.currentSpeed = this.paddle.SPEED;
    }
    if (event.key === 'ArrowLeft') {
      this.paddle.currentSpeed = this.paddle.SPEED * -1;
    }
  }

  @HostListener('document:keyup', ['$event'])
  handleDeleteKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'ArrowRight' || 'ArrowLeft') {
      this.paddle.currentSpeed = 0;
    }
  }

  constructor() {
  }

  ngOnInit(): void {
    this.ctx = this.canvas.nativeElement.getContext('2d')!;
    this.paddle = new Paddle(this.ctx, this.GAME_WIDTH, this.GAME_HEIGHT);
    this.ball = new Ball(this.ctx, this.GAME_WIDTH, this.GAME_HEIGHT);
    this.bricks = this.generateBricks();
    this.animate();
  }

  animate(): void {
    this.ctx.clearRect(0, 0, this.GAME_WIDTH, this.GAME_HEIGHT);
    this.checkForCollisions();
    this.bricks.forEach(brick => brick.draw());
    this.ball.draw()
    this.paddle.draw()
    window.requestAnimationFrame(this.animate.bind(this));
  }

  checkForCollisions(): void {
    this.checkBallInBounds();
    this.checkBallHitsPaddle();
    this.checkBallHitsBrick();
  }

  checkBallInBounds(): void {
    if (this.ball.getRightEdge() + this.ball.xSpeed > this.GAME_WIDTH || this.ball.getLeftEdge() + this.ball.xSpeed < 0) {
      this.ball.xSpeed = this.ball.xSpeed * -1;
    }
    if (this.ball.getTopEdge() + this.ball.ySpeed < 0) {
      this.ball.ySpeed = this.ball.ySpeed * -1;
    }
    if (this.ball.getBottomEdge() + this.ball.ySpeed > this.GAME_HEIGHT) {
      //reset ball, if it leaves via the bottom edge
      this.ball = new Ball(this.ctx, this.GAME_WIDTH, this.GAME_HEIGHT);
    }
  }

  checkBallHitsPaddle(): void {
    if (this.collisionCooldown < 20) {
      this.collisionCooldown++;
      return;
    }
    //ball is on the same height as the paddle
    if (this.ball.getBottomEdge() + this.ball.ySpeed > this.paddle.getTopEdge()) {
      //top-collision
      if (this.ball.getRightEdge() > this.paddle.getLeftEdge() && this.ball.getLeftEdge() > this.paddle.getLeftEdge() && this.ball.getLeftEdge() < this.paddle.getRightEdge() && this.ball.getRightEdge() < this.paddle.getRightEdge()) {
        this.ball.ySpeed = this.ball.ySpeed * -1;
        this.collisionCooldown = 0;
        //left side collision
      } else if (this.ball.getRightEdge() > this.paddle.getLeftEdge() && this.ball.getLeftEdge() < this.paddle.getLeftEdge() && this.ball.getLeftEdge() < this.paddle.getLeftEdge()) {
        this.ball.ySpeed = this.ball.ySpeed * -1;
        this.ball.xSpeed = this.ball.xSpeed * -1;
        this.ball.speedBoost();
        this.collisionCooldown = 0;
        //right side collision
      } else if (this.ball.getLeftEdge() < this.paddle.getRightEdge() && this.ball.getRightEdge() > this.paddle.getRightEdge() && this.ball.getRightEdge() > this.paddle.getRightEdge()) {
        this.ball.ySpeed = this.ball.ySpeed * -1;
        this.ball.xSpeed = this.ball.xSpeed * -1;
        this.ball.speedBoost();
        this.collisionCooldown = 0;
      }
    }
  }

  checkBallHitsBrick(): void {
    this.bricks.forEach((brick, index) => {
      //top collision
      if (brick.getLeftEdge() < this.ball.getLeftEdge() && brick.getRightEdge() > this.ball.getLeftEdge() && brick.getTopEdge() < this.ball.getBottomEdge() && brick.getTopEdge() > this.ball.getTopEdge()) {
        this.ball.ySpeed = this.ball.ySpeed * -1;
        this.collisionCooldown = 0;
        brick.hitpoints -= 1;
        if (brick.hitpoints <= 0) {
          this.bricks.splice(index, 1);
        }
        //bottom collision
      } else if (brick.getLeftEdge() < this.ball.getLeftEdge() && brick.getRightEdge() > this.ball.getLeftEdge() && brick.getBottomEdge() > this.ball.getTopEdge() && brick.getBottomEdge() < this.ball.getBottomEdge()) {
        this.ball.ySpeed = this.ball.ySpeed * -1;
        this.collisionCooldown = 0;
        brick.hitpoints -= 1;
        if (brick.hitpoints <= 0) {
          this.bricks.splice(index, 1);
        }
        //right collision
      } else if (brick.getTopEdge() < this.ball.getTopEdge() && brick.getBottomEdge() > this.ball.getBottomEdge() && brick.getRightEdge() > this.ball.getLeftEdge() && brick.getLeftEdge() < this.ball.getLeftEdge()) {
        this.ball.xSpeed = this.ball.xSpeed * -1;
        this.collisionCooldown = 0;
        brick.hitpoints -= 1;
        if (brick.hitpoints <= 0) {
          this.bricks.splice(index, 1);
        }
        //left collision
      } else if (brick.getTopEdge() < this.ball.getTopEdge() && brick.getBottomEdge() > this.ball.getBottomEdge() && brick.getLeftEdge() < this.ball.getRightEdge() && brick.getRightEdge() > this.ball.getRightEdge()) {
        this.ball.xSpeed = this.ball.xSpeed * -1;
        this.collisionCooldown = 0;
        brick.hitpoints -= 1;
        if (brick.hitpoints <= 0) {
          this.bricks.splice(index, 1);
        }
      }
    });
  }

  //generate 8x6 bricks, each row has less hitpoints
  generateBricks(): Brick[] {
    const bricks: Brick[] = [];
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 8; j++) {
        bricks.push(new Brick(this.ctx, this.GAME_WIDTH / 8 * j + 70, this.GAME_HEIGHT / 2 / 7 * i + 30, 5 - i))
      }
    }
    return bricks;
  }

}
