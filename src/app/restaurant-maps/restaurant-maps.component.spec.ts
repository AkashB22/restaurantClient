import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantMapsComponent } from './restaurant-maps.component';

describe('RestaurantMapsComponent', () => {
  let component: RestaurantMapsComponent;
  let fixture: ComponentFixture<RestaurantMapsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestaurantMapsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantMapsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
