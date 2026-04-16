import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatdetailsComponent } from './catdetails.component';

describe('CatdetailsComponent', () => {
  let component: CatdetailsComponent;
  let fixture: ComponentFixture<CatdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatdetailsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CatdetailsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
