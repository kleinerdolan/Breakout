import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CanvasComponent } from './canvas/canvas.component';
import { BreakoutComponent } from './breakout/breakout.component';
import { MapSelectionComponent } from './map-selection/map-selection.component';
import { MapCardComponent } from './map-selection/map-card/map-card.component';

@NgModule({
  declarations: [
    AppComponent,
    CanvasComponent,
    BreakoutComponent,
    MapSelectionComponent,
    MapCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
