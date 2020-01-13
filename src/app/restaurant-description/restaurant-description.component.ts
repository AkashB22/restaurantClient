import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {RestaurantServiceService} from '../restaurant-service.service';
import {RestaurantDetails} from '../Models/RestaurantDetails';

@Component({
  selector: 'app-restaurant-description',
  templateUrl: './restaurant-description.component.html',
  styleUrls: ['./restaurant-description.component.css']
})
export class RestaurantDescriptionComponent implements OnInit {
  restaurantId: Number;
  restaurantDetails: RestaurantDetails;
  lat: Number;
  long: Number;
  displayMore: Boolean = false;
  constructor(private routes: ActivatedRoute, private service: RestaurantServiceService) { }

  ngOnInit() {
    this.routes.params.subscribe(
      (data)=> {
        //console.log(data);
        this.restaurantId= data.id;

        this.service.getRestaurantDesp(this.restaurantId).subscribe(
          (data)=>{
            this.restaurantDetails = data[0];
            [this.long, this.lat] = this.restaurantDetails.location.coordinates;
            
            //console.log(this.restaurantDetails);
          }
        )
      }
    )
  }

}
