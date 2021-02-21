import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule } from '@ionic/angular';

import { PokemondetailPageRoutingModule } from './pokemondetail-routing.module';

import { PokemondetailPage } from './pokemondetail.page';
import { FormsComponent } from './forms/forms.component';
import { FormComponent } from './forms/form/form.component';
import { AbilitiesComponent } from './abilities/abilities.component';
import { StatsComponent } from './stats/stats.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PokemondetailPageRoutingModule,
    HttpClientModule
  ],
  declarations: [
    PokemondetailPage,
    FormsComponent,
    FormComponent,
    AbilitiesComponent,
    StatsComponent
  ]
})
export class PokemondetailPageModule { }
