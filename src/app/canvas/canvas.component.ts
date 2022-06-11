import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {Paddle} from "../../GameObjects/Paddle";
import {Ball} from "../../GameObjects/Ball";

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss']
})
export class CanvasComponent implements OnInit {

  GAME_WIDTH = 800;
  GAME_HEIGHT = 600;

  collisionCooldown = 0;

  @ViewChild('canvas', { static: true })
  canvas!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D;

  paddle!: Paddle;
  ball!: Ball;

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

  constructor() { }

  ngOnInit(): void {
    this.ctx = this.canvas.nativeElement.getContext('2d')!;
    this.paddle = new Paddle(this.ctx, this.GAME_WIDTH,  this.GAME_HEIGHT);
    this.ball = new Ball(this.ctx, this.GAME_WIDTH, this.GAME_HEIGHT);
    this.animate();
  }

  animate(): void {
    this.ctx.clearRect(0, 0, this.GAME_WIDTH, this.GAME_HEIGHT);
    this.paddle.draw()
    this.ball.draw()
    this.checkForCollisions();
    window.requestAnimationFrame(this.animate.bind(this));
  }

  checkForCollisions(): void {
    this.checkBallInBounds();
    this.checkBallHitsPaddle();
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
        console.log('top-collision')
        //left side collision
      } else if (this.ball.getRightEdge() > this.paddle.getLeftEdge() && this.ball.getLeftEdge() < this.paddle.getLeftEdge() && this.ball.getLeftEdge() < this.paddle.getLeftEdge()) {
        this.ball.ySpeed = this.ball.ySpeed * -1;
        this.ball.xSpeed = this.ball.xSpeed * -1;
        this.ball.speedBoost();
        this.collisionCooldown = 0;
        console.log('left-collision')
        //right side collision
      } else if (this.ball.getLeftEdge() < this.paddle.getRightEdge() && this.ball.getRightEdge() > this.paddle.getRightEdge() && this.ball.getRightEdge() > this.paddle.getRightEdge()) {
        this.ball.ySpeed = this.ball.ySpeed * -1;
        this.ball.xSpeed = this.ball.xSpeed * -1;
        this.ball.speedBoost();
        this.collisionCooldown = 0;
        console.log('right-collision')
      }
    }
  }

}
