import {Component, EventEmitter, HostListener, OnInit, Output} from '@angular/core';
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


  @HostListener('document:keydown', ['$event'])
  handleDeleteKeyboardEvent(event: KeyboardEvent) {
    const currentSelection = this.maps.find(map => map.selected);
    if (currentSelection === undefined) {
      return;
    }
    if (event.key === 'ArrowRight') {
      const currentSelectionIndex = this.maps.indexOf(currentSelection);
      this.maps[currentSelectionIndex].selected = false;
      this.maps[(currentSelectionIndex + 1) % this.maps.length].selected = true;
    }
    if (event.key === 'ArrowLeft') {
      const currentSelectionIndex = this.maps.indexOf(currentSelection);
      this.maps[currentSelectionIndex].selected = false;
      let elementToLeftIndex = (currentSelectionIndex - 1) % this.maps.length;
      if (elementToLeftIndex === -1) {
        elementToLeftIndex = this.maps.length - 1;
      }
      this.maps[elementToLeftIndex].selected = true;
    }
    if (event.key === 'Enter') {
      this.selectMap(currentSelection);
    }
  }

  ngOnInit(): void {
    this.initMaps();
    //select the first option by default
    this.maps[0].selected = true;
  }

  initMaps() {
    this.maps.push(new Map('Easy', 0, '/assets/maps/map_easy.png'), new Map('Block', 1, '/assets/maps/map_block.png'), new Map('Classic', 2, '/assets/maps/map_classic.png'))
  }

  selectMap(map: Map) {
    this.mapSelected.emit(map.id);
  }

}
