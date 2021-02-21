import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CatchpokemonPage } from './catchpokemon.page';

const routes: Routes = [
  {
    path: '',
    component: CatchpokemonPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CatchpokemonPageRoutingModule {}
