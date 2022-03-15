import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrjRantsComponent } from './prj-rants.component';

describe('PrjRantsComponent', () => {
  let component: PrjRantsComponent;
  let fixture: ComponentFixture<PrjRantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrjRantsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrjRantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
