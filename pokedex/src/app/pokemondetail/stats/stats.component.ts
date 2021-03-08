import { Component, OnInit, Inject } from '@angular/core';
import { PokemondetailPage } from '../pokemondetail.page';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss'],
})
export class StatsComponent implements OnInit {

  constructor(@Inject(PokemondetailPage) private parent: PokemondetailPage) { }

  ngOnInit() { }

}
