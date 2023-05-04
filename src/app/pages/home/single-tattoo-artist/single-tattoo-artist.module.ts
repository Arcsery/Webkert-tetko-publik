import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SingleTattooArtistRoutingModule } from './single-tattoo-artist-routing.module';
import { SingleTattooArtistComponent } from './single-tattoo-artist.component';

import {MatCardModule} from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatSelectModule} from '@angular/material/select';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    SingleTattooArtistComponent
  ],
  imports: [
    CommonModule,
    SingleTattooArtistRoutingModule,
    MatCardModule,
    MatToolbarModule,
    MatSelectModule,
    FormsModule
  ]
})
export class SingleTattooArtistModule { }
