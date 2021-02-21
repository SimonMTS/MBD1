import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PokemondetailPage } from './pokemondetail.page';

describe('PokemondetailPage', () => {
  let component: PokemondetailPage;
  let fixture: ComponentFixture<PokemondetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PokemondetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PokemondetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
