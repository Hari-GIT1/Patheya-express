import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingRestaurantsComponent } from './pending-restaurants.component';

describe('PendingRestaurantsComponent', () => {
  let component: PendingRestaurantsComponent;
  let fixture: ComponentFixture<PendingRestaurantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendingRestaurantsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PendingRestaurantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
