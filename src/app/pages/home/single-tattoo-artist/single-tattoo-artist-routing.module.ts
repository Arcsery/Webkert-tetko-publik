import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SingleTattooArtistComponent } from './single-tattoo-artist.component';

const routes: Routes = [{ path: '', component: SingleTattooArtistComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SingleTattooArtistRoutingModule { }
