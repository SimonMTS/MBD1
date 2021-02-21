import { Component, AfterViewInit, OnChanges, Input } from '@angular/core';
import * as L from 'leaflet';

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

  constructor() { }

  ngAfterViewInit() {
    this.initMap();
  }

  ngOnChanges() {
    if (!this.map) return;
    this.map.invalidateSize();
    this.map.setView([this.lat, this.long], 13);
    L.circle([this.lat, this.long], this.accuracy / 2).addTo(this.map);

    console.log("asdasda");
  }

  private initMap(): void {
    // this.map = L.map('map').setView([51.7759999, 5.5234895], 7);
    this.map = L.map('map').setView([this.lat, this.long], 7);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(this.map);

    this.map.invalidateSize();
    setTimeout(() => {
      this.map.invalidateSize();
    }, 100);
  }

}
