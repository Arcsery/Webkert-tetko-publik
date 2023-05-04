import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TattooArtistsComponent } from './tattoo-artists.component';

describe('TattooArtistsComponent', () => {
  let component: TattooArtistsComponent;
  let fixture: ComponentFixture<TattooArtistsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TattooArtistsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TattooArtistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
