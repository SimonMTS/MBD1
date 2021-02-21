import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CaughtpokemonPageRoutingModule } from './caughtpokemon-routing.module';

import { CaughtpokemonPage } from './caughtpokemon.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CaughtpokemonPageRoutingModule
  ],
  declarations: [CaughtpokemonPage]
})
export class CaughtpokemonPageModule {}
