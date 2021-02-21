import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CaughtpokemonPage } from './caughtpokemon.page';

describe('CaughtpokemonPage', () => {
  let component: CaughtpokemonPage;
  let fixture: ComponentFixture<CaughtpokemonPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaughtpokemonPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CaughtpokemonPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
