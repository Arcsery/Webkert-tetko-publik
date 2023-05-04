import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleTattooArtistComponent } from './single-tattoo-artist.component';

describe('SingleTattooArtistComponent', () => {
  let component: SingleTattooArtistComponent;
  let fixture: ComponentFixture<SingleTattooArtistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleTattooArtistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleTattooArtistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
