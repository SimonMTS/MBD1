import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;
import { Observable } from 'rxjs';
import { nextTick } from 'process';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  // caught pokemon
  pokemons = [];
  pokeObservable = new Observable<any[]>((observer) => {
    if (this.pokemons !== []) { observer.next(this.pokemons); }

    Storage.get({
      key: 'pokemons'
    }).then((data) => {
      this.pokemons = JSON.parse(data.value) || [];
      observer.next(this.pokemons);
    });
    observer.next(this.pokemons);
  });

  // catchable pokemon
  catchablePokemons = [];
  catchablePokeObservable = new Observable<any[]>((observer) => {
    if (this.catchablePokemons.length > 0) { observer.next(this.catchablePokemons); observer.complete(); }

    Storage.get({
      key: 'catchablePokemons'
    }).then((data) => {
      this.catchablePokemons = JSON.parse(data.value) || [];
      observer.next(this.catchablePokemons);
      observer.complete();
    }).catch((error) => {
      observer.next([]);
      observer.complete();
    })
  });

  constructor(public httpClient: HttpClient) { }

  private writePokemons() {
    Storage.set({
      key: 'pokemons',
      value: JSON.stringify(this.pokemons)
    });
  }

  private writeCatchablePokemons() {
    Storage.set({
      key: 'catchablePokemons',
      value: JSON.stringify(this.catchablePokemons)
    });
  }

  public getRandomPokemons(location): Observable<any> {
    return new Observable((observer) => {
      this.inRange(location).then((existing) => {

        existing.forEach(existingPokemon => {
          observer.next(existingPokemon);
        });

        for (let i = existing.length; i < 10; i++) {
          let id = Math.floor(Math.random() * 895) + 1;

          this.httpClient.get('https://pokeapi.co/api/v2/pokemon/' + id).subscribe(res => {
            let loc = {};
            loc["lat"] = location["lat"] + this.randomLocOffset();
            loc["long"] = location["long"] + this.randomLocOffset();

            let pok = {
              "location": loc,
              "pokemon": res
            };
            this.catchablePokemons.push(pok);
            observer.next(pok);
            this.writeCatchablePokemons();
          });
        }

      });

    });
  }

  private async inRange(location): Promise<any[]> {
    let range = 0.015;

    let existingcatchablepokemons = await this.catchablePokeObservable.toPromise();
    // console.log(existingcatchablepokemons.length)
    let inrange = 0;
    let pokemonsInRange = [];

    existingcatchablepokemons.forEach(pokemon => {
      if (Math.abs(location["lat"] - pokemon["location"]["lat"]) <= range && Math.abs(location["long"] - pokemon["location"]["long"]) <= range) {
        // console.log(pokemon);
        inrange++;
        pokemonsInRange.push(pokemon);
      }
    });

    return pokemonsInRange;
  }

  private randomLocOffset() {
    let range = 0.015;
    return (Math.random() * range) - (range / 2);
  }

  public getCaughtPokemons() {
    return this.pokeObservable;
  }

  public addCaughtPokemon(pokemon) {
    this.pokemons.push(pokemon);
    this.writePokemons();
  }

  public removeCaughtPokemon(pokemon) {
    const index = this.pokemons.indexOf(pokemon);
    if (index > -1) {
      this.pokemons.splice(index, 1);
    }
    this.writePokemons();
  }

  public removeCatchablePokemon(pokemon) {
    // const index = this.catchablePokemons.indexOf(pokemon);
    // if (index > -1) {
    //   this.catchablePokemons.splice(index, 1);
    // }

    for (let i = 0; i < this.catchablePokemons.length; i++) {
      const element = this.catchablePokemons[i];

      if (element["pokemon"]["name"] == pokemon["pokemon"]["name"]) {
        console.log(this.catchablePokemons[i]);
        this.catchablePokemons.splice(i, 1);
        break;
      }
    }
    this.writeCatchablePokemons();
  }

  public getAllPokemons(offset = 0) {
    return this.httpClient.get('https://pokeapi.co/api/v2/pokemon?limit=15&offset=' + offset);
  }

}
