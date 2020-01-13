import { TestBed } from '@angular/core/testing';

import { RestaurantServiceService } from './restaurant-service.service';

describe('RestaurantServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RestaurantServiceService = TestBed.get(RestaurantServiceService);
    expect(service).toBeTruthy();
  });
});
