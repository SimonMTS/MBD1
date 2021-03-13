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
    if (this.catchablePokemons !== []) { observer.next(this.catchablePokemons); observer.complete(); }

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

  // public getRandomPokemons(location): Observable<any> {
  //   return new Observable((observer) => {
  //     console.log("in range");
  //     this.inRange(location).then((n) => console.log(n));

  //     for (let i = 0; i < 10; i++) {
  //       let id = Math.floor(Math.random() * 895) + 1;

  //       this.httpClient.get('https://pokeapi.co/api/v2/pokemon/' + id).subscribe(res => {
  //         let loc = {};
  //         loc["lat"] = location["lat"] + this.randomLocOffset();
  //         loc["long"] = location["long"] + this.randomLocOffset();

  //         observer.next({
  //           "location": loc,
  //           "pokemon": res
  //         });
  //       });
  //     }

  //   });
  // }

  public getRandomPokemons(location): Observable<any> {
    return new Observable((observer) => {
      console.log("in range");
      this.inRange(location).then((n) => console.log(n));

      for (let i = 0; i < 10; i++) {
        let id = Math.floor(Math.random() * 895) + 1;

        this.httpClient.get('https://pokeapi.co/api/v2/pokemon/' + id).subscribe(res => {
          let loc = {};
          loc["lat"] = location["lat"] + this.randomLocOffset();
          loc["long"] = location["long"] + this.randomLocOffset();

          observer.next({
            "location": loc,
            "pokemon": res
          });
        });
      }

    });
  }

  // public async getRandomPokemons(location): Promise<any> {
  //   let existingcatchablepokemons = await this.catchablePokeObservable.toPromise();
  //   let inrange = this.inRange(existingcatchablepokemons, location);

  //   let pokemons = [];

  //   for (let i = inrange; i < 10; i++) {
  //     let id = Math.floor(Math.random() * 895) + 1;

  //     let res = await this.httpClient.get('https://pokeapi.co/api/v2/pokemon/' + id).toPromise();//.subscribe(res => {
  //     console.log(res);

  //     let loc = {};
  //     loc["lat"] = location["lat"] + this.randomLocOffset();
  //     loc["long"] = location["long"] + this.randomLocOffset();

  //     pokemons.push({
  //       "location": loc,
  //       "pokemon": res
  //     });
  //     //});
  //   }

  //   return pokemons;
  // }

  private async inRange(location): Promise<number> {

    // can just use square
    function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
      var R = 6371; // Radius of the earth in km
      var dLat = deg2rad(lat2 - lat1);  // deg2rad below
      var dLon = deg2rad(lon2 - lon1);
      var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      var d = R * c; // Distance in km
      return d;
    }

    function deg2rad(deg) {
      return deg * (Math.PI / 180);
    }

    let existingcatchablepokemons = await this.catchablePokeObservable.toPromise();
    let inrange = 0;

    existingcatchablepokemons.forEach(pokemon => {
      console.log(pokemon);
      let asd = getDistanceFromLatLonInKm(location["lat"], location["long"], pokemon["lat"], pokemon["long"]);

      if (false) {
        inrange++;
      }
    });

    return inrange;
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

  public getAllPokemons() {

  }

}
