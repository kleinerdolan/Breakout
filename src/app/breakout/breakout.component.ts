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
}
