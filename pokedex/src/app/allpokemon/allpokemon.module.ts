import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule } from '@ionic/angular';

import { AllpokemonPageRoutingModule } from './allpokemon-routing.module';

import { AllpokemonPage } from './allpokemon.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AllpokemonPageRoutingModule,
    HttpClientModule
  ],
  declarations: [AllpokemonPage]
})
export class AllpokemonPageModule { }
