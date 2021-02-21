import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-pokemondetail',
  templateUrl: './pokemondetail.page.html',
  styleUrls: ['./pokemondetail.page.scss'],
})
export class PokemondetailPage implements OnInit {

  name = "...";
  pokemon = {};
  pokemonResponse: Observable<any> = new Observable((observer) => {
    this.route.params.subscribe((params: any) => {
      if (params['name']) {
        this.name = params['name'];

        this.httpClient.get('https://pokeapi.co/api/v2/pokemon/' + this.name).subscribe(res => {
          observer.next(res);
        });
      }
    });
  });

  constructor(private route: ActivatedRoute, private router: Router, public httpClient: HttpClient) { }

  ngOnInit() {
    this.pokemonResponse.subscribe((p: any) => {
      // console.log(p);
      this.pokemon = p;
    });
  }

}
