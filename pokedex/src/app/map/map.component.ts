import { Component, AfterViewInit, OnChanges, Input } from '@angular/core';
import * as L from 'leaflet';
import { PokemonService } from '../pokemon.service';
import { ActionSheetController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { PopoverController } from '@ionic/angular';
import { CatchpopoverComponent } from '../catchpopover/catchpopover.component';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements AfterViewInit, OnChanges {
  @Input() lat: string;
  @Input() long: string;
  @Input() accuracy: number;

  private map;

  constructor(private pokemonService: PokemonService, public actionSheetController: ActionSheetController,
    private navCtrl: NavController, public popoverController: PopoverController) { }

  ngAfterViewInit() {
    this.initMap();
  }

  ngOnChanges() {
    if (!this.map) return;
    this.map.invalidateSize();
    this.map.setView([this.lat, this.long], 13);
    L.circle([this.lat, this.long], this.accuracy / 2).addTo(this.map);

    this.initMarkers();
  }

  private initMap(): void {
    // this.map = L.map('map').setView([51.7759999, 5.5234895], 7);
    this.map = L.map('map').setView([this.lat, this.long], 7);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(this.map);

    this.map.invalidateSize();
    setTimeout(() => {
      this.map.invalidateSize();
    }, 200);

  }

  private initMarkers() {
    this.pokemonService.getRandomPokemons({ "lat": this.lat, "long": this.long }).subscribe(pokemon => {
      let icon = L.icon({
        iconUrl: pokemon["pokemon"]["sprites"]["front_default"],
        iconSize: [70, 70],
        iconAnchor: [35, 35]
      });

      let mark = L.marker([pokemon["location"]["lat"], pokemon["location"]["long"]], { icon: icon }).addTo(this.map);
      mark.on('click', () => { console.log(pokemon); this.presentActionSheet(pokemon); });
    });
  }

  async presentActionSheet(pokemon) {
    const actionSheet = await this.actionSheetController.create({
      header: pokemon["pokemon"]["name"],
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Try to catch',
        icon: 'caret-forward-circle',
        handler: () => {
          this.presentPopover({});
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
    return await popover.present();
  }

}
