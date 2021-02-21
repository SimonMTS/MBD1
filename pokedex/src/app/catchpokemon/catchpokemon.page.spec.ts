import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CatchpokemonPage } from './catchpokemon.page';

describe('CatchpokemonPage', () => {
  let component: CatchpokemonPage;
  let fixture: ComponentFixture<CatchpokemonPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatchpokemonPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CatchpokemonPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
