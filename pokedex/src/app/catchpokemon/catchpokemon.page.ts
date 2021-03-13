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

  mapLoaded = false;
  mapLoadError = false;
  mapError = "";

  constructor() { }

  ngOnInit() {
    Geolocation.getCurrentPosition({
      timeout: 10000
    }).then((coordinates) => {
      this.coords = coordinates["coords"];
      this.mapLoaded = true;
      this.mapLoadError = false;
      this.mapError = "";
    }).catch((error) => {
      console.log('Error getting location', error);
      this.mapLoaded = false;
      this.mapLoadError = true;
      this.mapError = error["message"];
    });

    Geolocation.watchPosition({}, (data, error) => {
      if (error) {
        console.log('Error getting location', error);
        this.mapLoaded = false;
        this.mapLoadError = true;
        this.mapError = error["message"];
      } else {
        // console.log(data);
        this.coords = data["coords"];
        this.mapLoaded = true;
        this.mapLoadError = false;
        this.mapError = "";
      }
    });
  }

}
