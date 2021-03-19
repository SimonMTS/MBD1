import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-allpokemon',
  templateUrl: './allpokemon.page.html',
  styleUrls: ['./allpokemon.page.scss'],
})
export class AllpokemonPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  offset = 0;
  pokemon = [];

  constructor(public httpClient: HttpClient, private pokemonService: PokemonService) { }

  ngOnInit() {
    this.pokemonService.getAllPokemons(this.offset).toPromise().then(res => {
      // console.log(res);
      this.pokemon.push(...res['results']);
      this.offset += res['results'].length;
    });
  }

  loadData(event) {
    this.pokemonService.getAllPokemons(this.offset).toPromise().then(res => {
      this.pokemon.push(...res['results']);
      this.offset += res['results'].length;

      if (res['results'].length < 15) {
        event.target.disabled = true;
      }
    });

    event.target.complete();
  }

}
