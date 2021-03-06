import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  pokemons = [];

  constructor(public httpClient: HttpClient) {
    // load from storage
  }

  public writePokemons() {
    Storage.set({
      key: 'pokemons',
      value: JSON.stringify(this.pokemons)
    });
  }

  public getRandomPokemons(location): Observable<any> {
    return new Observable((observer) => {

      for (let i = 0; i < 10; i++) {
        let id = Math.floor(Math.random() * 895);

        this.httpClient.get('https://pokeapi.co/api/v2/pokemon/' + id).subscribe(res => {
          let loc = location;
          loc["lat"] += this.randomLocOffset();
          loc["long"] += this.randomLocOffset();

          observer.next({
            "location": loc,
            "pokemon": res
          });
        });
      }

    });
  }

  private randomLocOffset() {
    let range = 0.015;
    return (Math.random() * range) - (range / 2);
  }

  public getCaughtPokemons() {
    return this.pokemons;
  }

  public addCaughtPokemon(pokemon) {
    this.pokemons.push(pokemon);
  }

  public getAllPokemons() {

  }

}
