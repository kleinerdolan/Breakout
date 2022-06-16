import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Map} from "../../GameObjects/Map";


@Component({
  selector: 'app-map-selection',
  templateUrl: './map-selection.component.html',
  styleUrls: ['./map-selection.component.scss']
})
export class MapSelectionComponent implements OnInit {

  @Output() mapSelected: EventEmitter<number> = new EventEmitter();
  maps: Map[] = [];

  constructor() {
  }

  ngOnInit(): void {
    this.initMaps();
  }

  initMaps() {
    this.maps.push(new Map('Default', 0, '/assets/maps/map_default.png'), new Map('Block', 1, '/assets/maps/map_block.png'))
  }

  selectMap(map: Map) {
    this.mapSelected.emit(map.id);
  }

}
