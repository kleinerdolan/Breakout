import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-breakout',
  templateUrl: './breakout.component.html',
  styleUrls: ['./breakout.component.scss']
})
export class BreakoutComponent implements OnInit {

  score: number = 0;
  isStreak: boolean = false;
  bonusStreak: string = '';
  gameOver: boolean = false;
  gameWon: boolean = false;
  gameLost: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  updateScore(newScore: number) {
    this.score = newScore;
  }

  updateStreak(streak: number) {
    if (streak === 0) {
      this.isStreak = false;
    } else {
      this.isStreak = true;
      this.bonusStreak = '' + streak;
    }
  }

  //true = game was won, false = game was lost
  endGame(win: boolean): void {
    this.gameOver = true;
    if (win) {
      this.gameWon = true;
    } else {
      this.gameLost = true;
    }
  }
}
