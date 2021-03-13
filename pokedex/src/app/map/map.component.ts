import { Component, AfterViewInit, OnChanges, Input } from '@angular/core';
import * as L from 'leaflet';
import { PokemonService } from '../pokemon.service';
import { ActionSheetController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { PopoverController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { CatchpopoverComponent } from '../catchpopover/catchpopover.component';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements AfterViewInit, OnChanges {
  @Input() lat: number;
  @Input() long: number;
  @Input() accuracy: number;
  circle: L.Circle;

  private map;

  constructor(private pokemonService: PokemonService, public actionSheetController: ActionSheetController,
    private navCtrl: NavController, public popoverController: PopoverController, public toastController: ToastController) { }

  ngAfterViewInit() {
    this.initMap();
  }

  ngOnChanges() {
    if (!this.map) return;
    this.map.invalidateSize();
    this.map.setView([this.lat, this.long]);

    if (this.circle) this.map.removeLayer(this.circle);
    this.circle = L.circle([this.lat, this.long], this.accuracy / 2);
    this.circle.addTo(this.map);

    this.initMarkers();
  }

  private initMap(): void {
    this.map = L.map('map').setView([this.lat, this.long], 18);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(this.map);

    this.map.invalidateSize();
    setTimeout(() => {
      this.map.invalidateSize();
    }, 200);

  }

  markers = [];
  private initMarkers() {
    this.markers.forEach(m => {
      this.map.removeLayer(m);
    });

    this.pokemonService.getRandomPokemons({ "lat": this.lat, "long": this.long }).subscribe(pokemon => {
      // pokemons.forEach(pokemon => {
      let icon = L.icon({
        iconUrl: pokemon["pokemon"]["sprites"]["front_default"],
        iconSize: [70, 70],
        iconAnchor: [35, 35]
      });

      let mark = L.marker([pokemon["location"]["lat"], pokemon["location"]["long"]], { icon: icon }).addTo(this.map);
      this.markers.push(mark);
      mark.on('click', (m) => {
        console.log(pokemon);
        let range = 0.015 / 30;
        if (true || Math.abs(this.lat - pokemon["location"]["lat"]) <= range && Math.abs(this.long - pokemon["location"]["long"]) <= range) {
          this.presentActionSheet(pokemon, mark);
        } else {
          this.presentToast("Get a bit closer");
        }
      });

    });
  }

  async presentActionSheet(pokemon, marker) {
    const actionSheet = await this.actionSheetController.create({
      header: pokemon["pokemon"]["name"],
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Try to catch',
        icon: 'caret-forward-circle',
        handler: () => {
          this.presentPopover({
            "as": actionSheet,
            "pokemon": pokemon,
            "marker": marker
          });
          return false;
        }
      }, {
        text: 'View info',
        icon: 'help-outline',
        handler: () => {
          this.navCtrl.navigateForward('/allpokemon/' + pokemon["pokemon"]["name"]);
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => { }
      }]
    });
    await actionSheet.present();
  }

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: CatchpopoverComponent,
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true
    });
    popover.onDidDismiss().then((dataReturned) => {
      if (dataReturned.data != undefined) {
        if (dataReturned.data["success"]) {
          ev["as"].dismiss();
          this.presentToast("Caught " + ev["pokemon"]["pokemon"]["name"] + "!");
          this.pokemonService.addCaughtPokemon(ev["pokemon"]["pokemon"]);
        } else {
          ev["as"].dismiss();
          this.presentToast(ev["pokemon"]["pokemon"]["name"] + " got away");
        }

        this.map.removeLayer(ev["marker"]);
        this.pokemonService.removeCatchablePokemon(ev["pokemon"]);
      }
    });
    return await popover.present();
  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

}
