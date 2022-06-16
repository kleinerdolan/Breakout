import {Component, HostListener, OnInit} from '@angular/core';

@Component({
  selector: 'app-breakout',
  templateUrl: './breakout.component.html',
  styleUrls: ['./breakout.component.scss']
})
export class BreakoutComponent implements OnInit {

  score: number = 0;
  isStreak: boolean = false;
  bonusStreak: string = '';
  gameOver: boolean = true;
  gameWon: boolean = false;
  gameLost: boolean = false;
  mapSelectionMode: boolean = false;
  maps: string[] = ['Easy', 'Block', 'Classic'];
  mapChoice: string = '';

  constructor() { }

  ngOnInit(): void {
  }

  @HostListener('document:keydown', ['$event'])
  handleDeleteKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.openMapSelection();
    }
  }

  updateScore(newScore: number): void {
    this.score = newScore;
  }

  updateStreak(streak: number): void {
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

  openMapSelection(): void {
    this.mapSelectionMode = true;
  }

  startGame(mapChoice: number): void {
    this.score = 0;
    this.mapChoice = this.maps[mapChoice];
    this.gameOver = false;
    this.mapSelectionMode = false;
  }
}
