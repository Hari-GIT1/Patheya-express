import { TestBed } from '@angular/core/testing';

import { RestaurantAdminService } from './restaurant-admin.service';

describe('RestaurantAdminService', () => {
  let service: RestaurantAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestaurantAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
