import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CatchpokemonPageRoutingModule } from './catchpokemon-routing.module';

import { CatchpokemonPage } from './catchpokemon.page';
import { MapComponent } from '../map/map.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CatchpokemonPageRoutingModule
  ],
  declarations: [CatchpokemonPage, MapComponent]
})
export class CatchpokemonPageModule { }
