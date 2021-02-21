import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CaughtpokemonPage } from './caughtpokemon.page';

const routes: Routes = [
  {
    path: '',
    component: CaughtpokemonPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CaughtpokemonPageRoutingModule {}
