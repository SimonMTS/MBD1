import { Component, OnInit, Inject } from '@angular/core';

import { PokemondetailPage } from '../pokemondetail.page';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss'],
})
export class FormsComponent implements OnInit {

  constructor(@Inject(PokemondetailPage) private parent: PokemondetailPage) { }

  ngOnInit() {
    //   this.parent.pokemonResponse.subscribe((p: any) => {
    //     console.log("asdadssa");
    //   });
  }

}
