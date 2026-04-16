import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpesificCategoryComponent } from './spesific-category.component';

describe('SpesificCategoryComponent', () => {
  let component: SpesificCategoryComponent;
  let fixture: ComponentFixture<SpesificCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpesificCategoryComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SpesificCategoryComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
