import { Component, OnInit } from '@angular/core';

import { Plugins } from '@capacitor/core';

const { Geolocation } = Plugins;

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
    Geolocation.getCurrentPosition().then((coordinates) => {
      console.log('Current', coordinates);
      this.coords = coordinates["coords"];
    });
  }

}
