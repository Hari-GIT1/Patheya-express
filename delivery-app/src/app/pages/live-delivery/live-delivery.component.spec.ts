import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveDeliveryComponent } from './live-delivery.component';

describe('LiveDeliveryComponent', () => {
  let component: LiveDeliveryComponent;
  let fixture: ComponentFixture<LiveDeliveryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LiveDeliveryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LiveDeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
