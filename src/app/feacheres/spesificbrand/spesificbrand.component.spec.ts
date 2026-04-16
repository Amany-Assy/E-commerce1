import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpesificbrandComponent } from './spesificbrand.component';

describe('SpesificbrandComponent', () => {
  let component: SpesificbrandComponent;
  let fixture: ComponentFixture<SpesificbrandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpesificbrandComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SpesificbrandComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
