import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'allpokemon',
    loadChildren: () => import('./allpokemon/allpokemon.module').then(m => m.AllpokemonPageModule)
  },
  {
    path: 'caughtpokemon',
    loadChildren: () => import('./caughtpokemon/caughtpokemon.module').then(m => m.CaughtpokemonPageModule)
  },
  {
    path: 'catchpokemon',
    loadChildren: () => import('./catchpokemon/catchpokemon.module').then(m => m.CatchpokemonPageModule)
  },
  {
    path: 'allpokemon/:name',
    loadChildren: () => import('./pokemondetail/pokemondetail.module').then(m => m.PokemondetailPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
