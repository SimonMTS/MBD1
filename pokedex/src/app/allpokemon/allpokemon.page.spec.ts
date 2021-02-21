import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AllpokemonPage } from './allpokemon.page';

describe('AllpokemonPage', () => {
  let component: AllpokemonPage;
  let fixture: ComponentFixture<AllpokemonPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllpokemonPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AllpokemonPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
