import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@capacitor/core';
import { AlertController } from '@ionic/angular';

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

  constructor(public alertController: AlertController) {
    // this.getLocation();
  }

  // async getLocation() {

  //   const coordinates = await Geolocation.getCurrentPosition().catch((error) => {
  //     console.log('Error getting location', error);
  //   });
  //   console.log('Current', coordinates);
  //   this.coords = coordinates["coords"];
  // }

  ngOnInit() {
    console.log("coordasdasd");
    Geolocation.getCurrentPosition({
      timeout: 100000000
    }).then((coordinates) => {
      console.log('Current', coordinates);
      this.coords = coordinates["coords"];

      // this.presentAlert();
    }).catch((error) => {
      console.log('Error getting location', error);
    }).finally(() => {
      console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
    });
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alert',
      subHeader: 'Subtitle',
      message: 'This is an alert message.',
      buttons: ['OK']
    });

    await alert.present();
  }

}
