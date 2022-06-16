import {Component, Input, OnInit} from '@angular/core';
import {Map} from "../../../GameObjects/Map";

@Component({
  selector: 'app-map-card',
  templateUrl: './map-card.component.html',
  styleUrls: ['./map-card.component.scss']
})
export class MapCardComponent implements OnInit {

  @Input() map!: Map;

  constructor() { }

  ngOnInit(): void {
  }

}
