import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

@Component({
  selector: 'app-scroll',
  templateUrl: './scroll.component.html',
  styleUrls: ['./scroll.component.scss'],
})
export class ScrollComponent implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  next = "";
  pokemon = [];

  constructor(public httpClient: HttpClient) { }

  ngOnInit() {
    this.httpClient.get('https://pokeapi.co/api/v2/pokemon?limit=15&offset=0').subscribe(res => {
      // console.log(res);
      this.pokemon.push(...res['results']);
      this.next = res['next'];
    });
  }

  loadData(event) {
    if (!this.next) {
      event.target.disabled = true;
      return
    }

    this.httpClient.get(this.next).subscribe(res => {
      this.pokemon.push(...res['results']);
      this.next = res['next'];
    });

    event.target.complete();
  }

}
