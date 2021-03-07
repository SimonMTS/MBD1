import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@capacitor/core';

@Component({
  selector: 'app-catchpokemon',
  templateUrl: './catchpokemon.page.html',
  styleUrls: ['./catchpokemon.page.scss'],
})
export class CatchpokemonPage implements OnInit {

  coords: any = {
    latitude: 0,
    longitude: 0
  };

  constructor() { }

  ngOnInit() {
    Geolocation.getCurrentPosition({
      timeout: 100000000
    }).then((coordinates) => {
      this.coords = coordinates["coords"];
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

}
