import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CanvasComponent} from "./canvas/canvas.component";

const routes: Routes = [
  { path: 'breakout', component: CanvasComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
