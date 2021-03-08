import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PokemondetailPage } from '../pokemondetail.page';

@Component({
  selector: 'app-abilities',
  templateUrl: './abilities.component.html',
  styleUrls: ['./abilities.component.scss'],
})
export class AbilitiesComponent implements OnInit {

  abilities = [];

  constructor(@Inject(PokemondetailPage) private parent: PokemondetailPage, public httpClient: HttpClient) { }

  ngOnInit() {
    this.parent.pokemonResponse.subscribe(() => {
      this.parent.pokemon["abilities"].forEach(ability => {
        this.httpClient.get(ability["ability"]["url"]).subscribe((data) => {
          console.log(data);
          this.abilities[data["name"]] = data;
        });
      });
    });
  }

  public getFlavor(name) {
    if (this.abilities[name]) {
      for (let entry of this.abilities[name]["flavor_text_entries"]) {
        if (entry["language"]["name"] == "en") {
          return entry["flavor_text"];
        }
      }
    }

    return "";
  }

}
