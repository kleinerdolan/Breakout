import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {Paddle} from "../../GameObjects/Paddle";

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss']
})
export class CanvasComponent implements OnInit {

  GAME_WIDTH = 800;
  GAME_HEIGHT = 600;

  @ViewChild('canvas', { static: true })
  canvas!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D;

  paddle!: Paddle;

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'ArrowRight') {
      this.paddle.moveRight(this.GAME_WIDTH);
    }
    if (event.key === 'ArrowLeft') {
      this.paddle.moveLeft();
    }
  }

  constructor() { }

  ngOnInit(): void {
    this.ctx = this.canvas.nativeElement.getContext('2d')!;
    this.paddle = new Paddle(this.ctx, this.GAME_WIDTH,  this.GAME_HEIGHT);
    this.animate();
  }

  animate(): void {
    this.ctx.clearRect(0, 0, this.GAME_WIDTH, this.GAME_HEIGHT);
    this.paddle.draw()
    window.requestAnimationFrame(this.animate.bind(this));
  }

}
