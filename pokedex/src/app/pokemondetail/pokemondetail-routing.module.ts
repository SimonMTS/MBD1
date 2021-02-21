import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PokemondetailPage } from './pokemondetail.page';
import { FormsComponent } from './forms/forms.component';
import { AbilitiesComponent } from './abilities/abilities.component';
import { StatsComponent } from './stats/stats.component';

const routes: Routes = [
  {
    path: '',
    component: PokemondetailPage,
    children: [
      {
        path: 'forms',
        component: FormsComponent
      },
      {
        path: 'abilities',
        component: AbilitiesComponent
      },
      {
        path: 'stats',
        component: StatsComponent
      },
      {
        path: '',
        redirectTo: 'forms',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PokemondetailPageRoutingModule { }
