import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-caughtpokemon',
  templateUrl: './caughtpokemon.page.html',
  styleUrls: ['./caughtpokemon.page.scss'],
})
export class CaughtpokemonPage implements OnInit {

  pokemon = [];

  constructor(private pokemonService: PokemonService) { }

  ngOnInit() {
    this.pokemonService.getCaughtPokemons().subscribe((data) => {
      this.pokemon = data;
      console.log(this.pokemon);
    });
  }

}
