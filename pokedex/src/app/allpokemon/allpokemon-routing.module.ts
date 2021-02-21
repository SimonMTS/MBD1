import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllpokemonPage } from './allpokemon.page';

const routes: Routes = [
  {
    path: '',
    component: AllpokemonPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllpokemonPageRoutingModule {}
